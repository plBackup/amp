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
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
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
        {
            name: 'irrplan',
            url: '/irrplan',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_irr_plan.html',
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
        }, //state
        {
            name: 'datasim',
            url: '/datasim',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_sim.html',
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
        }, //state
        {
            name: 'rpgset',
            url: '/rpgset',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rpg_set_index.html',
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
        }, //state
    ];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/noi');

    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/noi');
        });
});
