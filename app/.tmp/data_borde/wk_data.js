/**
 * Created by user on 2016/8/5.
 */
var wk_data=(function($,wk){
    var wk_data=wk;
    var myLineChart,myPieChart;

    var chart_data_init={
        lineData:{
            labels: [ "10","11", "12", "13", "14", "15","16","17", "18", "19", "20", "21","22","23","24" ],
            datasets: [ {
                type:"line",
                name:"今日销售额",
                xAxisIndex:0,
                yAxisIndex:0,
                symbol:'emptyCircle',
                symbolSize:6,
                showSymbol:true,
                lineStyle:{
                    show:true,
                    color:"#18b0e2",
                    width:2,
                    type:"solid",
                },
                data:[11,12,13,14,15,16,17,18,19,20,12,13,13,15,22],
            },
                {
                    type:"line",
                    name:"昨日销售额",
                    xAxisIndex:0,
                    yAxisIndex:0,
                    symbol:'emptyCircle',
                    symbolSize:6,
                    showSymbol:true,
                    lineStyle:{
                        show:true,
                        color:"#e47244",
                        width:2,
                        type:"solid",
                    },
                    data:[12,13,14,15,16,17,18,19,20,12,13,13,15,22,12],
                }]
        },
        pieData:{

            datasets: [
               /* { name:"餐饮",value:24584.30},
                { name:"服装",value:22991.55},
                {name:"鞋/包",value:1669.82},
                {name:"珠宝/眼镜/钟表",value:1284.19},
                {name:"数码",value:1820.39},
                {name:"时尚生活",value:4458.79},
                {name:"亲子",value:5355.03},
                {name:"美容美体",value:2603.48},
                {name:"教育培训",value:4258.56},
                {name:"娱乐",value:9261.24},
                {name:"其他",value:2061.24}*/
            ]
        }
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
                name:"小时",
                nameLocation:"middle",
                nameTextStyle:{
                    color:"#acadb0",
                    fontStyle:"normal",
                    fontSize:14
                },
                nameGap:25,
                boundaryGap:false,
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#535861",
                        width:1,
                        type:"solid"
                    }
                },
                axisTick:{
                    show:true,
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
                    formatter:null,
                    textStyle:{
                        color:"#acadb0",
                        fontStyle:"normal",
                        fontSize:12
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:"#535861",
                        width:1,
                        type:"solid"
                    }
                },
                data:["10","11", "12", "13", "14", "15","16","17", "18", "19", "20", "21","22","23","29"],
            },
            yAxis:{
               /*name:"销售额(万元)",
                nameLocation:"end",
                nameGap:15,
                nameTextStyle:{
                    color:"#acadb0",
                    fontStyle:"normal",
                    fontSize:14
                },*/
                min:0,
                max:"auto",
                splitNumber:7,
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#535861",
                        width:1,
                        type:"solid"
                    }
                },
                axisTick:{
                    show:true,
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
                    formatter:'{value}万',
                    textStyle:{
                        color:"#acadb0",
                        fontStyle:"normal",
                        fontSize:12
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:"#535861",
                        width:1,
                        type:"solid"
                    }
                },

            },
            color:['#18b0e2','#ea7444', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            backgroundColor:"transparent",
            tooltip:{
              show:true,
                showContent:true,
                formatter:"{a}:<br/>{b}时-{c}万",
                textStyle:{
                    fontSize:12,
                    color:"#fff"
                }
            },
            series:[
                {
                    type:"line",
                    name:"今日销售额",
                    xAxisIndex:0,
                    yAxisIndex:0,
                    symbol:'emptyCircle',
                    symbolSize:6,
                    showSymbol:true,
                    lineStyle:{
                        show:true,
                        color:"#18b0e2",
                        width:2,
                        type:"solid",
                    },
                   data:[11,12,13,14,15,16,17,18,19,20,12,13,13,15,22],
                },
                {
                    type:"line",
                    name:"昨日销售额",
                    xAxisIndex:0,
                    yAxisIndex:0,
                    symbol:'emptyCircle',
                    symbolSize:6,
                    showSymbol:true,
                    lineStyle:{
                        show:true,
                        color:"#e47244",
                        width:2,
                        type:"solid",
                    },
                    data:[12,13,14,15,16,17,18,19,20,12,13,13,15,22,12],
                }
            ]
        },
        pieOpt:{

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
            color:['#18b0e2','#18d1e2', '#f6d36b', '#ffa45b', '#e49d41','#e85546',  '#ea7444', '#a65c3e','#1bbc9c', '#478856', '#61cb7a'],
            backgroundColor:"transparent",
            tooltip:{
                show:true,
                showContent:true,
                formatter:null,
                /* textStyle:{
                 fontSize:12,
                 color:"#fff"
                 }*/
            },
            textStyle:{
              color:"#fff",
                fontStyle:"normal",
                fontWeight:"normal",
                fontSize:12,
            },
            series:[
                {
                    type:"pie",
                    name:"业态营业额",
                    clockWise:true,
                    startAngle:90,
                    minAngle:0,
                    label:{
                        normal: {
                            show:false,
                            position:'outside',
                            //formatter:"",
                            //textStyle:{}
                        },
                        emphasis:{
                            show:false,
                            //formatter:""
                            //textStyle:{
                        }
                    },
                    labelLine:{
                        normal:{
                            show:false,
                        },
                        emphasis:{
                            show:false,
                        }
                    },
                    itemStyle:{
                        normal:{
                            //color:"",
                            borderColor:"#fff",
                            borderWidth:0,
                            borderType:"solid",
                            opacity:1,
                        },
                        emphasis:{

                        }

                    },
                    data:[
                        { name:"餐饮",value:24584.30},
                        { name:"服装",value:22991.55},
                        {name:"鞋/包",value:1669.82},
                        {name:"珠宝/眼镜/钟表",value:1284.19},
                        {name:"数码",value:1820.39},
                        {name:"时尚生活",value:4458.79},
                        {name:"亲子",value:5355.03},
                        {name:"美容美体",value:2603.48},
                        {name:"教育培训",value:4258.56},
                        {name:"娱乐",value:9261.24},
                        {name:"其他",value:2061.24}
                    ],
                    center:['50%','50%'],
                    radius:[0,'75%'],


                }
            ]
        },

    };

    function chartRender(id,data,label,chartType){
        if(id=="wk-sales-count"){
            //lineChart
            chart_data_init[chartType+"Data"].datasets[0].data=data[0];
            chart_data_init[chartType+"Data"].datasets[1].data=data[1];
            chart_data_init[chartType+"Data"].labels=label;
            console.log(typeof label);
            chart_opt[chartType+"Opt"].xAxis.data=label;
            chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
        }else if(id=="wk-sales-retailing-form"){
            //pieChart
            if(typeof label!=="undefined" && label!==""){
                var datasets=[];
                $.each(label,function(i,e){
                   datasets.push({
                       name:label[i],
                       value:data[i]
                   })
                });
                console.log(datasets);
                chart_data_init[chartType+"Data"].datasets=datasets;
            }else{
                $.each(chart_data_init[chartType+"Data"].datasets,function(i,e){
                    chart_data_init[chartType+"Data"].datasets[i].value=data[i];
                });
            }

            chart_opt[chartType+"Opt"].series[0].data=chart_data_init[chartType+"Data"].datasets;
        }

        var option=chart_opt[chartType+"Opt"];
        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption(option);

        return myChart;
    }
    wk_data.chart_init=function(){
        var lineData=[];
        var lineDataToday=eval($("#wk-sales-count").data("chart-today"));
        var lineDataYes=eval($("#wk-sales-count").data("chart-yestoday"));
        lineData[0]=lineDataToday;
        lineData[1]=lineDataYes;
        var lineLabel=eval($("#wk-sales-count").data("label"));

        var pieData=eval($("#wk-sales-retailing-form").data("chart"));
        var pieLabel=eval($("#wk-sales-retailing-form").data("label"));

        myLineChart = chartRender("wk-sales-count",lineData,lineLabel,"line");

        myPieChart=chartRender("wk-sales-retailing-form",pieData,pieLabel,'pie');

    };

    wk_data.updateChart=function(data,chartType,label){
       if(chartType=="pie"){
           var myChart=myPieChart;
           if(typeof label!=="undefined" && label!==""){
               var datasets=[];
               $.each(label,function(i,e){
                   datasets.push({
                       name:label[i],
                       value:data[i]
                   })
               });
               console.log(datasets);
               chart_data_init[chartType+"Data"].datasets=datasets;
           }else{
               //不传入label值，只更新数据
               $.each(chart_data_init[chartType+"Data"].datasets,function(i,e){
                   chart_data_init[chartType+"Data"].datasets[i].value=data[i];
               });
           }
           chart_opt[chartType+"Opt"].series[0].data=chart_data_init[chartType+"Data"].datasets;
           myChart.setOption(chart_opt[chartType+"Opt"]);
       }else if(chartType=="line"){
           var myChart=myLineChart;
           chart_data_init[chartType+"Data"].datasets[0].data=data[0];
           chart_data_init[chartType+"Data"].datasets[1].data=data[1];// 昨日数据按时间更新推送
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

    /*
     $('#yourElement').animateCss('bounce');
     #yourElement {
     -vendor-animation-duration: 3s;
     -vendor-animation-delay: 2s;
     -vendor-animation-iteration-count: infinite;
     }*/

    Number.prototype.formatMoney = function(c, d, t){
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

//检查非负浮点数
    function checkNum(num){
        var patt=/^\d+(\.\d+)?$/g;
        return patt.test(num);
    }

    wk_data.dataUpdate=function(dataObj){
      var dataObj=dataObj;
        dataObj={
            wk_sales:{ //当日营业额
                count:31135.03,
                yoy_percent:"+3.15%",
                yoy_icon:"down",
                chartLabel:["10","11", "12", "13", "14", "15","16","17", "18", "19", "20", "21","22","23","24","25"],
                chartData:[
                    [11,12,13,14,15,16,17,18,19,20,12,13,13,15,22,28],//yesterday
                    [12,13,14,15,16,17,18,19,20,12,13,13,15,22,12,22]//today
                ]
            },
            wk_sum:{//营业额统计
                yesterday:{
                    count:65866.77,
                    yoy_percent:"-5.13%",
                    yoy_icon:"down"
                },
                week:{
                    count:1007999.54,
                    yoy_percent:"+6.04%",
                    yoy_icon:"up"
                },
                month:{
                    count:16927999.54,
                    yoy_percent:"+12.92%",
                    yoy_icon:"up"
                },
                infos:{
                    num:556,
                    yoy_percent:"-8.15%",
                    yoy_icon:"down",
                    increasing:97856.24
                }
            },
            wk_form:{
                sales:[
                    {name:"餐饮",count:124584.30,yoy_percent:"+2.13%",yoy_icon:"up"},
                    {name:"服装",count:22991.55,yoy_percent:"-4.04%",yoy_icon:"down"},
                    {name:"鞋/包",count:1669.82,yoy_percent:"+10.92%",yoy_icon:"up"},
                    {name:"珠宝/眼镜/钟表",count:1284.19,yoy_percent:"+11.41%",yoy_icon:"up"},
                    {name:"数码",count:1820.39,yoy_percent:"+22.13%",yoy_icon:"up"},
                    {name:"时尚生活",count:4458.79,yoy_percent:"+2.13%",yoy_icon:"up"},
                    {name:"亲子",count:5355.03,yoy_percent:"-4.04%",yoy_icon:"down"},
                    {name:"美容美体",count:2603.48,yoy_percent:"+10.92%",yoy_icon:"up"},
                    {name:"教育培训",count:4258.56,yoy_percent:"+11.41%",yoy_icon:"up"},
                    {name:"娱乐",count:9261.24,yoy_percent:"+22.85%",yoy_icon:"up"},
                    {name:"其他",count:2061.24,yoy_percent:"-4.04%",yoy_icon:"down"},
                ],
                chartLabel:["餐饮1","服装", "鞋/包", "珠宝/眼镜/钟表", "数码", "时尚生活","亲子","美容美体", "教育培训", "娱乐", "其他",],
                chartData:[124584.30,22991.55,1669.82,1284.19,1820.39,4458.79,5355.03,2603.48,4258.56,9261.24,2061.24,]
            },
            wk_recode:[
           /*     {name:"美味火锅",datetime:"10-19 10:25:33",price:"345.01"},*/
                {name:"开心丽果",datetime:"10-19 10:32:32",price:"321.00"},
            ]
        }//end data

        $.each(dataObj,function(k,v){
            switch(k){
                case "wk_sales":
                    var key=k;
                    $("#"+key+"_count").text(v['count'].formatMoney());
                    $("#"+key+"_yoy_percent").text(v["yoy_percent"]);
                    $("#"+key+"_yoy_icon").removeClass("glyphicon-arrow-up glyphicon-arrow-down").addClass("glyphicon-arrow-"+v["yoy_icon"]);
                    var label=v['chartLabel'];
                    var data=v["chartData"];
                    if(typeof data!=="undefined" && data.length!==0){
                        if(!label){
                            wk_data.updateChart(data,"line");
                        }else{
                            wk_data.updateChart(data,"line",label);
                        }
                    }
                    break;
                case "wk_sum":
                    var key=k;
                    $.each(dataObj[key],function(k,v){
                        var $selector=$("#"+key+"_"+k);
                        $.each(v,function(k,v){
                            if(k==="count"||k==="increasing"){
                                v= v.formatMoney();
                                $selector.find("."+k).text(v);
                            }else if(k==="yoy_icon"){
                                $selector.find("."+k).removeClass("glyphicon-arrow-up glyphicon-arrow-down").addClass("glyphicon-arrow-"+v);
                            }else{
                                $selector.find("."+k).text(v);
                            }
                        });
                    });
                    break;
                case "wk_form":
                    var key=k;
                    var $selector=$("#wk_form_sales");
                    $.each(dataObj[key]["sales"],function(i,e){
                        console.log(i+"-------------------------")
                        console.log(e);

                        var $tr=$selector.find("tr").eq(i);
                        $.each(e,function(k,v){
                            console.log($tr);
                            if(k==="count"){
                                v= v.formatMoney();
                                $tr.find("."+k).text(v);
                            }else if(k==="yoy_icon"){
                                console.log("***---------------***");
                                console.log($tr.find("."+k));
                                $tr.find("."+k).removeClass("glyphicon-arrow-up glyphicon-arrow-down").addClass("glyphicon-arrow-"+v);
                            }else{
                                $tr.find("."+k).text(v);
                            }
                        })
                    });//end each sales
                    var label=dataObj[key]["chartLabel"];
                    var data=dataObj[key]["chartData"];
                    if(typeof data!=="undefined" && data.length!==0){
                        if(!label){
                            wk_data.updateChart(data,"pie");
                        }else{
                            wk_data.updateChart(data,"pie",label);
                        }
                    }
                    break;
                case "wk_recode":
                    var key=k;
                    var recodes=dataObj[k];
                    var $selector=$("#wk-sales-recode");
                    if(recodes.length>0){
                        for(var i=0;i<recodes.length;i++){
                          //  $selector.find("li").eq(i).animateRemove("fadeOutUp");
                            $selector.find("li").eq(i).slideUp(function(){
                                $(this).remove();
                            });
                        }
                        $.each(recodes,function(i,e){
                            var elm=[
                                    '<li><dl>',
                                    '<dt><i class="name">'+ e.name+'</i></dt>',
                                    '<dd><span>于<em class="datetime">'+ e.datetime+'</em>销售一笔金额为<i class="price">'+ e.price+'</i>的订单</span></dd>',
                                    '</li></dl>'
                            ].join("");
                            $selector.append(elm);
                            $selector.find("li").last().animateCss("fadeInUp");
                        });
                    }
                    break;
                default:
                    return;
            }
        })
    };
    wk_data.init= function(){
        wk_data.chart_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
        });
        setInterval(function(){
            wk_data.dataUpdate();
        },2000)
    };
    return wk_data;
})(jQuery,wk_data||{});

$(document).ready(function(){
    wk_data.init();
});
