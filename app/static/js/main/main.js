/**
 * Created by limeiting on 16/11/15.
 */
/* App Module */

var mainApp = angular.module('main', [
    'ui.router',
]);


mainApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'main',
            url: '/main',
            views:{
                'content': {
                    templateUrl: '../main/main_ag.html',
                    controller:'pjListController',
                    controllerAs: 'listCtrl'
                },
            },

            resolve: {
                projects: function(ProjectService) {
                    return ProjectService.getAllProject();
                },
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'create',
            url: '/create',
            views:{
                'content': {
                    templateUrl: '../main/create_project.html',
                    controller:"pjCreateController",
                    controllerAs: 'ctrl',
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
        },//state,
        {
            name: 'update',
            url: '/update/{projectId}',
            views:{
                'content': {
                    templateUrl: '../main/create_project.html',
                    controller:"pjUpdateController",
                    controllerAs: 'ctrl',
                },
            },

            resolve: {
              /*  project:["projects","$stateParams",function(projects,$stateParams){
                    //这里的逻辑是把数据做在 list-> ui-view( create )里的方法
                    var pId=$stateParams.projectId;
                    console.log(projects);
                    console.log(pId);
                    return projects[pId];
                    /!* return projects.find(function (project) {
                     return project.id==pId;
                     })*!/
                }],*/
                pid:["$stateParams",function($stateParams){
                    //这里的逻辑是把数据做在 list-> ui-view( create )里的方法
                    var pId=$stateParams.projectId;
                    return pId;
                }],
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        }//state
    ];//end states;

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/main');

    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/main');
        });
}]);

/*mainApp.service('ProjectService', function($http) {
    var service = {
        getAllProject: function() {
            return $http.get('../data/projectList.json', { cache: true }).then(function(res) {
                return res.data['projects'];
            });
        },

        getProject: function(id) {
            function projectMatchesParam(project) {
                return project.id === id;
            }

            return service.getAllProject().then(function (project) {
                return project.find(projectMatchesParam)
            });
        },
    };

    return service;
});*/


mainApp.controller('MainController', function($rootScope, $scope) {
    $rootScope.homePageIsShown = true;

    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;
        // $scope.$apply();
    });
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.curState=toState.name;
            $rootScope.prev=fromState.name;
            $scope.state.enter=true;
            $scope.state.exit=false;
            $scope.state.loading=false;
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

mainApp.controller("pjListController",["$rootScope","$scope","projects",function($rootScope,$scope,projects){
    var self=this;
    if(!$rootScope.projects){
        $rootScope.projects=projects;
    }
    self.projects=$rootScope.projects;
}]);
mainApp.controller("testCtrl",function($rootScope,$scope){
    $scope.name="txt";
});

mainApp.controller("pjCreateController",["$rootScope","$scope","$location",function($rootScope,$scope,$location){
    //$scope.project=project;
    var self=this;
    self.project={
            "name":"",
            "proportion":"",
            "proportionType":"",
            "openRate":"%",
            "income":0,
            "irr":"%",
            "complete":"%",
            "noi":{
                "monthly":0,
                "yearly":"0"
            },
            "asset":{
                "value":"",
                "rate":"%"
            },
            "pm":{
                "name":"",
                "title":"",
                "figure":"",
                "teamNum":0,
                "contact":"email",
                "resume":"/"
            },
            "position":""
    };
    self.curState=$rootScope.curState;
    self.index=$rootScope.projects.length;

    self.submit=function(){
        $rootScope.projects.push(self.project);
        $location.path("/main");
    };

}]);
mainApp.controller("pjUpdateController",["$rootScope","$scope","$location","pid",function($rootScope,$scope,$location,pid){
    //$scope.project=project;
    var self=this;
    self.pid=pid;
    self.curState=$rootScope.curState;
    self.index="update";
    self.project=$rootScope.projects[pid];

    self.submit=function(){
        //$rootScope.projects.push(self.project);
        $location.path("/main");
    };
}]);

mainApp.run(function($http) {
    $http.get('../data/projectList.json', { cache: true });
});
