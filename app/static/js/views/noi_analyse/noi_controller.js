/**
 * Created by limeiting on 16/11/17.
 */

'use strict';

/* Controllers */

var noi = angular.module('noi', [
]);

noi.controller('noiController', ['$rootScope', '$scope',"noiAllData",
    function($rootScope, $scope,noiAllData) {
        var self=this;
        self.allData=noiAllData;
        console.log(noiAllData);

        self.noiData=noiAllData.noi[0].values;
        self.incomeData=noiAllData.income;
        self.feeData=noiAllData.fee;
        self.arrearageData=noiAllData.arrearage;
        self.chartData=noiAllData.chart;

        self.isSplit=function(index){
            return (index+1)%4==0;
        }
        console.log(self.incomeData);


        $scope.$on("$destroy", function() {
            //清除配置,不然scroll会重复请求
        })

    }]);

noi.controller('noiToolController', ['$rootScope','$scope',
    function($rootScope,$scope) {
        console.log("...");

        $scope.$on("$destroy", function() {
            //清除配置,不然scroll会重复请求
        });
    }]);
