/**
 * Created by limeiting on 16/11/18.
 */
var rpgSet_table=(function($,rpgSet_table){
    var rpgSet_table=rpgSet_table;
    var pin;
    var rpgSet_table_head_swiper,rpgSet_table_main_swiper,swiper_rent_update_table,swiper_rent_affect_table;
    rpgSet_table.swiper_init=function(){
        rpgSet_table_head_swiper = new Swiper('#rpg-set-main-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true,
            watchSlidesProgress:true,
        });
        rpgSet_table_main_swiper = new Swiper('#rpg-set-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
        rpgSet_table_head_swiper.params.control = rpgSet_table_main_swiper;
        rpgSet_table_main_swiper.params.control = rpgSet_table_head_swiper;

        //这里把swiper实例加入全局的垃圾回收站
        /* ampApp.collector.add_swiper(rpgSet_table_head_swiper);
         ampApp.collector.add_swiper(rpgSet_table_main_swiper);*/

        swiper_rent_affect_table=new Swiper('#rent-affect-main-table', {
            scrollbar: '.swiper-scrollbar-a',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false,
            watchSlidesProgress:true,
        });

        //这里把swiper实例加入全局的垃圾回收站
        //ampApp.collector.add_swiper(swiper_rent_affect_table);

        swiper_rent_update_table=new Swiper('#rent-update-main-table', {
            scrollbar: '.swiper-scrollbar-b',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });

        //这里把swiper实例加入全局的垃圾回收站
        //ampApp.collector.add_swiper(swiper_rent_update_table);

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#rpg-set-table-wrapper",
            padding: {top: 88, bottom: 50}
        });
        var defer=null;
        function _swiperUpdate(){
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

        //这里实验tab切换输入的情况
       /* $("#rpg-set-table-wrapper input").on("blur",function(e){
            console.log("-----------blur-------------");
            console.log(rpgSet_table_main_swiper.getWrapperTranslate('x'))
        });*/
    };

    rpgSet_table.table_init=function(){
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

    rpgSet_table.destroy=function(){
        console.log("------destroy");
        rpgSet_table_head_swiper.destroy();
        rpgSet_table_main_swiper.destroy();
        swiper_rent_affect_table.destroy();
        swiper_rent_update_table.destroy();
    };

    rpgSet_table.init=function(){

        $("#btn-create").on("click",function(e){
            e.preventDefault();
            amp_main.loading_show();
            setTimeout(function(){
                amp_main.loading_hide();
            },1000);

        });
        rpgSet_table.swiper_init();
        rpgSet_table.table_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
        });
    };

    return rpgSet_table;
})(jQuery,rpgSet_table||{});

var rpg_result_table=(function($,rpg_result_table){
    var rpg_result_table=rpg_result_table;
    var pin;
    var rpg_result_table_head_rpg_result,rpg_result_table_main_rpg_result;
    rpg_result_table.rpg_result_init=function(){
        rpg_result_table_head_rpg_result = new Swiper('#rpg-result-table-head', {
            //scrollbar: '.rpg_result-scrollbar',rpg-result-table-wrapper
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        rpg_result_table_main_rpg_result = new Swiper('#rpg-result-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
        rpg_result_table_head_rpg_result.params.control = rpg_result_table_main_rpg_result;
        rpg_result_table_main_rpg_result.params.control = rpg_result_table_head_rpg_result;

       /* //这里把swiper实例加入全局的垃圾回收站
        ampApp.collector.add_swiper(rpg_result_table_head_rpg_result);
        ampApp.collector.add_swiper(rpg_result_table_main_rpg_result);*/

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#rpg-result-table-wrapper",
            padding: {top: 88, bottom: 50}
        });

        var defer=null;
        function _rpg_resultUpdate(){
           /* rpg_result_table_head_rpg_result.update();
            rpg_result_table_main_rpg_result.update();*/
            pin.refresh();
        };

        $(window).resize(function(){
            if(!defer){

                defer=setTimeout(function(){
                    _rpg_resultUpdate();
                    defer=null;
                },200);
            }else{
                clearTimeout(defer);
                defer=setTimeout(function(){
                    _rpg_resultUpdate();
                    defer=null;
                },200);
            }

        });
    };

    rpg_result_table.table_init=function(){
        console.log("....");
        $(".ys-table-main").on("mouseenter","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            console.log("....");
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

    rpg_result_table.destroy=function(){
        console.log("result destroy -----------");
        rpg_result_table_head_rpg_result.destroy();
        rpg_result_table_main_rpg_result.destroy();
    };
    rpg_result_table.init=function(){
        rpg_result_table.rpg_result_init();
        rpg_result_table.table_init();
    };

    return rpg_result_table;
})(jQuery,rpg_result_table||{});


var dataSet=angular.module("dataSet",[]);

dataSet.controller("dataSetController",['$rootScope', '$scope',"rpgSetData",
    function($rootScope, $scope,rpgSetData) {
        var self=this;
        self.rpgSetData=rpgSetData[0];
        console.log(self.rpgSetData);
        //self.setData=rpgSetData[0].values;
        self.setSave=function(){
            console.log(self.rpgSetData)
        };


        //页面事件
        $(".page-main").on("click",function(e){
            e.stopPropagation();
            $(".table td").removeClass("active");
        });

        $(".table").on("click","td",function(e){
            e.stopPropagation();
            $(".table td").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();
        });

        //dataSetView.init();
        rpgSet_table.init();
        $scope.$on("$destroy", function() {
            rpgSet_table.destroy();
        })
    }]);

dataSet.controller("dataResultController",['$rootScope', '$scope',"rpgResultData","paginatorService",
    function($rootScope, $scope,rpgResultData,paginatorService) {
        var self=this;
        console.log(rpgResultData);
        var shopData=rpgResultData.slice(1);
        console.log(shopData);
        self.rpgResultData=shopData;
        self.recordsNum=self.rpgResultData.length;
        self.pageLimit=10;
        self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);

        self.paginator=paginatorService(self.pageLimit,self.pageNum,self.rpgResultData);

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

        self.dataReCount=function(){
          console.log("re count data....");

        };
        self.setSave=function(){
            console.log("save result data------------------");
            console.log(self.rpgResultData)
        };


        //dataSetView.init();
        rpg_result_table.init();
        $scope.$on("$destroy", function() {
            rpg_result_table.destroy();
        })
    }]);


