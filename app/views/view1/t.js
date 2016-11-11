/**
 * Created by limeiting on 16/11/11.
 */
angular
    .module('angularStates', ['ui.router', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                views: {
                    'input-views': {
                        template: '',
                        controller: function($rootScope) {
                            $rootScope.homePageIsShown = true;
                        }
                    }
                }
            })
            .state('state1', {
                url: "/state1",
                views: {
                    'input-views': {
                        template: '<div class="inner-wrapper"><div class="slide-header">Slide 1</div><div class="button-wrapper"><a href="#" ui-sref="home">Back</a><a href="#" ui-sref="state2">Next</a></div></div>',
                        controller: function($rootScope) {
                            $rootScope.homePageIsShown = false;
                        }
                    }
                }
            })
            .state('state2', {
                url: "/state2",
                data: {
                    prev: 'state1'
                },
                views: {
                    'input-views': {
                        template: '<div class="inner-wrapper"><div class="slide-header">Slide 2</div><div class="button-wrapper"><a href="#" ui-sref="state1">Back</a><a href="#" ui-sref="home">Home</a></div></div>',
                        controller: function($rootScope) {
                            $rootScope.homePageIsShown = false;
                        }
                    }
                }
            })
    })
    .controller('MainController', function($rootScope, $scope) {
        $rootScope.homePageIsShown = true;
        $scope.state = {};
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            var prev = fromState.data ? fromState.data.prev : '';
            $scope.state.back = (toState.name === prev);
            $scope.state.toHome = (toState.name === 'home');
            $scope.$apply();
        });
    })