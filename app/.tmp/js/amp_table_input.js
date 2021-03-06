/**
 * Created by user on 2016/10/19.
 */
var table_input=(function($,ti){
    var table_input=ti;

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

    table_input.numberFormat=function(num){
        return parseFloat(num).formatMoney(2, '.', ',');
    };

    table_input.td_edit_init=function(){
        $(".table").on("click","td",function(){
            $(".table td").removeClass("active");
            $(this).addClass("active");
        });

        $(".table").on("change","input",function(e){
            var val=($(this).val());
            var oldVal=$(this).next("span").text();
            //如果当前值有变化，在当前td加修改标记
            if(checkNum(val)){
                if(table_input.numberFormat(val)!=oldVal){
                    $(this).closest("td").removeClass("error").addClass("change");
                    $(this).next("span").text(table_input.numberFormat(val))
                }
            }else{
                $(this).closest("td").addClass("error");
                $(this).next("span").text(val);
            }
        })
    };

    table_input.submit_item=function($elm){
        console.log($elm);
        if($elm.find(".error").length==0){
            var id=$elm.data("id");
            var datas={};
            if($elm.find(".change").length==0){
                alert("没有做任何修改！");
                return;
            }else{
              //  table_input.show_loading();
                $elm.find(".change input").each(function(i,e){
                    if($(this).val()!==""){
                        datas[$(this).data("date")]=parseFloat($(this).val()).toFixed(2);
                    }
                });
                var json_data={
                    "id":id,
                    "darray":datas
                };
                //ajax here;
                console.log(json_data);
                //callback
                //合计 和营业额合计 是取历史总数据，需要后台计算后回传，也写在回调里
                //var sum=1234567890 以下方法写在ajax回掉里
           /*     var sum=1234567890;
                $elm.find("td").removeClass("change");
                $elm.find(".turnover-item-sum i").text(table_input.numberFormat(sum));
                $elm.closest(".panel").find("li.turnover-all").text(table_input.numberFormat(sum));*/
            //    table_input.hide_loading();

            }
        }else{
            alert("请修正页面错误数据!")
        }
    };
    table_input.init=function(){
        table_input.td_edit_init();
       /* var $elm=$("#amp_input_sales");
        setTimeout(function(){
            table_input.submit_item($elm);
        },3000)*/
    }
    return table_input;
})(jQuery,table_input||{});