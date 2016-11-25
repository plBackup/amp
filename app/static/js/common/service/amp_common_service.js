var commonService = angular.module("commonService",[]);

commonService.factory("$ampDocumentReady",["$interval",function($interval){

    var delay = 200; // 延迟加载时间
    var count = 30; // 最多执行次数

    function load(selector,callback){

        var promise = $interval(function(){
            if($(selector).length>0){
                callback();
                $interval.cancel(promise);
            }
        },delay,count);

    }

    return load;


}]);

commonService.factory("$getPaginationResult",[function(){
    return function(records,pageSize){
        var recordCount = records.length;
        var pageCount = 0;
        if(recordCount/pageSize>1){
            pageCount = parseInt(recordCount/pageSize)+1;
        }else{
            pageCount = 1;
        }
        return {
            recordCount:recordCount,
            pageCount:pageCount,
            records:records,
            pageSize:pageSize
        };
    };
}]);
