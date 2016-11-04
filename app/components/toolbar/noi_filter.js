/**
 * Created by limeiting on 16/11/4.
 */
var filters=(function($,fl){
    var filters=fl;

    function gd(year, month, day) {
        return new Date(year, month, day).getTime();
    }

    function DateAdd(interval,number,dateStr)
    {

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
                console.log("m");
                d=  date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1));
                console.log(d);
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
    }

    filters.monthSelector=function(){
        var curDate=new Date();
        var start_date=curDate.getFullYear()+"-"+(curDate.getMonth()+1);

        $("#monthpicker input").datetimepicker({
            format:"yyyy-mm",
            todayBtn:"linked",
            startView:3,
            minView:3,
            autoclose: true,
            language:"zh-CN"
        });
        $("#monthpicker button").on("click",function(e){
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
                var curDate=gd(parseInt(curDateStr[0]),parseInt(curDateStr[1])-1,15);
                var newDate=DateAdd("m",plus,curDate);
                $("#monthpicker input").val(newDate);
            }
        });

        $("#monthpicker input").val(start_date);
    };


    return filters;
})(jQuery,filters||{});

$(document).ready(function(){
    //这里有公共方法，确定业务后 单独放到一个文件
    filters.monthSelector();
});