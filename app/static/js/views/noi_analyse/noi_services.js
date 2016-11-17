/**
 * Created by limeiting on 16/11/15.
 */
angular.module('noi').service('noiService', function($http) {
    var service = {
        getAllData: function() {
            return $http.get('../data/noi/noi_all.json', { cache: true }).then(function(res) {
                return res.data;
            });
        }
    };

    return service;
});