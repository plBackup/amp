ampApp.controller("merchant-sale-main-controller",["$scope","$ampDocumentReady","$filter",function($scope,$ampDocumentReady,$filter){
    $scope.records = [{"dataGroup":1,"hasCollapseBtn":true,"calPerformance":"69","calSaleCount":"454728","commercialTypeName":"主力店","curPerformance":"138","curRentSaleRate":"11%","calRentSaleRate":"11%","curSaleCount":"454728"},{hide:true,"dataGroup":1,"calPerformance":"69","calSaleCount":"454728","commercialTypeName":"影院","curPerformance":"138","curRentSaleRate":"11%","calRentSaleRate":"11%","curSaleCount":"454728"},{"dataGroup":2,"hasCollapseBtn":true,"calPerformance":"460","calSaleCount":"57957020","commercialTypeName":"非主力店","curPerformance":"626","curRentSaleRate":"5%","calRentSaleRate":"4%","curSaleCount":"33492944"},{hide:true,"dataGroup":2,"calPerformance":"526","calSaleCount":"31637211","commercialTypeName":"餐饮","curPerformance":"724","curRentSaleRate":"6%","calRentSaleRate":"5%","curSaleCount":"18378250"},{hide:true,"dataGroup":2,"calPerformance":"260","calSaleCount":"4240098","commercialTypeName":"儿童","curPerformance":"320","curRentSaleRate":"3%","calRentSaleRate":"2%","curSaleCount":"2484129"},{hide:true,"dataGroup":2,"calPerformance":"446","calSaleCount":"10673573","commercialTypeName":"服装","curPerformance":"644","curRentSaleRate":" -   ","calRentSaleRate":" -   ","curSaleCount":"6022101"},{hide:true,"dataGroup":2,"calPerformance":"443","calSaleCount":"11406138","commercialTypeName":"配套","curPerformance":"600","curRentSaleRate":"6%","calRentSaleRate":"6%","curSaleCount":"6608464"},{"dataGroup":3,"calPerformance":"440","calSaleCount":"58411748","commercialTypeName":"合计","curPerformance":"597","curRentSaleRate":"5%","calRentSaleRate":"4%","curSaleCount":"33947672"}];

    /* ======================================== 监听广播事件 ======================================== */



    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#merchant-sale-main");

        createSalePercentPie();
        createMerchantPercentPie();

        if(isPC()){
            pin = $(container).find(".dept-table-head").pin({
                containerSelector: $(container).find(".cost-manual-work-pin-wrapper"),
                padding: {top: 44, bottom: 50}
            });
        }

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".pie-text",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location = "#/shop_sale_rank";
        });

        container.on("click",".collapse-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var group = $(this).attr("data-group");
            $(container).find("tr[data-group="+group+"]:not(.parent-record)").toggleClass("amp-display-hide");
            $(this).toggleClass("collapsed");
        });

        container.on("click",".table-block tbody tr:not(.parent-record) td:first-child",function(e){
            e.stopPropagation();
            e.preventDefault();
            var type = $(this).attr("data-type");
            if(type=="餐饮"){
                type = "catering";
            }else if(type=="配套"){
                type = "mating";
            }else if(type=="服装"){
                type = "clothing";
            }else if(type=="儿童"){
                type = "children";
            }else if(type=="影院"){
                type = "cinema";
            }
            local_storage.setItem("select_commercial_type_for_sale",type);

            window.location = "#/shop_sale_type_list";
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }
    function createSalePercentPie() {
        var id = "sale-percent-pie";
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            color:["#5ab46e","#d9dedf"],
            tooltip:{show:true,formatter:"{d}%"},
            series: [
                {
                    name:"销售",
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data:[16251462.38,17696209.62],
                    silent: false,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        $("#"+id).append("<div class='pie-text'>销售占比</div>");
    }

    function createMerchantPercentPie() {
        var id = "merchant-percent-pie";
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            color:["#5ab46e","#d9dedf"],
            tooltip:{show:true,formatter:"{d}%"},
            series: [
                {
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data:[ 93,117],
                    silent: false,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        $("#"+id).append("<div class='pie-text'>商家占比</div>");
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    setTimeout(function(){
        init();
    },300);
}]);



