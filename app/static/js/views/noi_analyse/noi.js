/**
 * Created by limeiting on 16/11/6.
 */
var noi=(function($,noi){
    var noi=noi;

    var myLineChart;

    var chart_data_init={
        lineData:{
            labels: [ "2015","2016", "2017", "2018", "2019", "2020" ],
            datasets: [
                {
                    type:"line",
                    name:"NOI实际",
                    xAxisIndex:0,
                    yAxisIndex:0,
                    symbol:'emptyCircle',
                    symbolSize:6,
                    showSymbol:true,
                    lineStyle:{
                        show:true,
                        color:"#62cc7a",
                        width:2,
                        type:"solid",
                    },
                    data:[20,12,2,2,2,2],
                },{
                type:"line",
                name:"方案1",
                xAxisIndex:0,
                yAxisIndex:0,
                symbol:'emptyCircle',
                symbolSize:6,
                showSymbol:true,
                lineStyle:{
                    show:true,
                    color:"#ffb73a",
                    width:2,
                    type:"solid",
                },
                data:[11,12,13,14,15,16],
            },{
                    type:"line",
                    name:"方案2",
                    xAxisIndex:0,
                    yAxisIndex:0,
                    symbol:'emptyCircle',
                    symbolSize:6,
                    showSymbol:true,
                    lineStyle:{
                        show:true,
                        color:"#fe7171",
                        width:2,
                        type:"solid",
                    },
                    data:[12,13,14,15,16,17],
                },{
                    type:"line",
                    name:"方案3",
                    xAxisIndex:0,
                    yAxisIndex:0,
                    symbol:'emptyCircle',
                    symbolSize:6,
                    showSymbol:true,
                    lineStyle:{
                        show:true,
                        color:"#5fbaf4",
                        width:2,
                        type:"solid",
                    },
                    data:[18,19,20,12,13,13],
                },
                ]
        },//linedata

    };
    var chart_opt={
        lineOpt:{
            title:{
                show:false,
            },
            legend:{
                show:false,
            },
            toolbox:{
                show:false,
            },
            grid:{
                top:30,
                left:50,
                right:30,
                bottom:50
            },
            xAxis:{
                position:"bottom",
                type:"category",
               /* name:"年",
                nameLocation:"middle",
                nameTextStyle:{
                    color:"#acadb0",
                    fontStyle:"normal",
                    fontSize:14
                },
                nameGap:25,*/
                boundaryGap:true,
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#ececec",
                        width:1,
                        type:"solid"
                    }
                },
                axisTick:{
                    show:false,
                    inside:true,
                    length:3,
                    lineStyle:{
                        color:"#535861",
                        width:1,
                        type:"solid"
                    }
                },
                axisLabel:{
                    show:true,
                   //formatter:null,
                    formatter:'{value}年',
                    margin:12,
                    textStyle:{
                        color:"#666",
                        fontStyle:"normal",
                        fontSize:12
                    }
                },
                splitLine:{
                    show:false,
                    lineStyle:{
                        color:"#ececec",
                        width:1,
                        type:"solid"
                    }
                },
                data:["2015","2016", "2017", "2018", "2019", "2020"],
            },
            yAxis:{
                /*name:"万元",
                 nameLocation:"end",
                 nameGap:15,
                 nameTextStyle:{
                 color:"#acadb0",
                 fontStyle:"normal",
                 fontSize:14
                 },*/
                min:0,
                max:"auto",
                //splitNumber:7,
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:"#535861",
                        width:1,
                        type:"solid"
                    }
                },
                axisTick:{
                    show:false,
                    inside:false,
                    length:6,
                    linStyle:{
                        color:"#535861",
                        width:1,
                        type:"solid"
                    }
                },
                axisLabel:{
                    show:true,
                    formatter:'{value}',
                    margin:15,
                    textStyle:{
                        color:"#666",
                        fontStyle:"normal",
                        fontSize:12
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:"#ececec",
                        width:1,
                        type:"solid"
                    }
                },

            },
            color:['#61cd78','#60bbf4', '#fc7270', '#feb739', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            backgroundColor:"transparent",
            tooltip:{
                show:true,
                showContent:true,
                formatter:"{a}:<br/>{b}年-{c}万",
                textStyle:{
                    fontSize:12,
                    color:"#fff"
                }
            },
            series:[
                {
                    type:"line",
                    name:"NOI实际",
                    xAxisIndex:0,
                    yAxisIndex:0,
                    symbol:'emptyCircle',
                    symbolSize:6,
                    showSymbol:true,
                    lineStyle:{
                        show:true,
                        color:"#62cc7a",
                        width:2,
                        type:"solid",
                    },
                    data:[20,12,2,2,2,2],
                }

            ]
        }
    };

    function chartRender(id,data,label,chartType){
        if(id=="noi-chart"){
            //lineChart
         /*   chart_data_init[chartType+"Data"].datasets[0].data=data[0];
            chart_data_init[chartType+"Data"].datasets[1].data=data[1];
            chart_data_init[chartType+"Data"].labels=label;
            console.log(typeof label);*/
            chart_opt[chartType+"Opt"].xAxis.data=label;
            chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
        }

        var option=chart_opt[chartType+"Opt"];

        var myChart = echarts.init(document.getElementById(id));

        myChart.setOption(option);
        return myChart;
    }

    noi.chart_init=function(){
        var lineData=[];
        //ajax lineData- lineLabel- NOI实际 方案1 方案2 方案3

       // myLineChart = chartRender("noi-chart",lineData,lineLabel,"line");
        var lineData=chart_data_init.lineData.datasets;
        var lineLabel=chart_data_init.lineData.labels;

        myLineChart = chartRender("noi-chart",lineData,lineLabel,"line");
    };

    noi.updateChart=function(data,chartType,label){
        if(chartType=="line"){
            var myChart=myLineChart;
            chart_data_init[chartType+"Data"].datasets[0].data=data[0];//NOI实际数据
            chart_data_init[chartType+"Data"].labels=label;
            chart_opt[chartType+"Opt"].xAxis.data=label;
            chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
            myChart.setOption(chart_opt[chartType+"Opt"]);
        }
    };

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName).addClass("done");
            });
        }
    });

    $.fn.extend({
        animateRemove: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                //$(this).removeClass('animated ' + animationName);
                $(this).remove();
            });
        }
    });

    noi.dataUpdate=function(dataObj){
        var dataObj=dataObj;
        dataObj={
            chart_update:{ //NOI实际数据
                chartLabel:["2015","2016", "2017", "2018", "2019", "2020"],
                chartData:[
                    [15,16,17,null,null,null],//NOI实际数据
                ]
            },

        }//end data

        $.each(dataObj,function(k,v){
            switch(k){
                case "chart_update":
                    var key=k;
                    var label=v['chartLabel'];
                    var data=v["chartData"];
                    if(typeof data!=="undefined" && data.length!==0){
                        if(!label){
                            noi.updateChart(data,"line");
                        }else{
                            noi.updateChart(data,"line",label);
                        }
                    }
                    break;

                default:
                    return;
            }
        })
    };
    noi.init=function(){
        noi.chart_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
        });
        setInterval(function(){
            noi.dataUpdate();
        },2000)
    };

    return noi;
})(jQuery,noi||{});

$(document).ready(function(){
   noi.init();
});























