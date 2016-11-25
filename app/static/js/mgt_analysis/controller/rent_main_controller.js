ampApp.controller("rent-main-controller",["$scope","$ampDocumentReady",function($scope,$ampDocumentReady){
    $scope.records = [{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"-","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"0.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"1","businessBudget":"0.0","businessPercent":"-"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"-","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"0.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"2","businessBudget":"0.0","businessPercent":"-"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"168.82","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"3","businessBudget":"168.82","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"122.96","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"4","businessBudget":"122.96","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"58.49","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"5","businessBudget":"58.49","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"8.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"6","businessBudget":"8.0","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"-","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"0.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"7","businessBudget":"0.0","businessPercent":"-"},{"totalReal":"44.18","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"44.18","totalPercent":"230%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"19.2","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"8","businessBudget":"19.2","businessPercent":"230%"},{"totalReal":"194.27","manualWorkBudget":"0.27","projectReal":"0.87","businessReal":"116.98","totalPercent":"61%","projectPercent":"100%","manualWorkPercent":"100%","mgtFeeBudget":"76.15","totalBudget":"317.13","manualWorkReal":"0.27","projectBudget":"0.87","mgtFeeReal":"76.15","mgtFeePercent":"100%","month":"9","businessBudget":"239.84","businessPercent":"49%"},{"totalReal":"86.39","manualWorkBudget":"12.63","projectReal":"0.0","businessReal":"71.94","totalPercent":"47%","projectPercent":"-","manualWorkPercent":"100%","mgtFeeBudget":"1.82","totalBudget":"183.01","manualWorkReal":"12.63","projectBudget":"0.0","mgtFeeReal":"1.82","mgtFeePercent":"100%","month":"10","businessBudget":"168.56","businessPercent":"43%"},{"totalReal":"22.32","manualWorkBudget":"7.68","projectReal":"0.0","businessReal":"14.64","totalPercent":"25%","projectPercent":"-","manualWorkPercent":"100%","mgtFeeBudget":"0.0","totalBudget":"90.68","manualWorkReal":"7.68","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"11","businessBudget":"83.0","businessPercent":"18%"},{"totalReal":"0.0","manualWorkBudget":"20.5","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"0%","manualWorkPercent":"0%","mgtFeeBudget":"418.66","totalBudget":"591.3","manualWorkReal":"0.0","projectBudget":"47.2","mgtFeeReal":"0.0","mgtFeePercent":"0%","month":"12","businessBudget":"104.94","businessPercent":"0%"}];

    $scope.saleRatePie = [{name:"餐饮",value:"65.59"},{name:"超市",value:"0"},{name:"儿童",value:"4.29 "},{name:"服装",value:"0"},{name:"配套",value:"26.98"},{name:"影院",value:"3.14 "}];

    $scope.squareRatePie = [{name:"餐饮",value:"42.95"},{name:"超市",value:"0"},{name:"儿童",value:"12.76"},{name:"服装",value:"17.09"},{name:"配套",value:"22.13"},{name:"影院",value:"5.07 "}];

    $scope.rentList = [{"rentIncomeAvg":"","rentCountRate":"0%","rentCount":"0","dateItem":"1个月内","squareRate":"0%","rentIncomeRate":"0%","rentIncome":"0","square":"0"},{"rentIncomeAvg":"","rentCountRate":"0%","rentCount":"0","dateItem":"3个月内","squareRate":"0%","rentIncomeRate":"0%","rentIncome":"0","square":"0"},{"rentIncomeAvg":"","rentCountRate":"0%","rentCount":"0","dateItem":"6个月内","squareRate":"0%","rentIncomeRate":"0%","rentIncome":"0","square":"0"},{"rentIncomeAvg":"360","rentCountRate":"0.88%","rentCount":"2","dateItem":"12个月内","squareRate":"0.06%","rentIncomeRate":"0.25%","rentIncome":"195789","square":"47"}];

    $scope.investmentList = [{itemLabel:"当月签约面积",budget:"23412",real:"19894",finishRate:"85%"},{itemLabel:"年度累计",budget:"75149",real:"67840",finishRate:"90%"},{itemLabel:"蓄水",budget:"6312",real:"4721",finishRate:"75%"},{itemLabel:"商务",budget:"7023",real:"5292",finishRate:"75%"},{itemLabel:"合同",budget:"6891",real:"5233",finishRate:"76%"}];

    $scope.collapseTable=[{hasCollapseBtn:true,dataGroup:1,"rentSquare":"3305.53","rentCount":"1","rentPriceAvg":"0","rentRate":"50%","totalRentSquare":"6611.06","projectName":"主力店"},{hide:true,dataGroup:1,"rentSquare":"3305.53","rentCount":"1","rentPriceAvg":"0","rentRate":"50%","totalRentSquare":"6611.06","projectName":"影院"},{hasCollapseBtn:true,dataGroup:2,"rentSquare":"55330.380000000005","rentCount":"242","rentPriceAvg":"179.88","rentRate":"79%","totalRentSquare":"70046.69","projectName":"非主力店"},{hide:true,dataGroup:2,"rentSquare":"25382.43","rentCount":"134","rentPriceAvg":"207.86","rentRate":"73%","totalRentSquare":"34812.339999999997","projectName":"餐饮"},{hide:true,dataGroup:2,"rentSquare":"7771","rentCount":"18","rentPriceAvg":"169.51","rentRate":"93%","totalRentSquare":"8328.35","projectName":"儿童"},{hide:true,dataGroup:2,"rentSquare":"11154.95","rentCount":"20","rentPriceAvg":"132.21","rentRate":"80%","totalRentSquare":"13906","projectName":"服装"},{hide:true,dataGroup:2,"rentSquare":"11022","rentCount":"70","rentPriceAvg":"209.94","rentRate":"85%","totalRentSquare":"13000","projectName":"配套"},{dataGroup:3,"rentSquare":"58636","rentCount":"242","rentPriceAvg":"180","rentRate":"76%","totalRentSquare":"76658","projectName":"合计"}];

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#rent-main");

        if(isPC()){
            pin = $(container).find(".dept-table-head").pin({
                containerSelector: $(container).find(".rent-main-pin-wrapper"),
                padding: {top: 44, bottom: 50}
            });
        }


        createSalePercentPie();
        createMerchantPercentPie();
        createLeaseExpiredBarChart();

        createInvestmentLineChart();


    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click", ".collapse-btn", function (e) {
            e.stopPropagation();
            e.preventDefault();

            var group = $(this).attr("data-group");
            $(container).find("tr[data-group=" + group + "]:not(.parent-record)").toggleClass("amp-display-hide");
            $(this).toggleClass("collapsed");
        });

        container.on("click",".assets-table.amp-table-2 tr:not(.parent-record) td:first-child",function(e){
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
            local_storage.setItem("select_commercial_type",type);
            window.location="#/business_merchant_list";
        });

    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    /* ======================================== common methods ======================================== */
    var pieColorArr = ["#0389db","#00b1f0","#2bdadb","#f3f3f3","#a6ed66","#dcf8a1","#47e6a7","#3d4d5f"];
    function createSalePercentPie() {
        var chartContainer = $(container).find(".rent-income-percent-pie-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);
        var option = {
            color:pieColorArr,
            tooltip:{show:true,formatter:"{b} : {d}%"},
            series: [
                {
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data: $scope.saleRatePie,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        chartContainer.append("<div class='pie-text'>收入占比<br/>(租金收入)</div>");
    }

    function createMerchantPercentPie() {
        var chartContainer = $(container).find(".square-percent-pie-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);
        var option = {
            color:pieColorArr,
            tooltip:{show:true,formatter:"{b} : {d}%"},
            series: [
                {
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data: $scope.squareRatePie,
                    hoverAnimation: false
                }
            ]
        };

        myChart.setOption(option);

        chartContainer.append("<div class='pie-text'>面积占比<br/>(计租面积)</div>");
    }

    function createLeaseExpiredBarChart(){
        var chartContainer = $(container).find(".lease-expired-bar-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);

        // 指定图表的配置项和数据
        var option = {
            color:["#5cd4f4","#5ab46d"],
            grid: {
                top:"40",
                left: "0",
                right: "0",
                bottom: "40",
                containLabel: false
            },
            xAxis: [
                {
                    type: "category",
                    data: ["2016","2017","2018","2019","2020","2020后"],
                    axisLine:{show:true,lineStyle:{color:"#dee6eb"}},
                    axisTick:{show:false},
                    splitLine:{show:false},
                    axisLabel:{show:true,textStyle:{color:"#8592a3"}}
                }
            ],
            yAxis: [
                {
                    type: "value",
                    axisTick:{show:false},
                    axisLine:{show:false},
                    axisLabel:{show:false},
                    splitLine:{show:false}
                }
            ],
            series: [
                {
                    label:{normal:{show:true,position:"top",textStyle:{color:"#373c42"}}},
                    name:"租金",
                    type:"bar",
                    barWidth:20,
                    data:[parseInt(1777/10000),parseInt(157771/10000),parseInt(5248804/10000),parseInt(18017489/10000),parseInt(38174069/10000),parseInt(17235143/10000)]
                },
                {
                    label:{normal:{show:true,position:"top",textStyle:{color:"#373c42"}}},
                    name:"面积",
                    type:"bar",
                    barWidth:20,
                    data:[ 2029,47,2343,9149,24203,17467 ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function createInvestmentLineChart(){
        var rentRate_opt = {
            grid: {
                top:"40",
                left: "50",
                right: "20",
                bottom: "40",
                containLabel: false
            },
            xAxis: [
                {
                    boundaryGap:false,
                    type: 'category',
                    data: [" ",'1月', '2月', '3月', '4月', '5月', '6月'],
                    axisTick: {show: false},
                    axisLine: {
                        show:false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {color: "#eaeaea"}
                    },
                    axisLabel:{textStyle:{fontSize:14}}
                }
            ],
            yAxis: [
                {
                    max:500,
                    type: 'value',
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLine: {
                        show:false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {color: "#eaeaea"}
                    },

                    axisLabel:{
                        formatter:function(value){
                            if(value==0){
                                return "";
                            }
                            return (value+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                        },
                        textStyle:{fontSize:14}
                    }
                }

            ],
            series: [
                {
                    type: 'line',
                    symbolSize:6,
                    lineStyle: {normal: {color: "#5ab46e"}},
                    itemStyle: {normal: {color: "#5ab46e",borderWidth:2}},
                    data: [,160, 250, 220,,,]
                },
                {
                    type: 'line',
                    symbolSize:6,
                    lineStyle: {normal: {color: "#5ab46e", type: "dashed"}},
                    itemStyle: {normal: {color: "#5ab46e",borderWidth:2}},
                    data: [,, ,   220, 350, 380, 360]
                },
                {
                    type: 'line',
                    silent: true,
                    tooltip: {
                        show: false
                    },
                    data: [],
                    markLine: {
                        symbol: 'circle',
                        silent: true,
                        symbolSize: 5,
                        label: {
                            normal: {
                                show: true,
                                position: 'middle',
                                formatter: '{b}'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: "#8493a3",
                                width: 1,
                                type: "solid"
                            }
                        },
                        data: [
                            [
                                {
                                    name: "1月平均线",
                                    coord: [0, 200]
                                },
                                {
                                    coord: [1, 200]
                                }
                            ],
                            [
                                {
                                    name: "2月平均线",
                                    coord: [1, 300]
                                },
                                {
                                    coord: [2, 300]
                                }
                            ],
                            [
                                {
                                    name: "3月平均线",
                                    coord: [2, 200]
                                },
                                {
                                    coord: [3, 200]
                                }
                            ],
                            [
                                {
                                    name: "4月平均线",
                                    coord: [3, 300]
                                },
                                {
                                    coord: [4, 300]
                                }
                            ],
                            [
                                {
                                    name: "5月平均线",
                                    coord: [4, 400]
                                },
                                {
                                    coord: [5, 400]
                                }
                            ],
                            [
                                {
                                    name: "6月平均线",
                                    coord: [5, 300]
                                },
                                {
                                    coord: [6, 300]
                                }
                            ]

                        ]
                    }//markline
                }
            ]
        };


        var chartContainer = $(container).find(".investment-line-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);
        myChart.setOption(rentRate_opt)
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



