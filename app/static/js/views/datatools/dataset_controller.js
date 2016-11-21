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


