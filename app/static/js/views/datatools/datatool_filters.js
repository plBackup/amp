/**
 * Created by limeiting on 16/11/18.
 */
angular.module('dataTool').filter("skip",function(){
    return function(data,count){
        if(angular.isArray(data)){

            if(count>data.legend || count<1){
                return data;
            }else{
                return data.slice(count);
            }
        }else{
            return data;
        }
    }
}).filter("take",function($filter){
    return  function(data, skipCount, takeCount){
        var skippedData=$filter("skip")(data,skipCount);
        return $filter("limitTo")(skippedData,takeCount);
    }
});
