ampApp.controller("cost-main-controller",["$scope","$ampDocumentReady",function($scope,$ampDocumentReady){
    $scope.records = [{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"-","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"0.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"1","businessBudget":"0.0","businessPercent":"-"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"-","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"0.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"2","businessBudget":"0.0","businessPercent":"-"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"168.82","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"3","businessBudget":"168.82","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"122.96","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"4","businessBudget":"122.96","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"58.49","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"5","businessBudget":"58.49","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"8.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"6","businessBudget":"8.0","businessPercent":"0%"},{"totalReal":"0.0","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"0.0","totalPercent":"-","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"0.0","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"7","businessBudget":"0.0","businessPercent":"-"},{"totalReal":"44.18","manualWorkBudget":"0.0","projectReal":"0.0","businessReal":"44.18","totalPercent":"230%","projectPercent":"-","manualWorkPercent":"-","mgtFeeBudget":"0.0","totalBudget":"19.2","manualWorkReal":"0.0","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"8","businessBudget":"19.2","businessPercent":"230%"},{"totalReal":"194.27","manualWorkBudget":"0.27","projectReal":"0.87","businessReal":"116.98","totalPercent":"61%","projectPercent":"100%","manualWorkPercent":"100%","mgtFeeBudget":"76.15","totalBudget":"317.13","manualWorkReal":"0.27","projectBudget":"0.87","mgtFeeReal":"76.15","mgtFeePercent":"100%","month":"9","businessBudget":"239.84","businessPercent":"49%"},{"totalReal":"86.39","manualWorkBudget":"12.63","projectReal":"0.0","businessReal":"71.94","totalPercent":"47%","projectPercent":"-","manualWorkPercent":"100%","mgtFeeBudget":"1.82","totalBudget":"183.01","manualWorkReal":"12.63","projectBudget":"0.0","mgtFeeReal":"1.82","mgtFeePercent":"100%","month":"10","businessBudget":"168.56","businessPercent":"43%"},{"totalReal":"22.32","manualWorkBudget":"7.68","projectReal":"0.0","businessReal":"14.64","totalPercent":"25%","projectPercent":"-","manualWorkPercent":"100%","mgtFeeBudget":"0.0","totalBudget":"90.68","manualWorkReal":"7.68","projectBudget":"0.0","mgtFeeReal":"0.0","mgtFeePercent":"-","month":"11","businessBudget":"83.0","businessPercent":"18%"},{"totalReal":"0.0","manualWorkBudget":"20.5","projectReal":"0.0","businessReal":"0.0","totalPercent":"0%","projectPercent":"0%","manualWorkPercent":"0%","mgtFeeBudget":"418.66","totalBudget":"591.3","manualWorkReal":"0.0","projectBudget":"47.2","mgtFeeReal":"0.0","mgtFeePercent":"0%","month":"12","businessBudget":"104.94","businessPercent":"0%"}];

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#cost-main");

        if(isPC()){
            pin = $(container).find(".amp-thead").pin({
                containerSelector: $(container).find(".amp-collapse-table"),
                padding: {top: 44, bottom: 50}
            });
        }


        createCostStackBarChart();

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.on("click",".amp-table-row-content",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location="#/cost_manual_work";
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    function getMonths(){
        //var months = [];
        //var date = new Date();
        //var month = date.getMonth()+1;
        //for(var i = month-6;i<month;i++){
        //    months.push(i);
        //}
        //return months;
        return [8,9,10];
    }

    function getLabels(){
        var labels = [];
        getMonths().forEach(function(item){
            labels.push(item+"月");
        });
        return labels
    }

    function getData(key){
        var months = getMonths();
        var minMonth = months.shift();
        var maxMonth = months.pop();

        var result = [];
        $scope.records.forEach(function(item){
            var month = parseInt(item.month);
            if(month<minMonth||month>maxMonth){
                return;
            }
            var value = parseFloat(item[key]);
            result.push(value);
        });
        return result;
    }


    function createCostStackBarChart(){
        // 基于准备好的dom，初始化echarts实例
        var id = "cost-stack-bar-chart";
        var myChart = echarts.init(document.getElementById(id));

        var data1=getData("businessReal");
        console.log(data1);
        var data2=getData("manualWorkReal");
        var data3=getData("mgtFeeReal");
        var data4=getData("projecteal");
        var labels = getLabels();
        console.log(labels);

        // 指定图表的配置项和数据
        var option = {
            color:["#2bd9dd","#038bd8","#a5ee67","#00b2ef"],
            grid: {
                top:"20",
                left: "0",
                right: "0",
                bottom: "0",
                containLabel: true
            },
            tooltip : {
                padding:[5,12],
                position: 'top',
                formatter:function(params){
                    var value = params.value;
                    var seriesName = params.seriesName;
                    var dataIndex = params.dataIndex;
                    var totalValue = data1[dataIndex]+data2[dataIndex]+data3[dataIndex]+data4[dataIndex];
                    var percent = parseInt(value/totalValue*100);
                    if(isNaN(percent)){
                        percent="-";
                    }else{
                        percent+="%";
                    }
                    var result = seriesName+"<br/>金额 : "+value+"<br/>"+"占比 : "+percent;
                    return result;
                }
            },
            xAxis: [
                {
                    type: "category",
                    data: labels,
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
                    minInterval:30,
                    splitLine:{show:true,lineStyle:{color:["#f2f5f7"]}}
                }
            ],
            series: [
                {
                    stack:"总量",
                    name:"营销",
                    type:"bar",
                    barWidth:30,
                    data:data1
                },
                {
                    stack:"总量",
                    name:"人工",
                    type:"bar",
                    barWidth:30,
                    data:data2
                },
                {
                    stack:"总量",
                    name:"管理",
                    type:"bar",
                    barWidth:30,
                    data:data3
                },
                {
                    stack:"总量",
                    name:"工程",
                    type:"bar",
                    barWidth:30,
                    data:data4
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
    },300);
}]);



