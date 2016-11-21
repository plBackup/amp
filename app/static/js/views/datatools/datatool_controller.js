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

        amp_main.leftPanel_update();
    }]);


