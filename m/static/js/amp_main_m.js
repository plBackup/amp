/**
 * Created by limeiting on 16/12/2.
 */
var ampApp = angular.module('amp', [
    'ui.router',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',

    'noi'
]);

//这里是gestures里的一个设置，待测试
ampApp.run(function($transform) {
    window.$transform = $transform;
});


ampApp.config(function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'noi',
            url: '/noi',
            views:{
                'content': {
                    templateUrl: './views/noi_analyse/noi.html',
                    controller:"noiController",
                    controllerAs:"noiCtrl"
                },
            },
            resolve: {
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();

                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state

    ];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.when('', '/noi');
    //$urlRouterProvider.when('/rpgindex', '/rpgindex/1');
    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/noi');
        });

});

ampApp.controller('MainController', function($rootScope, $scope,$location,$timeout) {
    /*var curProject=window.location.search.slice(1).split("=")[1] ||0;
     console.log(curProject);
     $rootScope.curProject=curProject;*/
    //$rootScope.projectName="商业公司A";
    var self=this;
    self.title="悦商AMP";
    self.menu=menu_list["amp_menu"];

    $rootScope.homePageIsShown = true;
    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;
        //ampApp.collector.destory();
        // $scope.$apply();
    });
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.curState=toState.name;
            $rootScope.prev=fromState.name;
            $scope.state.enter=true;
            $scope.state.exit=false;
            $scope.state.loading=false;
            //console.log("prev:"+fromState.name);

        });
    $rootScope.$on('$viewContentLoading',
        function(event, viewConfig){
            // Access to all the view config properties.
            // and one special property 'targetView'
            // viewConfig.targetView
            $scope.state.loading=true;
        });

    $scope.$on('$viewContentLoaded',
        function(event){
            $scope.state.loading=false;
        });
});
