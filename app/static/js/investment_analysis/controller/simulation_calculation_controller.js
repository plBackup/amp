var simulationApp = angular.module("simulationApp", ['ampFilters']);

simulationApp.factory("$ampDocumentReady",["$interval",function($interval){

    var delay = 200; // 延迟加载时间
    var count = 30; // 最多执行次数

    function load(selector,callback){

        var promise = $interval(function(){
            if($(selector).length>0){
                callback();
                $interval.cancel(promise);
            }
        },delay,count);

    }

    return load;


}]);


simulationApp.controller("simulation-calculation-controller",["$scope","$ampDocumentReady","$filter",function($scope,$ampDocumentReady,$filter){

    //{
    //    irrPercent:"9.61%",
    //        netPresentValue:"113073.98",
    //    appreciation:"9913.70",
    //    cashFlow:"100065.47",
    //    yearIndex:"2"
    //}
    /* ======================================== 投资收益的测试指标 ======================================== */
    $scope.testIndexRecords = [
        {
            irrPercent:"16%",
            netPresentValue:"14741.82",
            appreciation:"13782.83",
            cashFlow:"4217.19",
            yearIndex:"2"
        },
        {
            irrPercent:"19.80%",
            netPresentValue:"32606.82",
            appreciation:"9812.00",
            cashFlow:"5044.16",
            yearIndex:"3"
        }

    ];

    // get cash flow list
    function getCashFlowList(year){
        var result = [];
        $scope.incomeExpense.contents.forEach(function(item,index){

            if(year-1<index){
                return;
            }

            var income = getValue(item.noi,"自动生成");
            var loanAmount = getValue($scope.initialAnalysis.loan,"自动生成");
            var loan = loanAmount;
            if(isNumber(loanAmount)){
                loanAmount=0;
            }

            var loanRate = getValue($scope.initialAnalysis.loanRate,"自动生成");
            var loanInterest = "自动生成";

            if(isNumber(loan)&&isNumber(loanRate)){
                loanInterest = loan*loanRate/100;
            }

            var charges = getValue(item.capitalExport,"自动生成");
            var subtractValue = addNumber([loanAmount,loanInterest,charges],"-");
            var preTaxCashFlow = "自动生成";
            if(isNumber(income)&&isNumber(subtractValue)){
                preTaxCashFlow = income - subtractValue;
            }else if(isNumber(income)){
                preTaxCashFlow = income;
            }else if(isNumber(subtractValue)){
                preTaxCashFlow = -1*subtractValue
            }
            if(isNumber(preTaxCashFlow)){
                result.push(preTaxCashFlow);
            }
        });
        return result;
    }

    function resetTestIndexRecords(){
        var finance = new Finance();
        var result = [];
        var maxYear = $scope.incomeExpense.contents.length;
        $scope.incomeExpense.contents.forEach(function(item,index){
            if(index==0){ // 不需要第一年
                return;
            }

            /* 获取年份 */
            var yearIndex = index+1; // 年份

            /* 获取增值 */
            var appreciation = "-";
            var year = index+1;
            var nextYear = year+1;
            if(nextYear>maxYear){
                nextYear = maxYear;
            }
            var salePrice = "自动生成"; // 第n+1年noi 除以 第n年输出资本化率
            var noi = getValue($scope.incomeExpense.contents[nextYear-1].noi,"-");
            var rate = getValue(getSpecialRate(year),"-");

            if(isNumber(noi)&&isNumber(rate)&&parseFloat(rate)!=0){
                salePrice = parseFloat(noi)/parseFloat(rate)*100;
            }
            var purchasingPrice = $scope.initialAnalysis.purchasingPrice;
            var totalCapitalExport = "-";
            $scope.incomeExpense.contents.forEach(function(subItem,ind){
                if(ind>index){
                    return;
                }
                totalCapitalExport = addNumber([totalCapitalExport,subItem.capitalExport],"-");
            });
            totalCapitalExport = addNumber([totalCapitalExport,purchasingPrice],"-");
            appreciation = subtractNumber(salePrice,totalCapitalExport,"-");

            /* 净现值 */
            var netPresentValue = "-";

            var initialBenefit = getValue($scope.initialAnalysis.initialBenefit,"-");// 初始投资
            var benefitRate = getValue($scope.parameterInfo.benefitRate,"-"); // 折现率
            var cashFlowList = getCashFlowList(yearIndex);

            var saleCost = getValue($scope.marketInfo.costValue,"自动生成");
            var loanBalance = getValue($scope.initialAnalysis.loan,"自动生成");

            var subtract = addNumber([saleCost,loanBalance],"-");
            var netSalesIncome = "自动生成"; // 净销售所得
            if(isNumber(salePrice)&&isNumber(subtract)){
                netSalesIncome = salePrice-subtract;
            }else if(isNumber(salePrice)){
                netSalesIncome = salePrice;
            }else if(isNumber(subtract)){
                netSalesIncome = -1*subtract;
            }
            var currentCashFlow = null; // 当年现金流
            if(cashFlowList.length>0){
                currentCashFlow = cashFlowList[cashFlowList.length-1];

                cashFlowList[cashFlowList.length-1] = addNumber([cashFlowList[cashFlowList.length-1],netSalesIncome],null);
                console.log(cashFlowList);
            }
            if(isNumber(initialBenefit)&&isNumber(benefitRate)){
                var params = "";
                cashFlowList.forEach(function(item){
                    params=params+","+item;
                });
                //irrPercent = finance.IRR(initialBenefit,cashFlowList)+"%";
                netPresentValue = eval("new Finance().NPV("+benefitRate+","+initialBenefit+params+")");

                //netPresentValue = finance.NPV(benefitRate, initialBenefit, cashFlowList);
            }

            /* irr */
            var irrPercent = "-";
            if(isNumber(initialBenefit)){
                try{
                    var params = "";
                    cashFlowList.forEach(function(item){
                        params=params+","+item;
                    });
                    //irrPercent = finance.IRR(initialBenefit,cashFlowList)+"%";
                    irrPercent = eval("new Finance().IRR("+initialBenefit+params+")")+"%";
                }catch(e){console.log(e);}
            }

            /* 税前现金流/权益 */
            var rate = "-";
            if(isNumber(currentCashFlow)&&isNumber(netSalesIncome)){
                try{
                    rate = $filter("number")(parseFloat(currentCashFlow)/parseFloat(netSalesIncome)*100)+"%";
                }catch(e){console.log(e);}
            }

            result.push({yearIndex:yearIndex,appreciation:appreciation,netPresentValue:netPresentValue,irrPercent:irrPercent,rate:rate});
        });
        $scope.testIndexRecords = result;
    }

    /* ======================================== 期初分析 ======================================== */
    $scope.initialAnalysis = {
        purchasingPrice:null,
        purchasingFee:null,
        loanFee:null,
        loan:null,
        loanRate:null,
        originBase:"-",
        initialBenefit:"-"
    };

    function resetInitialAnalysis(){
        if( $scope.initialAnalysis.purchasingPrice==null&&
            $scope.initialAnalysis.purchasingFee==null&&
            $scope.initialAnalysis.loanFee==null){
            $scope.initialAnalysis.originBase = "-";
        }else{
            $scope.initialAnalysis.originBase = $scope.initialAnalysis.purchasingPrice+$scope.initialAnalysis.purchasingFee+$scope.initialAnalysis.loanFee;
        }

        if( $scope.initialAnalysis.purchasingPrice==null&&
            $scope.initialAnalysis.purchasingFee==null&&
            $scope.initialAnalysis.loanFee==null&&
            $scope.initialAnalysis.loan==null){
            $scope.initialAnalysis.initialBenefit = "-";
        }else{
            $scope.initialAnalysis.initialBenefit = $scope.initialAnalysis.purchasingPrice+$scope.initialAnalysis.purchasingFee+$scope.initialAnalysis.loanFee-$scope.initialAnalysis.loan;
        }
    }

    $scope.$watch("initialAnalysis.purchasingPrice",function(newValue,oldValue, scope){
        resetInitialAnalysis();

        resetMarketInfo();

        resetTestIndexRecords();
    });
    $scope.$watch("initialAnalysis.purchasingFee",function(newValue,oldValue, scope){
        resetInitialAnalysis();
        resetTestIndexRecords();
    });
    $scope.$watch("initialAnalysis.loanFee",function(newValue,oldValue, scope){
        resetInitialAnalysis();
        resetTestIndexRecords();
    });
    $scope.$watch("initialAnalysis.loan",function(newValue,oldValue, scope){
        resetInitialAnalysis();
        resetTestIndexRecords();
        resetMarketInfo();
    });

    /* ======================================== 参数 ======================================== */
    $scope.parameterInfo = {
        benefitRate:null, // 业主要求的收益率
        inputCapitalizationRate:null,// 输入资本化率
        outputCapitalizationRateList:[
            {year:2,rate:null,addRecord:true},
            {year:3,rate:null,removeRecord:true}
        ]// 输出资本化率
    };

    $scope.$watch("parameterInfo.inputCapitalizationRate",function(){
        resetMarketInfo();
        resetTestIndexRecords();
    });

    $scope.$watch("parameterInfo.benefitRate",function(){
        resetTestIndexRecords();
    });

    /* ======================================== 市值 ======================================== */
    $scope.$watch("marketInfo.costPercent",function(newValue,oldValue, scope){
        resetMarketInfo();
        resetTestIndexRecords();
    });


    $scope.marketInfo={
        currentMarketValue:"自动生成",
        costValue:null,
        costPercent:null,
        loanValue:"自动生成",
        currentBenefit:"自动生成"
    };

    function resetMarketInfo(){
        var firstNoi = null;// 第一年 noi
        if($scope.incomeExpense.contents.length>0&&isNumber($scope.incomeExpense.contents[0].noi)){
            firstNoi = parseFloat($scope.incomeExpense.contents[0].noi);
        }

        var inputCapitalizationRate = $scope.parameterInfo.inputCapitalizationRate;

        var currentMarketValue = null;
        if(firstNoi!=null&&inputCapitalizationRate!=null){
            currentMarketValue = firstNoi/inputCapitalizationRate*100;
        }

        if(currentMarketValue==null){
            $scope.marketInfo.currentMarketValue = "自动生成";
        }else{
            $scope.marketInfo.currentMarketValue = currentMarketValue;
        }
        var costPercent = $scope.marketInfo.costPercent;
        var costValue = $scope.marketInfo.costValue;
        if(currentMarketValue!=null&&costPercent!=null){
            costValue = currentMarketValue*costPercent/100;
        }
        $scope.marketInfo.costValue = costValue;

        var loanValue = $scope.initialAnalysis.loan;
        if(!isNumber(loanValue)) {
            loanValue="自动生成";
        }

        $scope.marketInfo.loanValue = loanValue;

        var currentBenefit = "自动生成";
        if(isNumber(currentMarketValue)&&isNumber(loanValue)){
            currentBenefit = currentMarketValue - loanValue;
        }
        $scope.marketInfo.currentBenefit = currentBenefit;
    }


    /* ======================================== 收支模拟 ======================================== */
    $scope.$watchCollection("incomeExpenseYearIncreaseRate",function(newValue,oldValue, scope){
        recalculateIncomeExpense();
        resetTestIndexRecords();
    });

    $scope.incomeExpenseYearIncreaseRate = {
        rentIncomeRate:null,
        propertyFeeIncomeRate:null,
        otherIncomeRate:null,
        landValueTaxRate:null,

        energyConsumptionRate:null,
        waterFeeRate:null,
        powerFeeRate:null,
        gasFeeRate:null,
        maintenanceFeeRate:null,
        generalMgtFeeRate:null,
        marketingExpenseRate:null,
        wagesRelatedCostRate:null,
        mgtFeeRate:null,
        chargeOffRate:null,
        depreciationRate:null,
        otherFeeRate:null,

        housePropertyTaxRate:null,
        businessTaxRate:null,
        otherTaxRate:null
    };

    function createEmptyRecordContent(){
        return {
            totalIncome:"-",
            rentIncome:null,
            propertyFeeIncome:null,
            otherIncome:null,
            totalFee:"-",
            landValueTax:null,
            energyConsumption:"-",
            waterFee:null,
            powerFee:null,
            gasFee:null,
            maintenanceFee:null,
            generalMgtFee:null,
            marketingExpense:null,
            wagesRelatedCost:null,
            mgtFee:null,
            chargeOff:null,
            depreciation:null,
            otherFee:null,
            totalTax:"-",
            housePropertyTax:null,
            businessTax:null,
            otherTax:null,
            noi:"-",
            capitalExport:null
        }
    }



    $scope.incomeExpense = {
        headers:[1,2,3],
        contents:[createEmptyRecordContent(),createEmptyRecordContent(),createEmptyRecordContent()]
    };

    function powerCalculate(number,powerBase,powerIndex,defaultValue){

        if(!isNumber(number)||!isNumber(powerBase)) {
            return defaultValue;
        }

        for(var i=1;i<=powerIndex;i++){
            number = number*(powerBase/100+1);
        }
        return parseInt(number);
    }

    function addNumber(arr,placeholder){
        var result = 0;
        var nonNumber = true;
        arr.forEach(function(item){
            if(isNumber(item)){
                nonNumber = false;
                result = parseInt(item)+result;
            }
        });



        if(nonNumber){
            result=placeholder;
        }
        return result;
    }

    /* 2个数相减 */
    function subtractNumber(first,second,placeholder){
        if(isNumber(first)&&isNumber(second)){
            return parseFloat(first) - parseFloat(second);
        }else if(isNumber(first)){
            return first;
        }else if(isNumber(second)){
            return -1*parseFloat(second);
        }
        return placeholder;
    }

    function recalculateIncomeExpense(){
        var firstItem = null;
        var rate = $scope.incomeExpenseYearIncreaseRate;
        if($scope.incomeExpense.contents.length>0){
            firstItem = $scope.incomeExpense.contents[0];
        }

        $scope.incomeExpense.contents.forEach(function(item,index){
            // 计算 收入
            item.rentIncome = powerCalculate(firstItem.rentIncome,rate.rentIncomeRate,index,item.rentIncome);
            //console.log(item.rentIncome);

            item.propertyFeeIncome = powerCalculate(firstItem.propertyFeeIncome,rate.propertyFeeIncomeRate,index,item.propertyFeeIncome);
            item.otherIncome = powerCalculate(firstItem.otherIncome,rate.otherIncomeRate,index,item.otherIncome);
            item.totalIncome = addNumber([item.rentIncome,item.propertyFeeIncome,item.otherIncome],"-");

            // 计算 费用
            item.landValueTax = powerCalculate(firstItem.landValueTax,rate.landValueTaxRate,index,item.landValueTax);
            item.waterFee = powerCalculate(firstItem.waterFee,rate.waterFeeRate,index,item.waterFee);
            item.powerFee = powerCalculate(firstItem.powerFee,rate.powerFeeRate,index,item.powerFee);
            item.gasFee = powerCalculate(firstItem.gasFee,rate.gasFeeRate,index,item.gasFee);
            item.maintenanceFee = powerCalculate(firstItem.maintenanceFee,rate.maintenanceFeeRate,index,item.maintenanceFee);
            item.generalMgtFee = powerCalculate(firstItem.generalMgtFee,rate.generalMgtFeeRate,index,item.generalMgtFee);
            item.marketingExpense = powerCalculate(firstItem.marketingExpense,rate.marketingExpenseRate,index,item.marketingExpense);
            item.wagesRelatedCost = powerCalculate(firstItem.wagesRelatedCost,rate.wagesRelatedCostRate,index,item.wagesRelatedCost);
            item.mgtFee = powerCalculate(firstItem.mgtFee,rate.mgtFeeRate,index,item.mgtFee);
            item.chargeOff = powerCalculate(firstItem.chargeOff,rate.chargeOffRate,index,item.chargeOff);
            item.depreciation = powerCalculate(firstItem.depreciation,rate.depreciationRate,index,item.depreciation);
            item.otherFee = powerCalculate(firstItem.otherFee,rate.otherFeeRate,index,item.otherFee);
            item.totalFee = addNumber([  item.landValueTax,
                                            item.waterFee,
                                            item.powerFee,
                                            item.gasFee,
                                            item.maintenanceFee,
                                            item.generalMgtFee,
                                            item.marketingExpense,
                                            item.wagesRelatedCost,
                                            item.mgtFee,item.chargeOff,item.depreciation,item.otherFee],"-");
            item.energyConsumption=addNumber([item.waterFee,item.powerFee,item.gasFee],"-");

            // 计算税
            item.housePropertyTax = powerCalculate(firstItem.housePropertyTax,rate.housePropertyTaxRate,index,item.housePropertyTax);
            item.businessTax = powerCalculate(firstItem.businessTax,rate.businessTaxRate,index,item.businessTax );
            item.otherTax = powerCalculate(firstItem.otherTax,rate.otherTaxRate,index,item.otherTax);
            item.totalTax = addNumber([item.housePropertyTax,item.businessTax,item.otherTax],"-");

            // 计算 noi
            var totalCost = addNumber([item.totalFee,item.totalTax],"-");
            if(isNumber(totalCost)&&isNumber(item.totalIncome)){
                item.noi=item.totalIncome-totalCost;
            }else if(isNumber(totalCost)){
                item.noi=-1*totalCost;
            }else if(isNumber(item.totalIncome)){
                item.noi = item.totalIncome;
            }else{
                item.noi="-";
            }
        });
    }


    /* ======================================== 税前现金流 ======================================== */
    $scope.preTaxCashFlowRecords = [
        {year:1,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"},
        {year:2,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"},
        {year:3,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"}
    ];

    function getValue(number,placeholder){
        if(isNumber(number)){
            return number;
        }
        return placeholder;
    }

    function resetPreTaxCashFlowInfo(){
        var result = [];
        $scope.incomeExpense.contents.forEach(function(item,index){
            var year = index+1;
            var income = getValue(item.noi,"自动生成");
            var loanAmount = getValue($scope.initialAnalysis.loan,"自动生成");
            var loan = loanAmount;
            if(isNumber(loanAmount)){
                loanAmount = 0;
            }

            var loanRate = getValue($scope.initialAnalysis.loanRate,"自动生成");
            var loanInterest = "自动生成";

            if(isNumber(loan)&&isNumber(loanRate)){
                loanInterest = loan*loanRate/100;
            }

            var charges = getValue(item.capitalExport,"自动生成");
            var subtractValue = addNumber([loanAmount,loanInterest,charges],"-");
            var preTaxCashFlow = "自动生成";
            if(isNumber(income)&&isNumber(subtractValue)){
                preTaxCashFlow = income - subtractValue;
            }else if(isNumber(income)){
                preTaxCashFlow = income;
            }else if(isNumber(subtractValue)){
                preTaxCashFlow = -1*subtractValue
            }


            result.push({year:year,income:income,loanAmount:loanAmount,loanInterest:loanInterest,charges:charges,preTaxCashFlow:preTaxCashFlow});

        });
        $scope.preTaxCashFlowRecords = result;
    }

    /* ======================================== 销售所得分析 ======================================== */
    $scope.saleIncomeAnalysisRecords = [
        {year:2,salePrice:"自动生成",saleCost:"自动生成",loanBalance:"自动生成",netSalesIncome:"自称生成"},
        {year:3,salePrice:"自动生成",saleCost:"自动生成",loanBalance:"自动生成",netSalesIncome:"自称生成"}
    ];

    function getSpecialRate(year){
        var rate = null;
        $scope.parameterInfo.outputCapitalizationRateList.forEach(function(item){
            if(year==item.year){
                rate = item.rate;
            }
        });
        return rate;
    }

    function resetSaleIncomeAnalysisRecords(){
        var result = [];
        var maxYear = $scope.incomeExpense.contents.length;

        $scope.incomeExpense.contents.forEach(function(item,index){
            if(index==0){
                return;
            }

            var year = index+1;
            var nextYear = year+1;
            if(nextYear>maxYear){
                nextYear = maxYear;
            }
            var salePrice = "自动生成"; // 第n+1年noi 除以 第n年输出资本化率
            var noi = getValue($scope.incomeExpense.contents[nextYear-1].noi,"-");
            var rate = getValue(getSpecialRate(year),"-");

            if(isNumber(noi)&&isNumber(rate)&&parseFloat(rate)!=0){
                salePrice = parseFloat(noi)/parseFloat(rate)*100;
            }

            var saleCost = getValue($scope.marketInfo.costValue,"自动生成");
            var loanBalance = getValue($scope.initialAnalysis.loan,"自动生成");

            var subtract = addNumber([saleCost,loanBalance],"-");
            var netSalesIncome = "自动生成";
            if(isNumber(salePrice)&&isNumber(subtract)){
                netSalesIncome = salePrice-subtract;
            }else if(isNumber(salePrice)){
                netSalesIncome = salePrice;
            }else if(isNumber(subtract)){
                netSalesIncome = -1*subtract;
            }


            result.push({year:year,salePrice:salePrice,saleCost:saleCost,loanBalance:loanBalance,netSalesIncome:netSalesIncome});

        });
        $scope.saleIncomeAnalysisRecords = result;
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var swiper_1 = null;
    var swiper_2 = null;
    var preTaxCashFlowSwiper = null;
    var saleIncomeAnalysisSwiper = null;

    function initPageView(){
        container = $("#simulation-calculation");

        $(container).find(".ys-tips").tooltip();

        var clientHeight = $(window).height();

        container.find(".amp-content-panel").css("height",clientHeight-44-44+"px");
        container.find(".amp-content-panel-body").css("height",clientHeight-44-73-44+"px");
        container.find(".table-group-2").css("height",clientHeight-44-73-120-44+"px");

        if(isPC()){
            swiper_1 = new Swiper(".income-expenses-simulation .table-group-1 .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            swiper_2 = new Swiper(".income-expenses-simulation .table-group-2 .swiper-container", {
                scrollbar: ".income-expenses-simulation .table-group-2 .swiper-scrollbar",
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            preTaxCashFlowSwiper = new Swiper(".pre-tax-cash-flow .table-group-right .swiper-container", {
                scrollbar: ".pre-tax-cash-flow .table-group-right .swiper-scrollbar",
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            saleIncomeAnalysisSwiper = new Swiper(".sale-income-analysis .table-group-right .swiper-container", {
                scrollbar: ".sale-income-analysis .table-group-right .swiper-scrollbar",
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            swiper_1.params.control = swiper_2;//需要在Swiper2初始化后，Swiper1控制Swiper2
            swiper_2.params.control = swiper_1;//需要在Swiper1初始化后，Swiper2控制Swiper1
        }


        $("#preloader").fadeOut("fast");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".section a.collapse-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".section").toggleClass("open");
        });
        container.on("click",".section .nested-record-add a",function(e){
            e.stopPropagation();
            e.preventDefault();
            // $(container).find("[name=nested-record-remove-template]").tmpl({}).appendTo($(this).closest(".form-content"));

            var len = $scope.parameterInfo.outputCapitalizationRateList.length;
            var year = $scope.parameterInfo.outputCapitalizationRateList[len-1].year;
            $scope.parameterInfo.outputCapitalizationRateList.push({
                year:year+1,
                rate:null,
                removeRecord:true
            });
            $scope.$apply();
        });
        container.on("click",".section .nested-record-remove a",function(e){
            e.stopPropagation();
            e.preventDefault();
            var index = $(this).closest(".nested-record").index();
            $scope.parameterInfo.outputCapitalizationRateList.splice(index,1);
            resetSaleIncomeAnalysisRecords();
            $scope.$apply();
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
            if(href==".pre-tax-cash-flow"){
                resetPreTaxCashFlowInfo();
                $scope.$apply();
                setTimeout(function(){updateSwiper();},300);
            }
            if(href==".sale-income-analysis"){
                updateSwiper();
            }
            if(href==".sale-income-analysis"){
                resetSaleIncomeAnalysisRecords();$scope.$apply();
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


        container.on("click",".record-list-operation a.record-list-add-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var len = $scope.incomeExpense.headers.length;
            $scope.incomeExpense.headers.push(len+1);
            console.log($scope.incomeExpense.headers);
            $scope.incomeExpense.contents.push(createEmptyRecordContent());
            resetTestIndexRecords();

            recalculateIncomeExpense();

            $scope.$apply();

            setTimeout(function(){
                updateSwiper();
            },500);

        });

        container.on("click",".record-list-operation a.record-list-remove-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            $scope.incomeExpense.headers.pop();
            $scope.incomeExpense.contents.pop();


            recalculateIncomeExpense();
            resetTestIndexRecords();
            $scope.$apply();

            setTimeout(function(){
                updateSwiper();
            },500);
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


        // 计算收支模拟
        container.on("keyup",".income-expenses-simulation .amp-input input",function(){
            var value = $(this).val();
            if(isNaN(value)||value==""){
                return;
            }
            recalculateIncomeExpense();
            resetMarketInfo();
            resetTestIndexRecords();
            $scope.$apply();
        });

        container.on("keyup","[data-name=outputCapitalizationRate]",function(){
            resetSaleIncomeAnalysisRecords();
            resetTestIndexRecords();
            $scope.$apply();
        });

        container.on("click",".amp-nav-back",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.close();
        });

        // 重置
        //container.on("click","a.reset-case-btn",function(e){
        //    e.stopPropagation();
        //    e.preventDefault();
        //
        //    $scope.testIndexRecords = [];// 投资收益的测试指标
        //    // 期初分析
        //    $scope.initialAnalysis = {
        //        purchasingPrice:null,
        //        purchasingFee:null,
        //        loanFee:null,
        //        loan:null,
        //        loanRate:null,
        //        originBase:"-",
        //        initialBenefit:"-"
        //    };
        //    // 参数
        //    $scope.parameterInfo = {
        //        benefitRate:null, // 业主要求的收益率
        //        inputCapitalizationRate:null,// 输入资本化率
        //        outputCapitalizationRateList:[
        //            {year:2,rate:null,addRecord:true},
        //            {year:3,rate:null,removeRecord:true}
        //        ]// 输出资本化率
        //    };
        //
        //    // 市值
        //    $scope.marketInfo={
        //        currentMarketValue:"自动生成",
        //        costValue:null,
        //        costPercent:null,
        //        loanValue:"自动生成",
        //        currentBenefit:"自动生成"
        //    };
        //
        //    // 收支模拟
        //    $scope.incomeExpenseYearIncreaseRate = {
        //        rentIncomeRate:null,
        //        propertyFeeIncomeRate:null,
        //        otherIncomeRate:null,
        //        landValueTaxRate:null,
        //
        //        energyConsumptionRate:null,
        //        waterFeeRate:null,
        //        powerFeeRate:null,
        //        gasFeeRate:null,
        //        maintenanceFeeRate:null,
        //        generalMgtFeeRate:null,
        //        marketingExpenseRate:null,
        //        wagesRelatedCostRate:null,
        //        mgtFeeRate:null,
        //        chargeOffRate:null,
        //        depreciationRate:null,
        //        otherFeeRate:null,
        //
        //        housePropertyTaxRate:null,
        //        businessTaxRate:null,
        //        otherTaxRate:null
        //    };
        //
        //    $scope.incomeExpense = {
        //        headers:[1,2,3],
        //        contents:[createEmptyRecordContent(),createEmptyRecordContent(),createEmptyRecordContent()]
        //    };
        //
        //    // 税前现金流
        //    $scope.preTaxCashFlowRecords = [
        //        {year:1,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"},
        //        {year:2,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"},
        //        {year:3,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"}
        //    ];
        //
        //    // 销售所得分析
        //    $scope.saleIncomeAnalysisRecords = [
        //        {year:2,salePrice:"自动生成",saleCost:"自动生成",loanBalance:"自动生成",netSalesIncome:"自称生成"},
        //        {year:3,salePrice:"自动生成",saleCost:"自动生成",loanBalance:"自动生成",netSalesIncome:"自称生成"}
        //    ];
        //    $scope.$apply();
        //});

        // 保存
        container.on("click","a.save-case-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var CASE_KEY = "saved_case_info";
            var saseInfo = {
                testIndexRecords:$scope.testIndexRecords,
                initialAnalysis:$scope.initialAnalysis,
                parameterInfo:$scope.parameterInfo,
                marketInfo:$scope.marketInfo,
                incomeExpenseYearIncreaseRate:$scope.incomeExpenseYearIncreaseRate,
                incomeExpense:$scope.incomeExpense,
                preTaxCashFlowRecords:$scope.preTaxCashFlowRecords,
                saleIncomeAnalysisRecords:$scope.saleIncomeAnalysisRecords
            };
            local_storage.setData(CASE_KEY,saseInfo);
        });

        // 删除方案
        container.on("click","a.delete-case-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            var CASE_KEY = "saved_case_info";
            local_storage.setData(CASE_KEY,null);
        });
    }


    /* ======================================== common methods ======================================== */
    // 初始化 数据
    function initializeData(){
        var CASE_KEY = "saved_case_info";
        var data = local_storage.getData(CASE_KEY);
        if(data==null){

        }else{

        }
    }

    function destroy(){
    }
    function getFloat(val){
        if(isNaN(val)||val==""){
            return 0;
        }
        return parseFloat(val);
    }

    function isNumber(obj){
        if(obj==null||obj==""||isNaN(obj)){
            return false;
        }
        return true;
    }

    function updateSwiper(){
        if(isPC()){
            swiper_1.update();
            swiper_2.update();
            preTaxCashFlowSwiper.update();
            saleIncomeAnalysisSwiper.update();
        }
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);



