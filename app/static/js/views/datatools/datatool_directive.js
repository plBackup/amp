/**
 * Created by limeiting on 16/11/18.
 */
angular.module('dataTool').service('dataIndexService', function($http) {
    var service = {
        getIndexData: function () {
            return $http.get('../data/noi/noi_all.json', {cache: true}).then(function (res) {
                return res.data;
            });
        }
    }
});