


$(function(){
    var container = $("#simulation-calculation");
    var clientHeight = $(window).height();
    /* ======================================== 初始化页面 ======================================== */
    container.find(".amp-content-panel").css("height",clientHeight-44-44+"px");
    container.find(".amp-content-panel-body").css("height",clientHeight-44-73-44+"px");
    container.find(".table-group-2").css("height",clientHeight-44-73-120-44+"px");

    var swiper_1 = new Swiper(".income-expenses-simulation .table-group-1 .swiper-container", {
        slidesPerView:"auto",
        freeMode: true,
        resistanceRatio : 0
    });

    var swiper_2 = new Swiper(".income-expenses-simulation .table-group-2 .swiper-container", {
        scrollbar: ".income-expenses-simulation .table-group-2 .swiper-scrollbar",
        slidesPerView:"auto",
        freeMode: true,
        resistanceRatio : 0
    });

    swiper_1.params.control = swiper_2;//需要在Swiper2初始化后，Swiper1控制Swiper2
    swiper_2.params.control = swiper_1;//需要在Swiper1初始化后，Swiper2控制Swiper1

    /* ======================================== 事件绑定 ======================================== */



    /* section 相关事件 */
    container.on("click",".section a.collapse-btn",function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).closest(".section").toggleClass("open");
    });
    container.on("click",".section .nested-record-add a",function(e){
        e.stopPropagation();
        e.preventDefault();
        $(container).find("[name=nested-record-remove-template]").tmpl({}).appendTo($(this).closest(".form-content"));
    });
    container.on("click",".section .nested-record-remove a",function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).closest(".nested-record-remove").remove();
    });

    /* block-right */
    container.on("click",".amp-check-btn-group a",function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).closest(".amp-check-btn-group").find("a").removeClass("active");
        $(this).addClass("active");
        var href = $(this).attr("data-href");
        $(container).find(".initial-analysis").hide();
        $(container).find(".income-expenses-simulation").hide();
        $(container).find(".pre-tax-cash-flow").hide();
        $(container).find(".sale-income-analysis").hide();
        $(container).find(href).show();
        if(href==".income-expenses-simulation"){
            updateSwiper();
        }
    });

    container.on("click",".record-list li.record-group a",function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).parent().toggleClass("collapsed");
        var dataGroup = $(this).parent().attr("data-group");
        $(this).closest(".table-group").find("[data-group="+dataGroup+"]:not(.record-group)").toggleClass("amp-display-hide");
    });

    container.on("click",".record-list li.sub-record-group a",function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).parent().toggleClass("collapsed");
        var dataGroup = $(this).parent().attr("sub-data-group");
        $(this).closest(".table-group").find("[sub-data-group="+dataGroup+"]:not(.sub-record-group)").toggleClass("amp-display-none");
    });

    var yearCount = 3;
    container.on("click",".record-list-operation a.record-list-add-btn",function(e){
        e.stopPropagation();
        e.preventDefault();
        var emptyRecord1 = container.find(".table-group-1 .table-group-right .record-list.empty-record-list");
        var emptyRecord2 = container.find(".table-group-2 .table-group-right .record-list.empty-record-list");

        $(container).find("[name=record-list-title-template]").tmpl({year:++yearCount}).insertBefore(emptyRecord1);


        // $(container).find("[name=record-list-content-template]").tmpl({}).insertBefore(emptyRecord2);

        var liHtml = $(container).find(".table-group-2 .year-record-list").html();
        liHtml+="<li><div class='amp-input amp-input-default amp-input-26'><input type='text'><div class='error-msg'><span></span></div></div></li>";
        liHtml = liHtml.replace("<li></li>","");
        liHtml = "<ul class='record-list'>"+liHtml+"</ul>";

        $(container).find("[name=record-list-content-template]").html(liHtml);
        $(container).find("[name=record-list-content-template] li.amp-font-weight-bold").html("-");
        liHtml = $(container).find("[name=record-list-content-template]").html();
        emptyRecord2.before(liHtml);
        updateSwiper();

        calculateIncomeExpenseSimulation();
    });

    container.on("click",".record-list-operation a.record-list-remove-btn",function(e){
        e.stopPropagation();
        e.preventDefault();

        var record1 = container.find(".table-group-1 .table-group-right .record-list.empty-record-list").prev();
        var record2 = container.find(".table-group-2 .table-group-right .record-list.empty-record-list").prev();
        if(!record1.hasClass("year-record-list")){
            record1.remove();
            yearCount--;
        }
        if(!record2.hasClass("year-record-list")){
            record2.remove();
        }
        updateSwiper();
    });

    container.on("change",".amp-input input",function(e){
        var value = $(this).val();
        if(isNaN(value)){
            $(this).next().find("span").html("请输入数字");
            $(this).closest(".amp-input").addClass("amp-input-error");
        }else{
            $(this).closest(".amp-input").removeClass("amp-input-error");
        }

    });

    function getFloat(val){
        if(isNaN(val)||val==""){
            return 0;
        }
        return parseFloat(val);
    }

    // 市值计算


    container.on("change","[name=sale-cost-percent]",function(e){
        var percent = $(this).val();

        calculateCostValue(percent)
    });

    function calculateCostValue(percent){
        if(isNaN(percent)){
            return;
        }
        percent = getFloat(percent);
        var currentMarketValue = getFloat($(container).find(".section:last-child ul li:nth-child(1) span").html());
        var value = currentMarketValue*percent/100;
        if(value<=0){
            return;
        }
        container.find("[name=sale-cost-value]").val(value);
    }

    function calculateMarketValue(currentMarketValue,loanValue){
        $(container).find(".section:last-child ul li:nth-child(1) span").html(currentMarketValue);
        $(container).find(".section:last-child ul li:nth-child(3) span").html(loanValue==0?"自动生成":loanValue);

        var currentBenefit = currentMarketValue-loanValue;
        $(container).find(".section:last-child ul li:nth-child(4) span").html(currentBenefit);

        var percent = container.find("[name=sale-cost-percent]").val();
        calculateCostValue(percent);
    }


    // 计算期初分析
    container.on("change",".initial-analysis .amp-input input",function(){
        var value = $(this).val();
        if(isNaN(value)){
            return;
        }
        calculateInitialAnalysis();
    });

    function calculateInitialAnalysis(){
        var value1 = getFloat($(container).find(".initial-analysis .form-group:nth-child(1) .amp-input input").val());
        var value2 = getFloat($(container).find(".initial-analysis .form-group:nth-child(2) .amp-input input").val());
        var value3 = getFloat($(container).find(".initial-analysis .form-group:nth-child(3) .amp-input input").val());
        var value5 = getFloat($(container).find(".initial-analysis .form-group:nth-child(5) .amp-input input").val());
        var total = value1+value2+value3;
        $(container).find(".initial-analysis .form-group:nth-child(4) span").html(total);
        $(container).find(".initial-analysis .form-group:nth-child(6) span").html(total-value5);

        calculateMarketValue(value1,value5);
    }

    // 计算收支模拟
    container.on("change",".income-expenses-simulation .amp-input input",function(){
        var value = $(this).val();
        if(isNaN(value)||value==""){
            return;
        }
        calculateIncomeExpenseSimulation();
    });

    function calculateIncomeExpenseSimulation(){
        // 每行横向计算
        container.find(".income-expenses-simulation .table-group-2 .table-group-right .year-record-list [data-group]").each(function(){
            var value = getFloat($(this).find(".amp-input input").val());
            var index = $(this).index();
            var nthChild=index+1;
            if(value==0){ // 没有输入年增长率
                return;
            }

            var currentValue = 0;
            container.find(".income-expenses-simulation .table-group-2 .table-group-right ul:not(.year-record-list,.empty-record-list) li:nth-child("+nthChild+")").each(function(ind){
                if(ind==0){
                    currentValue = getFloat($(this).find(".amp-input input").val());
                    return;
                }
                currentValue=parseInt(currentValue*(100+value)/100);
                if(currentValue==0){
                    return;
                }
                $(this).find(".amp-input input").val(currentValue);
            });
        });

        // 竖向计算
        container.find(".income-expenses-simulation .table-group-2 .table-group-right ul:not(.year-record-list,.empty-record-list)").each(function(){
            var value1 = getFloat($(this).find("li:nth-child(2) .amp-input input").val());
            var value2 = getFloat($(this).find("li:nth-child(3) .amp-input input").val());
            var value3 = getFloat($(this).find("li:nth-child(4) .amp-input input").val());
            var incomeValue = value1+value2+value3;
            $(this).find("li:nth-child(1)").html(incomeValue==0?"-":incomeValue);

            var value6 = getFloat($(this).find("li:nth-child(6) .amp-input input").val());
            var value8 = getFloat($(this).find("li:nth-child(8) .amp-input input").val());
            var value9 = getFloat($(this).find("li:nth-child(9) .amp-input input").val());
            var value10 = getFloat($(this).find("li:nth-child(10) .amp-input input").val());
            var value11 = getFloat($(this).find("li:nth-child(11) .amp-input input").val());
            var value12 = getFloat($(this).find("li:nth-child(12) .amp-input input").val());
            var value13 = getFloat($(this).find("li:nth-child(13) .amp-input input").val());
            var value14 = getFloat($(this).find("li:nth-child(14) .amp-input input").val());
            var value15 = getFloat($(this).find("li:nth-child(15) .amp-input input").val());
            var value16 = getFloat($(this).find("li:nth-child(16) .amp-input input").val());
            var value17 = getFloat($(this).find("li:nth-child(17) .amp-input input").val());
            var value18 = getFloat($(this).find("li:nth-child(18) .amp-input input").val());
            var feeValue = value6+value8+value9+value10+value11+value12+value13+value14+value15+value16+value17+value18;
            $(this).find("li:nth-child(5)").html(feeValue==0?"-":feeValue);
            var powerFee = value8+value9+value10;
            $(this).find("li:nth-child(7)").html(powerFee==0?"-":powerFee);


            var value20 = getFloat($(this).find("li:nth-child(20) .amp-input input").val());
            var value21 = getFloat($(this).find("li:nth-child(21) .amp-input input").val());
            var value22 = getFloat($(this).find("li:nth-child(22) .amp-input input").val());
            var taxValue = value20+value21+value22;
            $(this).find("li:nth-child(19)").html(taxValue==0?"-":taxValue);

            var noiValue = incomeValue - feeValue - taxValue;
            $(this).find("li:nth-child(23)").html(noiValue==0?"-":noiValue);




        });
    }


    container.on("click",".amp-nav-back",function(e){
        e.stopPropagation();
        e.preventDefault();
        window.close();
    });



    /* ======================================== function methods ======================================== */
    function updateSwiper(){
        swiper_1.update();
        swiper_2.update();
    }

});