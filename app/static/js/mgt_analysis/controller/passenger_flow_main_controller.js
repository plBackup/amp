ampApp.controller("passenger-flow-main-controller",["$scope","$ampDocumentReady","$filter",function($scope,$ampDocumentReady,$filter){
    $scope.records = [{"propertyFeeTotal":"652020.0","contractStartTime":"2016-09-10","rentTotal":"7704144.0","paymentType":"月付","period":"120.0","brandName":"星巴克","rentType":"提成租金","storeNo":"S1-2F-015 S1-1F-017","rentFreePeriod":"0.0","floorNo":"2F，1F","deductPercent":"9%","contractEndTime":"2026-09-09","commercialType":"餐饮-休闲餐饮-咖啡","contractId":"SYQBZZ16155","square":"217.34"},{"propertyFeeTotal":"428520.0","contractStartTime":"2016-09-10","rentTotal":"2487987.12","paymentType":"季付","period":"60.0","brandName":"青木瓜之味","rentType":"固定租金","storeNo":"H3e-2F-001 H3e-1F-001","rentFreePeriod":"3.0","floorNo":"1F，2F","deductPercent":"-","contractEndTime":"2021-09-09","commercialType":"餐饮-正餐-日韩东南亚餐-越南菜","contractId":"SYQBZZ16161","square":"285.68"},{"propertyFeeTotal":"1777200.0","contractStartTime":"2016-09-10","rentTotal":"9061350.4","paymentType":"季付","period":"60.0","brandName":"巴国布衣","rentType":"固定租金","storeNo":"H4a-1F-001/002/003 H4a-2F-001/002 H4a-3F-001","rentFreePeriod":"4.0","floorNo":"1F，2F，3F","deductPercent":"-","contractEndTime":"2021-09-09","commercialType":"餐饮-正餐-中式-川菜","contractId":"SYQBZZ16024","square":"1184.8"},{"propertyFeeTotal":"306540.0","contractStartTime":"2016-09-10","rentTotal":"939270.0","paymentType":"季付","period":"36.0","brandName":"麻麻鲁","rentType":"固定租金","storeNo":"S1-1F-001","rentFreePeriod":"3.0","floorNo":"1F","deductPercent":"-","contractEndTime":"2019-09-09","commercialType":"餐饮-正餐-中式-川菜","contractId":"SYQBZZ16362","square":"131.0"},{"propertyFeeTotal":"780858.0","contractStartTime":"2016-09-10","rentTotal":"1373509.2","paymentType":"季付","period":"36.0","brandName":"味三亭","rentType":"固定租金","storeNo":"S1-2F-001 S1-1F-002","rentFreePeriod":"3.0","floorNo":"1F，2F","deductPercent":"-","contractEndTime":"2019-09-09","commercialType":"餐饮-正餐-火锅-传统火锅","contractId":"SYQBZZ16109","square":"333.7"}];
    /* ======================================== 监听广播事件 ======================================== */

    $scope.info = {
        currentMonthCount:122140,
        fullYearTotalCount:1858152,
        fullYearCount:1858152,
        yearToYear:"-",
        linkRelative:"-2%",
        targetRate:"-",
        penetranceRate:"0.34",
        currentMonthDayRate:parseInt(getCurrentDate()/getDayOfMonth(new Date())*100),
        currentYearDayRate:parseInt(getFinishedDayOfYear(new Date())/getDayOfYear(new Date())*100),

        currentMonthDayTooltip:getCurrentDate()+"/"+getDayOfMonth(new Date()),
        currentYearDayTooltip:getFinishedDayOfYear(new Date())+"/"+getDayOfYear(new Date()),

        currentMonthIndexRate:"0",
        currentYearIndexRate:"0",
        currentMonthIndexTooltip:"0",
        currentYearIndexTooltip:"0"
    };

    $scope.chart = {
        real:[2850342,2409394,2348244,2459397,2488162,2326941,2630901,2579120,2528271,2859562,1666560,0],
        budget:[2820006,2639993,2610001,2502000,2610011,2340000,2440000,2460011,2349996,2840002,2665006,2750000],
        lastYear:[2693480,2516514,2486117,2346777,2491414,2231989,2322465,2351558,2238380,2709340,2287606,2250613]
    };

    var currentMonth = new Date().getMonth();
    $scope.info.currentMonthIndexTooltip = $scope.chart.real[currentMonth];
    $scope.info.currentMonthIndexRate = parseInt($scope.chart.real[currentMonth]/$scope.chart.budget[currentMonth]*100);

    function getCurrentYearIndexTooltip(){
        var result = 0;
        for(var i=0;i<=currentMonth;i++){
            result+=$scope.chart.real[i];
        }
        return result;
    }


    function getForecastValue(){
        var result = getCurrentYearIndexTooltip();
        for(var i=11;i>currentMonth;i--){
            result+=$scope.chart.budget[i];
        }
        return result;
    }

    function getFullYearIndex(){
        var result = 0;
        for(var i=0;i<=11;i++){
            result+=$scope.chart.budget[i];
        }
        return result;
    }

    $scope.info.currentMonthCount = $scope.chart.real[currentMonth];
    $scope.info.currentYearIndexTooltip = getCurrentYearIndexTooltip();
    $scope.info.currentYearIndexRate = parseInt(getCurrentYearIndexTooltip()/getFullYearIndex()*100);

    $scope.info.fullYearTotalCount = getCurrentYearIndexTooltip();
    $scope.info.fullYearCount = getForecastValue();
    $scope.info.linkRelative = parseInt(($scope.chart.real[currentMonth-1] - $scope.chart.real[currentMonth-2])/$scope.chart.real[currentMonth-2]*100);
    $scope.info.yearToYear = parseInt(($scope.chart.real[currentMonth-1] - $scope.chart.lastYear[currentMonth-1])/$scope.chart.lastYear[currentMonth-1]*100);
    $scope.info.targetRate = parseInt(($scope.chart.real[currentMonth-1])/$scope.chart.budget[currentMonth-1]*100);

    var prevMonth = new Date();
    prevMonth.setDate(0);
    $scope.info.penetranceRate = $filter("number")($scope.chart.real[currentMonth-1]/114829.25/getDayOfMonth(prevMonth));




    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#passenger-flow-main");

        createPassengerFlowChart();

        container.find(".amp-progress-bar").each(function(){
            var value = $(this).closest(".amp-progress").attr("data-value");
            $(this).find(".amp-progress-bar-finished").css("width",value+"%");
        });

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("mouseenter",".amp-progress-bar",function(e){
            e.stopPropagation();
            e.preventDefault();
            clearTimeout(leaveTimeout);

            var tooltipWidth = parseInt(container.find(".amp-progress-tooltip").css("width"));

            var x = e.pageX-200-tooltipWidth/2;
            var y = e.pageY-44;

            var tooltip = $(this).closest(".amp-progress").attr("data-tooltip");
            container.find(".amp-progress-tooltip span").html(tooltip);
            container.find(".amp-progress-tooltip").css({
                left:x+"px",
                top:y+"px"
            });

            container.find(".amp-progress-tooltip").fadeIn("fast");
        });

        var leaveTimeout = null;
        container.on("mouseleave",".amp-progress-bar",function(e){
            e.stopPropagation();
            e.preventDefault();
            clearTimeout(leaveTimeout);
            leaveTimeout = setTimeout(function(){
                container.find(".amp-progress-tooltip").fadeOut("fast");
            },500);
        });
    }

    /* ======================================== common methods ======================================== */

    function createPassengerFlowChart(){
        var myChart = echarts.init(container.find(".passenger-flow-chart .passenger-flow-chart-content")[0]);
        var option = {
            color: ["#5AB46E", "#5CD3F5", "#038BD9"],

            tooltip:{show:true},

            legend: {
                orient: 'horizontal', // 'vertical'
                x: 'center', // 'center' | 'left' | {number},
                y: 'bottom', // 'center' | 'bottom' | {number}
                borderWidth: 0,
                padding: 5,    // [5, 10, 15, 20]
                itemGap: 20,
                itemWidth: 15,
                temHeight: 10,
                textStyle: {color: '#9EA8B5'},

                data: [
                    {name: "实际", icon: "rect"},
                    {name: "预算", icon: "rect"},
                    {name: "去年同期", icon: "rect"}

                ]
            },
            xAxis: {
                type: 'category',
                axisLine: {show: true, lineStyle: {color: "#f3f4f8"}},
                axisLabel: {show: true, textStyle: {color: "#737e8c"}},
                splitLine: {show: false},
                axisTick: {show: false},
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

            },

            yAxis: {
                type: 'value',
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                axisLine: {show: false}
            },
            series: [
                {
                    barWidth: 10,
                    name: '实际',
                    type: 'bar',
                    data: $scope.chart.real
                },
                {
                    barWidth: 10,
                    name: '预算',
                    type: 'bar',
                    data: $scope.chart.budget
                },
                {
                    barWidth: 10,
                    name: '去年同期',
                    type: 'bar',
                    data: $scope.chart.lastYear
                }
            ]
        };


        myChart.setOption(option);
    }

    function destroy(){
    }

    function getCurrentDate(){
        return new Date().getDate();
    }

    function getDayOfMonth(d){
        var date = new Date(d);
        var month = date.getMonth();
        date.setMonth(month+1);
        date.setDate(0);
        return date.getDate();
    }

    function getFinishedDayOfYear(d){
        var month = d.getMonth();
        var year = d.getFullYear();
        var date = d.getDate();
        var result = date;
        for(var i =0;i<month;i++){
            var date = new Date();
            date.setFullYear(year);
            date.setMonth(month);
            result+=getDayOfMonth(date);
        }

        return result;
    }

    function getDayOfYear(d){
        var result = 0;
        var date = new Date(d);
        for(var i=0;i<12;i++){
            date.setMonth(i);
            result+=getDayOfMonth(date);
        }
        return result;
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



