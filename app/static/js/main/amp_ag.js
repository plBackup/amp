/**
 * Created by limeiting on 16/11/4.
 */
'use strict';

/* App Module */

var ampApp = angular.module('amp', [
    'ui.router',
    'ampControllers',
    'ampFilters'
]);


ampApp.config(function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'noi',
            url: '/noi',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/noi_filter.html',
                },
                'content': {
                    templateUrl: '../views/noi_analyse/noi.html',
                },
            },
        }, //state
        {
            name: 'rpgindex',
            url: '/rpgindex',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/rent_package_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rent_package.html',
                },
                "right":{
                    templateUrl: '../views/datatools/datatool_rent_package_rpanel.html',
                }
            },
        }, //state
    ];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/rpgindex');
    $urlRouterProvider.when('datatool', '/');
    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/');
        });
});
