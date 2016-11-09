/**
 * Created by limeiting on 16/11/4.
 */
'use strict';

/* App Module */

var ampAppSolo = angular.module('ampsolo', [
    'ui.router',
    'ampControllers',
    'ampFilters'
]);


ampAppSolo.config(function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [

        {
            name: 'rpgpin',
            url: '/rpgpin',
            views:{

                'content': {
                    templateUrl: '../views/datatools/rpg_set_swiper_pin.html',
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
    $urlRouterProvider.when('', '/rpgpin');
    $urlRouterProvider.when('datatool', '/');
    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/');
        });
});
