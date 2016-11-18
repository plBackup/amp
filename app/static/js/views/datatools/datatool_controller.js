/**
 * Created by limeiting on 16/11/18.
 */
var dataTool=angular.module("dataTool",[]);
dataTool.controller("dataIndexController",['$rootScope', '$scope',"dataIndexData",
    function($rootScope, $scope,dataIndexData) {
        var self=this;
        console.log(dataIndexData);
    }]);

dataTool.controller("dataRightController",['$rootScope', '$scope',
    function($rootScope, $scope) {
        var self=this;

    }]);


