/**
 * Created by limeiting on 16/11/17.
 */

'use strict';

/* Controllers */

var noiControllers = angular.module('noiControllers', []);

noiControllers.controller('noiController', ['$rootScope', '$scope',
    function($rootScope, $scope) {



        $scope.$on("$destroy", function() {
            //清除配置,不然scroll会重复请求
        })

    }]);


ampControllers.controller('toolbarController', ['$rootScope','$scope', '$routeParams',
    function($rootScope,$scope, $routeParams) {
        console.log("...");

        $scope.$on("$destroy", function() {
            //清除配置,不然scroll会重复请求
        });
    }]);
