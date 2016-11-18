/**
 * Created by limeiting on 16/11/18.
 */
var ampFilter=angular.module("ampFilter",[]);

ampFilter.controller('monthFilterController', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        var self=this;
        self.selectedMonth=function(date){
            alert(date.date);
        };

        self.curMonth="2016-11";
        $scope.$on("$destroy", function() {
            //清除配置
        })
        //self.selectedValue=""
    }]);