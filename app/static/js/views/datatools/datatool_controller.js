/**
 * Created by limeiting on 16/11/18.
 */

var irr_plan=(function($,irr_plan){
    var irr_plan=irr_plan;
    var pin;
    var irr_plan_head_swiper,irr_plan_main_swiper;
    irr_plan.swiper_init=function(){
        irr_plan_head_swiper = new Swiper('#irr-plan-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        irr_plan_main_swiper = new Swiper('#irr-plan-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
        irr_plan_head_swiper.params.control = irr_plan_main_swiper;
        irr_plan_main_swiper.params.control = irr_plan_head_swiper;

        //这里把swiper实例加入全局的垃圾回收站
        /*ampApp.collector.add_swiper(irr_plan_head_swiper);
        ampApp.collector.add_swiper(irr_plan_main_swiper);*/

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#irr-plan-table-wrapper",
            padding: {top: 44, bottom: 50}
        });

        var defer=null;
        function _swiperUpdate(){
            /* irr_plan_head_swiper.update();
             irr_plan_main_swiper.update();*/
            pin.refresh();
        };
        $(window).resize(function(){
            if(!defer){

                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }else{
                clearTimeout(defer);
                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }

        });
    };

    irr_plan.table_init=function(){
        $(".ys-table-main").on("mouseenter","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).addClass("hover");
            });
        });

        $(".ys-table-main").on("mouseleave","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).removeClass("hover");
            });

        });

    };

    irr_plan.destroy=function(){
        irr_plan_head_swiper.destroy(true,true);
        irr_plan_main_swiper.destroy(true,true);
    };
    irr_plan.init=function(){

        irr_plan.swiper_init();
        irr_plan.table_init();
        /*  $('#preloader').delay(350).fadeOut(function(){
         //start
         });*/
    };

    return irr_plan;
})(jQuery,irr_plan||{});
var amp_datePicker=(function($,amp_datePicker){
    var amp_datePicker=amp_datePicker;

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
    //daterange Selector
    amp_datePicker.dp_Array=[];
    amp_datePicker.daterangeSelector=function(){
        var curDate=new Date();
        var start_date=$("#daterange input#date-range-filter-start").val() || curDate.getFullYear()+"-"+(curDate.getMonth()+1)+"-"+(curDate.getDate());
        var end_date=$("#daterange input#date-range-filter-end").val()
        var startDate,endDate;
        var dateStart=$("#daterange input#date-range-filter-start").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN"
        }).on("changeDate",function(e){
            var curDateStr= DateAdd("d",0,e.date);
            startDate=e.timeStamp;
            if(endDate){
                if(startDate>endDate){
                    endDate=null;
                    $("#daterange input#date-range-filter-end").val("");
                }
            }
            $("#daterange input#date-range-filter-end").datetimepicker('setStartDate',curDateStr);
        });
        var dateEnd=$("#daterange input#date-range-filter-end").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN",
        }).on("changeDate",function(e){
            endDate=e.timeStamp;
        });

        $("#daterange input#date-range-filter-start").val(start_date);
        $("#daterange input#date-range-filter-end").val(end_date);

        //这里把日期实例加入全局的垃圾回收站
        amp_datePicker.dp_Array.push(dateStart);
        amp_datePicker.dp_Array.push(dateEnd);
    };
    amp_datePicker.dateSelector=function(){
        var curDate=new Date();
        var start_date=$("#datepicker input").val()||curDate.getFullYear()+"-"+(curDate.getMonth()+1)+"-"+(curDate.getDate());

        var dpicker=$("#datepicker input").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN"
        });

        $("#datepicker input").val(start_date);

        //这里把日期实例加入全局的垃圾回收站
        amp_datePicker.dp_Array.push(dpicker);
    };
    amp_datePicker.destroy=function(){
        $.each(amp_datePicker.dp_Array,function(i,e){
            $(e.selector).datetimepicker("remove");
        });
        amp_datePicker.dp_Array=[];
    };
    return amp_datePicker;
})(jQuery,amp_datePicker||{})
var dataTool=angular.module("dataTool",[]);
dataTool.controller("dataIndexController",['$rootScope', '$scope',"dataIndexData","paginatorService","$timeout","$location","$filter",
    function($rootScope, $scope,dataIndexData,paginatorService,$timeout,$location,$filter) {
        var self=this;
        var shopData=dataIndexData.slice(1);
        self.indexData=shopData;
        self.recordsNum=self.indexData.length;
        self.pageLimit=10;
        self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);

        self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);

        //pageTarget初始化与pageIndex一致
        //这里演示时简化逻辑，没有http取数据操作，通过一次性取数据， 通过页面过滤器进行页面展示

        self.loadPage=function(targetIndex){
            if(targetIndex>=self.pageNum){
                targetIndex=self.pageNum;
            }else if(targetIndex<=1){
                targetIndex=1;
            }
            self.paginator.setIndex(targetIndex);
        };

        self.shopEdit=function(index,shop){
            //self.indexData[index].shopIndex+="###";
            console.log("edit...");
            $rootScope.$broadcast("shopEdit",{shopData:shop,index:index})
        };

        self.shopUpdate=function(index,shop){
            shopData[index]=shop;
        };

        $scope.$on("shopUpdate",function(e,data){
            self.shopUpdate(data.index,data.shop);
        });

        self.shopAdd=function(index,shop){
            if(index=="add"){
                shopData.unshift(shop);
                self.recordsNum=self.indexData.length;
                self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
                self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
            }else if(index=="new"){
               console.log("new---------");
                //shopData[0]=shop;
            }
        };

        $scope.$on("shopAdd",function(e,data){
            self.shopAdd(data.index,data.shop);
        });

        $scope.$on("shopUpdateAdd",function(e,data){
            self.shopAdd(data.index,data.shop);

        });

        self.filters={};
        $scope.$on("datatool_filter",function(e,data){
           var curFilter={};
           $.each(data.filters,function(k,v){
               if(k!=="project" && v!=="" ){
                   curFilter[k]=v;
               }
           });

           self.indexData=$filter("filter")(shopData,curFilter);
           //self.filters=curFilter;
           self.recordsNum=self.indexData.length;
           self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
           self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
       });


    }]);

dataTool.controller("dataRightController",['$rootScope', '$scope',
    function($rootScope, $scope) {
        var self=this;

        self.form_menu={
            projects:["商业公司A","商业公司B","商业公司C","商业公司D"],
            floors:["B1","F1","F2","F3","F4","F5","F6"],
            positions:["主入口","主立面外墙","次入口","主通道","侧面面街","后街"],
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
            type:["MAll","商业街"]
        };
        self.index="add";
        self.shopInfo={};
        $scope.$on("shopEdit",function(e,data){
            console.log("shop--edit");
            amp_main.rightPanel_open();
            self.index=data.index;
            self.shopInfo=data.shopData;
        });

        self.save=function(){
            if(typeof self.shopInfo.shopIndex==="undefined" || self.shopInfo.shopIndex==""){
                return;
            }
            if(self.index=="add"){
                $rootScope.$broadcast("shopAdd",{
                    index:self.index,
                    shop:self.shopInfo
                });
                //amp_main.rightPanel_close();
                //self.shopInfo={};
                self.index="new";
            }else if(self.index=="new"){
                $rootScope.$broadcast("shopUpdateAdd",{
                    index:self.index,
                    shop:self.shopInfo
                });
                //amp_main.rightPanel_close();
                //self.shopInfo={};
                self.index="new";
            }else{
                $rootScope.$broadcast("shopUpdate",{
                    index:self.index,
                    shop:self.shopInfo
                });
                amp_main.rightPanel_close();
                self.shopInfo={};
                self.index="add";
            }

        };

        self.next=function(){
            self.index="add";
            self.shopInfo={};
        }

        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.reset=function(){

            self.index="add";
            self.shopInfo={
            };

        };

    }]);

dataTool.controller("dataSetController",['$rootScope', '$scope',"rpgSetData",
    function($rootScope, $scope,rpgSetData) {
        var self=this;
        self.setData=rpgSetData[0].values;
        console.log(self.setData)
        amp_main.leftPanel_update();
    }]);

dataTool.controller("irrPlanController",['$rootScope', '$scope',"irrPlanData",
    function($rootScope, $scope,irrPlanData) {
        var self=this;
        self.irrData=irrPlanData;
        console.log(self.irrData);
        //self.setData=rpgSetData[0].values;
        self.save=function(){
            console.log(self.irrData)
        };
        self.count=function(){
            var skip=2;
            var count_array=self.irrData[5].values.slice(2);
            $.each(count_array,function(i,e){
                console.log(e.value);
                console.log(self.irrData[2].values[i+skip].value);
                console.log(self.irrData[3].values[i+skip].value);
                e.value=parseFloat(self.irrData[2].values[i+skip].value)+parseFloat(self.irrData[3].values[i+skip].value);
                console.log(e.value);
            });

        };

        $(".table").on("click","td",function(){
            $(".table td").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();
        });

        irr_plan.init();
        amp_main.leftPanel_update();

        $scope.$on("$destroy", function() {
            irr_plan.destroy();
        })
    }]);

dataTool.controller("dataSimController",['$rootScope', '$scope',"simData","simChartData",
    function($rootScope, $scope,simData,simChartData) {
        var self=this;
        console.log("--------------------------");
        self.chartData=simChartData["chart"];
        console.log(self.chartData);
        self.shops=simData.slice(1);
        self.index=0;
        console.log(simData);
        self.form_menu={
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
            payRange:["月付","季付"]
        };
        self.shopInfo=self.shops[self.index];
        console.log("----------------shopInfo")
        console.log(self.shopInfo);
        self.setShopInfo=function(){
            self.index+=1;
            self.shopInfo=self.shops[self.index];
        }
        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.dismiss=function(){
            var dismiss=window.confirm("确定解约？")

        };
         self.checkReturn=function(){
             console.log(self.shopInfo)
         }
        //页面事件

        $(".table").on("click","td",function(e){
            //e.stopPropagation();
            $(".table td").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();
        });
        amp_datePicker.daterangeSelector();
        amp_datePicker.dateSelector();

        var iscroll_init=function(){
            var h=parseInt($(window).height());

            $(".col-xs-6").css({
                "overflow-y":"hidden",
                "height":(h-88)+"px"
            });

            var datasim_floor_scroll = new IScroll('#datatool-sim-floor-table', {
                mouseWheel: true,
                scrollbars: true
            });
            var datasim_main_scroll= new IScroll('#datatool-sim-main-table', {
                mouseWheel: true,
                scrollbars: true
            });


            var defer=null;
            var scrollUpdate=function(){
                var h=parseInt($(window).height());

                $(".col-xs-6").css({
                    "overflow-y":"hidden",
                    "height":(h-88)+"px"
                });

                datasim_floor_scroll.refresh();
                datasim_main_scroll.refresh();
            };

            $(window).resize(function(){
                if(!defer){
                    defer=setTimeout(function(){
                        scrollUpdate();
                        defer=null;
                    },200);
                }else{
                    clearTimeout(defer);
                    defer=setTimeout(function(){
                        scrollUpdate();
                        defer=null;
                    },200);
                }

            });
            setTimeout(scrollUpdate,300);

        };
        var add_svg=function(){
            $.get("floors.svg",function(data,status){
                var importedSVGRootElement = document.importNode(data.documentElement,true);
                $("#ys-svg").append(importedSVGRootElement);
            });
        };
        iscroll_init();
        add_svg();

        $scope.$on("$destroy", function() {
            amp_datePicker.destroy();
        });
        amp_main.leftPanel_update();
    }]);


