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

    };
    return service;

}]);