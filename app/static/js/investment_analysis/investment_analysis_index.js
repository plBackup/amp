var myApp = angular.module("my-app", ["ui.router"]);

myApp.config(function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.when("","/simulation_calculation");

    $stateProvider.state("simulation_calculation", {
        url: "/simulation_calculation",
        views: {
            "left": {
            },
            "main": {
                templateUrl: "simulation_calculation_main.html"
            },
            "right": {
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });


});
