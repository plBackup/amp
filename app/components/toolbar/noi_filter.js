/**
 * Created by limeiting on 16/11/4.
 */
var filters=(function($,fl){
    var filters=fl;

    function gd(year, month, day) {
        return new Date(year, month, day).getTime();
    }

    function DateAdd(interval,number,dateStr){

        // DateAdd(interval,number,date)
        var date = new Date(dateStr);
        var d="";
        switch(interval)
        {
            case   "y"   :   {
                date.setFullYear(date.getFullYear()+number);
                break;
            }
            case   "q"   :   {
                date.setMonth(date.getMonth()+number*3);
                break;
            }
            case   "m"   :   {
                date.setMonth(date.getMonth()+number);
                d=  date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1));
                break;
            }
            case   "w"   :   {
                date.setDate(date.getDate()+number*7);
                d =date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<9?("0"+date.getDate()):date.getDate());
                break;
            }
            case   "d"   :   {
                date.setDate(date.getDate()+number);
                break;
            }
            case   "h"   :   {
                date.setHours(date.getHours()+number);
                break;

            }
            case   "mi"   :   {
                date.setMinutes(date.getMinutes()+number);
                break;
            }
            case   "s"   :   {
                date.setSeconds(date.getSeconds()+number);
                break;
            }
            default   :   {
                date.setDate(date.getDate()+number);
                break;
            }

        }//end switch
        if(d!=""){
            return d;
        }else{
            return date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<9?("0"+date.getDate()):date.getDate());
        }
    };

    //month Selector
    filters.monthSelector=function(){
        var curDate=new Date();
        var start_date=curDate.getFullYear()+"-"+(curDate.getMonth()+1);

        var mpicker=$("#monthpicker input").datetimepicker({
            format:"yyyy-mm",
            todayBtn:"linked",
            startView:3,
            minView:3,
            autoclose: true,
            language:"zh-CN"
        }).on('changeDate', function(e){
            console.log(e);

        });

        //这里把日期实例加入全局的垃圾回收站
        ampApp.collector.add_datepicker(mpicker);
        var counter=0;
        $("#monthpicker button").on("click",function(e){
            alert("click");
            counter+=1;
            console.log(counter);
            var curButton=$(this).attr("id");
            var plus=1;
            if(curButton=="ys-date-pre"){
                plus=-1;
            }
            e.preventDefault();
            var dateStr=$("#monthpicker input").val();
            if(dateStr==""){
                var today=new Date();
                var newDate=DateAdd("m",plus,today);
                $("#monthpicker input").val(newDate);

            }else{
                var curDateStr= dateStr.split("-");
                console.log(curDateStr);
                var curDate=gd(parseInt(curDateStr[0]),parseInt(curDateStr[1])-1,15);
                console.log(curDate);
                var newDate=DateAdd("m",plus,curDate);
                $("#monthpicker input").val(newDate);
            }
        });

        $("#monthpicker input").val(start_date);
    };

    filters.init=function(){
        $("input").on("focus",function(){
            $(this).closest(".input-group").addClass("out-ring");
        });
        $("input").on("blur",function(){
            $(this).closest(".input-group").removeClass("out-ring");
        });
        amp_main.leftPanel_update();
    };

    return filters;
})(jQuery,filters||{});

$(document).ready(function(){
    //这里有公共方法，确定业务后 单独放到一个文件
    filters.monthSelector();
    filters.dateSelector();
    filters.daterangeSelector();
    filters.dropdownSelector();
    filters.init();
});
