/**
 * Created by limeiting on 16/11/18.
 */
var ampFilter=angular.module("ampFilter",[]);

ampFilter.controller('monthFilterController', ['$rootScope', '$scope',"$timeout",
    function($rootScope, $scope, $timeout) {
        var self=this;
        self.selectedMonth=function(date){
           console.log(self.curMonth);
        };
       /* $timeout(function(){
            self.curMonth="2017-09";
            console.log("....");

        },3000)*/
        self.curMonth="2016-11";
        $scope.$on("$destroy", function() {
            //清除配置
            //$(".ys-datepicker input").datetimepicker("destory");

        });
        //self.selectedValue=""
    }]);

ampFilter.controller('dataSelectorController', ['$rootScope', '$scope',
    function($rootScope, $scope, $timeout) {
        var self=this;

        $scope.$on("$destroy", function() {
            //清除配置


        });

    }]);

ampFilter.controller('dataFilterController', ['$rootScope', '$scope',
    function($rootScope, $scope, $timeout) {
        var self=this;

        $scope.$on("$destroy", function() {
            //清除配置


        });

    }]);