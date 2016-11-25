ampApp.controller("business-main-controller",["$scope","$ampDocumentReady","$filter",function($scope,$ampDocumentReady,$filter){

    var rentData = [{hasCollapseBtn:true,dataGroup:1,"calOfficialReceipts":"0","rate":"-","calReceivable":"5","curBalance":"-5","commercialType":"主力店","calBalance":"-5","curOfficialReceipts":"0","curReceivable":"5"},{hide:true,dataGroup:1,"calOfficialReceipts":"0","rate":"0%","calReceivable":"5","curBalance":"-5","commercialType":"影院","calBalance":"-5","curOfficialReceipts":"0","curReceivable":"5"},{dataGroup:2,hasCollapseBtn:true,"calOfficialReceipts":"232.53140200000001","rate":"-","calReceivable":"238.11321400000003","curBalance":"-5.1091839999999991","commercialType":"非主力店","calBalance":"-5.5818120000000135","curOfficialReceipts":"148.998694","curReceivable":"154.107878"},{hide:true,dataGroup:2,"calOfficialReceipts":"166.179202","rate":"99%","calReceivable":"167.16125700000001","curBalance":"-1.0572120000000069","commercialType":"餐饮","calBalance":"-0.98205500000000256","curOfficialReceipts":"103.294494","curReceivable":"104.35170600000001"},{hide:true,dataGroup:2,"calOfficialReceipts":"7.8607449999999996","rate":"100%","calReceivable":"7.8607449999999996","curBalance":"0","commercialType":"儿童","calBalance":"0","curOfficialReceipts":"6.8282449999999999","curReceivable":"6.8282449999999999"},{hide:true,dataGroup:2,"calOfficialReceipts":"0","rate":"0%","calReceivable":"0","curBalance":"0","commercialType":"服装","calBalance":"0","curOfficialReceipts":"0","curReceivable":"0"},{hide:true,dataGroup:2,"calOfficialReceipts":"58.491455000000002","rate":"90%","calReceivable":"63.091211999999999","curBalance":"-4.0519720000000063","commercialType":"配套","calBalance":"-4.5997569999999968","curOfficialReceipts":"38.875954999999998","curReceivable":"42.927927000000004"},{"calOfficialReceipts":"232.53140200000001","rate":"-","calReceivable":"243.113214","curBalance":"-10.109183999999999","commercialType":"合计","calBalance":"-10.581811999999985","curOfficialReceipts":"148.998694","curReceivable":"159.107878"}];

    var propertyData = [{hasCollapseBtn:true,dataGroup:1,"calOfficialReceipts":"3.900525","calReceivable":"3.900525","curBalance":"0","commercialType":"主力店","calBalance":"0","curOfficialReceipts":"1.9833180000000001","curReceivable":"1.9833180000000001"},{dataGroup:1,hide:true,"calOfficialReceipts":"3.900525","rate":"100%","calReceivable":"3.900525","curBalance":"0","commercialType":"影院","calBalance":"0","curOfficialReceipts":"1.9833180000000001","curReceivable":"1.9833180000000001"},{hasCollapseBtn:true,dataGroup:2,"calOfficialReceipts":"365.13291200000003","rate":"-","calReceivable":"409.22085899999996","curBalance":"-31.723765999999998","commercialType":"非主力店","calBalance":"-44.087946999999971","curOfficialReceipts":"179.882319","curReceivable":"211.60608500000001"},{dataGroup:2,hide:true,"calOfficialReceipts":"182.974602","rate":"90%","calReceivable":"196.509536","curBalance":"-10.873041999999993","commercialType":"餐饮","calBalance":"-13.534934000000009","curOfficialReceipts":"91.446228000000005","curReceivable":"102.31926999999999"},{dataGroup:2,hide:true,"calOfficialReceipts":"46.598822999999996","rate":"76%","calReceivable":"58.499536999999997","curBalance":"-7.5978400000000024","commercialType":"儿童","calBalance":"-11.900714000000001","curOfficialReceipts":"24.684975000000001","curReceivable":"32.282814999999999"},{dataGroup:2,hide:true,"calOfficialReceipts":"56.141279000000004","rate":"83%","calReceivable":"62.798106000000004","curBalance":"-4.8621309999999998","commercialType":"服装","calBalance":"-6.6568270000000016","curOfficialReceipts":"24.525548999999998","curReceivable":"29.38768"},{dataGroup:2,hide:true,"calOfficialReceipts":"79.418207999999993","rate":"82%","calReceivable":"91.413679999999999","curBalance":"-8.3907530000000037","commercialType":"配套","calBalance":"-11.995471999999998","curOfficialReceipts":"39.225566999999998","curReceivable":"47.616320000000002"},{"calOfficialReceipts":"369.03343699999999","rate":"-","calReceivable":"413.12138399999998","curBalance":"-31.723765999999998","commercialType":"合计","calBalance":"-44.087946999999971","curOfficialReceipts":"181.86563699999999","curReceivable":"213.58940300000003"}];

    $scope.records = rentData;

    $scope.dataType = "租金";


    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("business-main.query",function(event,params){
        if(params.businessType=="租金"){
            $scope.records = rentData;
        }else if(params.businessType=="物管费"){
            $scope.records = propertyData;
        }
        $scope.dataType = params.businessType;
        createRentIncomeBarChart();
        $scope.$apply();
    });

    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#business-main");
        createRentIncomeBarChart();
        if(isPC()){
            pin = $(container).find(".dept-table-head").pin({
                containerSelector: $(container).find(".cost-manual-work-pin-wrapper"),
                padding: {top: 44, bottom: 50}
            });
        }
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".collapse-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var group = $(this).attr("data-group");
            $(container).find("tr[data-group="+group+"]:not(.parent-record)").toggleClass("amp-display-hide");
            $(this).toggleClass("collapsed");
        });

        container.on("click",".table-block tbody tr:not(.parent-record,.empty-record) td:first-child",function(e){
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
    function destroy(){
    }

    function createRentIncomeBarChart(){
        // 基于准备好的dom，初始化echarts实例
        var id = "rent-income-bar-chart";
        var myChart = echarts.init(document.getElementById(id));

        var labels = [];
        var data = [];

        $scope.records.forEach(function(item){
            if(item.hide==true){
                labels.push(item.commercialType);
                data.push(item.curOfficialReceipts);
            }
        });

        // 指定图表的配置项和数据
        var option = {
            color:["#5ab46e"],
            grid: {
                top:"20",
                left: "0",
                right: "0",
                bottom: "0",
                containLabel: true
            },
            tooltip:{show:true,formatter:function(params){
                return params.name+" : "+$filter("numberFormatDefault")(params.value,2);
            }},
            xAxis: [
                {
                    type: "category",
                    data:labels ,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show:false
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    splitNumber:3
                }
            ],
            series: [
                {
                    name:"实际收入",
                    type:"bar",
                    barWidth:24,
                    data:data
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    setTimeout(function(){
        init();
    },300)
}]);



