/**
 * Created by user on 2016/8/9.
 */
var acg_project=(function($,ap){
    var acg_project=ap;
    var chart_data_init={
        doughnutData_income:{
            labels:["时装", "餐饮", "配套", "娱乐","儿童", "影院", "超市", "其他"],
            datasets: [
                {
                    label:"业态占比(租金收入)",
                    data: [0,0,0,0,0,0,0,0],
                    backgroundColor: [
                        "#0488da",
                        "#00b0f0",
                        "#2bd9dd",
                        "#a6ec66",
                        "#dcf79f",
                        "#aeb9ca",
                        "#637b9b",
                        "#45546b"
                    ],
                    hoverBackgroundColor: [
                        "#0488da",
                        "#00b0f0",
                        "#2bd9dd",
                        "#a6ec66",
                        "#dcf79f",
                        "#aeb9ca",
                        "#637b9b",
                        "#45546b"
                    ],
                    borderWidth:0
                }]
        },

        doughnutData_retail:{
            labels:["时装", "餐饮", "配套", "娱乐","儿童", "影院", "超市", "其他"],
            datasets: [
                {
                    label:"业态占比(计租面积)",
                    data: [0,0,0,0,0,0,0,0],
                    backgroundColor: [
                        "#0488da",
                        "#00b0f0",
                        "#2bd9dd",
                        "#a6ec66",
                        "#dcf79f",
                        "#aeb9ca",
                        "#637b9b",
                        "#45546b"
                    ],
                    hoverBackgroundColor: [
                        "#0488da",
                        "#00b0f0",
                        "#2bd9dd",
                        "#a6ec66",
                        "#dcf79f",
                        "#aeb9ca",
                        "#637b9b",
                        "#45546b"
                    ]
                }]
        }

    };
    var chart_opt={
        lineOpt:{
            legend:{display:false},
            responsive:false,
            fontSize:16,
            tooltips:{
                enabled:true
            },
            scales:{
                xAxes:[{
                    categoryPercentage:0.6,
                    barPercentage:0.8
                },],
                yAxes: [{
                    ticks: {
                        min:0,

                        maxTicksLimit:5
                    }
                }]
            },
            animation:{
                animateRotate:false,
                easing:"easeOutQuart",
                duration:1000,
                onComplete:function(){
                    // $(".ys-demo-result").addClass("animated flipOutX");
                }
            },
        },
        doughnutOpt:{
            responsive:false,
            hover: {
                mode: 'label'
            },
            legend:{
                display:false,
                labels: {
                    fontColor: 'rgb(34, 34, 34)'
                }
            },
            cutoutPercentage:74,
            tooltips:{
                enabled:true,
                callbacks:{
                    label:function(tm,data){
                        return data.labels[tm.index]+data.datasets[0].data[tm.index]+"%";
                    }
                }
            },
            animation:{
                animateRotate:true,
                easing:"easeOutQuart",
                duration:1000,
                onComplete:function(){
                    // $(".ys-demo-result").addClass("animated flipOutX");
                }
            },
        },
        barOpt:{
            responsive:false,
            hover: {
                mode: 'label'
            },
            legend:{
                display:false,
                labels: {
                    fontColor: 'rgb(34, 34, 34)'
                }
            },
            scales:{
                xAxes:[{
                    categoryPercentage:0.8,
                    barPercentage:0.5
                },],
                yAxes: [{
                    ticks: {
                        min:0,

                        maxTicksLimit:5
                    }
                }]
            },
            tooltips:{
                enabled:true
            },
            animation:{
                animateRotate:true,
                easing:"easeOutQuart",
                duration:1000,
                onComplete:function(){
                    // $(".ys-demo-result").addClass("animated flipOutX");
                }
            },
        }
    };
    function chartRender(id,data,label,chartType){
        var data_str;
        if(id=="retail-area"){
            data_str="Data_retail";
        }else{
            data_str="Data_income";
        }
        console.log(chartType+data_str);
        chart_data_init[chartType+data_str].datasets[0].data=data;
        chart_data_init[chartType+data_str].labels=label;


        var chart=new Chart($(id),{
            type:chartType,
            data:chart_data_init[chartType+data_str],
            options:chart_opt[chartType+"Opt"]
        });
        if(id=="#chart-income" ||id=="#retail-area"){
            $(id).css({"width": "220px","height": "220px"});
        }else{
            $(id).css({"width": "520px","height": "200px"});
        }
        //这里先写死，不做动态处理
//        if(chartType=="doughnut"){
//            var bgColor=chart_data_init[chartType+data_str].datasets[0].backgroundColor;
//            var $ul=$("#wk-retail-sales-legend");
//            $ul.empty();
//            $.each(data,function(i,e){
//                $ul.append('<li><em class="color-label" style="background-color:'+bgColor[i]+'"></em>'+label[i]+'<i>'+e+'</i></li>')
//            })
//        }
        return chart;
    }

    acg_project.chart_init=function(){

        var retailAreaData=$("#retail-area").data("chart");
        var retailAreaLabel=$("#retail-area").data("label");
        var incomeData=$("#chart-income").data("chart");
        var incomeLabel=$("#chart-income").data("label");

        var incomeChart = chartRender("#chart-income",incomeData,incomeLabel,"doughnut");
        var retailChart=chartRender("#retail-area",retailAreaData,retailAreaLabel,'doughnut');
    };

    acg_project.init=function(){
        acg_project.chart_init();
    };
    return acg_project;
})(jQuery,acg_project||{});