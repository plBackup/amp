/**
 * Created by limeiting on 16/11/18.
 */
angular.module('dataTool').service('dataIndexService', ["$http",function($http) {
    var service = {
        getIndexData: function () {
            console.log("loadding");
            return $http.get('../data/shopInfo.json', {cache: true}).then(function (res) {
                console.log("load....");
                return res.data;
            });
        },

        getPageData:function(){

        }

    };
    return service;

}]);

angular.module('dataTool').service('paginator', [function() {
    var service = {
      hasNextVar:false,
        next:function(){
           if(this.hasNextVar){
               this.currentOffset+=pageSize;
               this._load();
           }
        },
        _load:function(){
            var self=this;
            fetchData(this.currentOffset,pageSize+1,function(items){
                self.currentPageItems=items.slice(0,pageSize);
                self.hasNextVar= items.length===pageSize+1;
            });
        },
        hasNext:function(){
            return this.hasNextVar;
        },
        previous:function(){
            if(this.hasPrevious){
                this.currentOffset ==pageSize;
                this._load();
            }
        },
        hasPrevious:function(){
            return this.currentOffset !==0;
        },
        currentPageItems:[],
        currentOffset:0
    };
    service._load();

    return service;

}]);