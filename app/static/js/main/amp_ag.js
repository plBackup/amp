/**
 * Created by limeiting on 16/11/4.
 */
'use strict';

/* App Module */

var ampApp = angular.module('amp', [
    'ngRoute',
    'ampControllers',
    'ampFilters',
    'ampServices',
     'ng-swipe',
]);

ampApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/noi', {
            templateUrl: '../views/noi_analyse/noi.html',
            //controller: 'ampNOICtrl'
        }).
        when('/list', {
            templateUrl: '../views/noi_analyse/phone-list.html',
            controller: 'ampListCtrl'
        }).
        when('/detail', {
            templateUrl: '../views/noi_analyse/phone-detail.html',
            controller: 'ampDetailCtrl'
        }).
        otherwise({
            //redirectTo: '/noi'
        });
    }]);
