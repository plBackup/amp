/**
 * Created by limeiting on 16/11/18.
 */
var dataTool=angular.module("dataTool",[]);
dataTool.controller("dataIndexController",['$rootScope', '$scope',"dataIndexData",
    function($rootScope, $scope,dataIndexData) {
        var self=this;
        self.indexData=dataIndexData.slice(1);
        console.log(self.indexData);
    }]);

dataTool.controller("dataRightController",['$rootScope', '$scope',
    function($rootScope, $scope) {
        var self=this;

    }]);


