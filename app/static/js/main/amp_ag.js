/**
 * Created by limeiting on 16/11/4.
 */
'use strict';

/* App Module */

var ampApp = angular.module('amp', [
    'ngRoute',
    'ampControllers',
    'ampFilters',
    'ampServices'
]);

ampApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/list', {
            templateUrl: '../views/noi_analyse/phone-list.html',
            controller: 'ampListCtrl'
        }).
        when('/detail', {
            templateUrl: '../views/noi_analyse/phone-detail.html',
            controller: 'ampDetailCtrl'
        }).
        otherwise({
            redirectTo: '/list'
        });
    }]);
