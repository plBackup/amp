/**
 * Created by limeiting on 16/11/18.
 */
var dataTool=angular.module("dataTool",[]);
dataTool.controller("dataIndexController",['$rootScope', '$scope',"dataIndexData","paginatorService","$timeout","$location","$filter",
    function($rootScope, $scope,dataIndexData,paginatorService,$timeout,$location,$filter) {
        var self=this;
        var shopData=dataIndexData.slice(1);
        self.indexData=shopData;
        self.recordsNum=self.indexData.length;
        self.pageLimit=20;
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
            console.log(shop);
            console.log(index);
            console.log(self.indexData[index]['shopIndex']);
            //self.indexData[index].shopIndex+="###";
            $rootScope.$broadcast("shopEdit",{shopData:shop,index:index})
        };

        self.shopUpdate=function(index,shop){
            console.log(shop);
            console.log(index);
            shopData[index]=shop;

        };

        $scope.$on("shopUpdate",function(e,data){
            self.shopUpdate(data.index,data.shop);
        });

        self.shopAdd=function(index,shop){
            console.log(shop);
            console.log(index);
            if(index==""){
                shopData.unshift(shop);
                self.recordsNum=self.indexData.length;
                self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
                self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
            }else if(index=="new"){
               console.log("new---------")
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
           console.log("get filters..--------.");
           console.log(data);
           var curFilter={};
           $.each(data.filters,function(k,v){
               if(k!=="project" && v!=="" ){
                   curFilter[k]=v;
               }
           });
           console.log(curFilter);
           console.log("-----------------------------------");
           self.indexData=$filter("filter")(shopData,curFilter);
           console.log(self.indexData);
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
        self.index="";
        self.shopInfo={};
        $scope.$on("shopEdit",function(e,data){
            console.log(e);
            console.log(data);
            self.index=data.index;
            self.shopInfo=data.shopData;
        });

        self.save=function(){
            if(typeof self.shopInfo.shopIndex==="undefined" || self.shopInfo.shopIndex==""){
                console.log("...null");
                return;
            }
            console.log(self.shopInfo);
            if(self.index==""){
                $rootScope.$broadcast("shopAdd",{
                    index:self.index,
                    shop:self.shopInfo
                });
                //amp_main.rightPanel_close();
                //self.shopInfo={};
                console.log("-------------")
                console.log(self.index);
                self.index="new";
                console.log("lll ")
                console.log(self.index);
            }else if(self.index=="new"){
                console.log("if new")
                $rootScope.$broadcast("shopUpdateAdd",{
                    index:self.index,
                    shop:self.shopInfo
                });
                //amp_main.rightPanel_close();
                //self.shopInfo={};
                console.log("-------------")
                console.log(self.index);
                self.index="new";
            }else{
                $rootScope.$broadcast("shopUpdate",{
                    index:self.index,
                    shop:self.shopInfo
                });
                amp_main.rightPanel_close();
                self.shopInfo={};
                console.log("-------------")
                console.log(self.index);
            }

        };

        self.next=function(){
            console.log("next.....");
            self.index="";
            self.shopInfo={};
        }

        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.reset=function(){
            console.log("reset.....");
            self.index="";
            self.shopInfo={
            };

        };

    }]);

