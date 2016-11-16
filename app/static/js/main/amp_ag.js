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
                    templateUrl: '../components/toolbar/noi_filter.html'
                },
                'content': {
                    templateUrl: '../views/noi_analyse/noi.html'
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'rpgindex',
            url: '/rpgindex',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/rent_package_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rent_package.html'
                },
                "right":{
                    templateUrl: '../views/datatools/datatool_rent_package_rpanel.html'
                }
            },
            controller:"page",
            resolve: {
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'irrplan',
            url: '/irrplan',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_irr_plan.html'
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'datasim',
            url: '/datasim',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_sim.html'
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'rpgset',
            url: '/rpgset',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rpg_set_index.html'
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]
            }
        } //state
    ];



    // 投资分析
    $stateProvider.state("simulation_calculation_main", {
        url: "/simulation_calculation_main",
        views: {
            "toolbar": {
            },
            "content": {
                templateUrl: "../investment_analysis/simulation_calculation_main.html"
            },
            "right": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    // 管理分析-收入分析-合同
    $stateProvider.state("contract_main", {
        url: "/contract_main",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/contract_main_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/contract_main.html"
            },
            "enrolment": {
                templateUrl: "../mgt_analysis/contract_main_right.html"
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    //管理分析-收入分析-营收
    $stateProvider.state("business_main", {
        url: "/business_main",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/business_main_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/business_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    //管理分析-收入分析-营收-列表 business_merchant_list.html
    $stateProvider.state("business_merchant_list", {
        url: "/business_merchant_list",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/business_merchant_list_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/business_merchant_list.html"
            },
            "enrolment": {

            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    //管理分析-收入分析-营收-列表 business_merchant_list.html
    $stateProvider.state("business_merchant_detail", {
        url: "/business_merchant_detail",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/business_merchant_detail_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/business_merchant_detail.html"
            },
            "enrolment": {
                templateUrl: "../mgt_analysis/business_merchant_detail_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    // 管理分析-运营分析-客流 passenger_flow_main.html
    $stateProvider.state("passenger_flow_main", {
        url: "/passenger_flow_main",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/passenger_flow_main_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/passenger_flow_main.html"
            },
            "enrolment": {

            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    $stateProvider.state("passenger_flow_main_enrolment", {
        url: "/passenger_flow_main_enrolment",
        views: {
            "toolbar": {
                templateUrl:"../mgt_analysis/passenger_flow_main_enrolment_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/passenger_flow_main_enrolment.html"
            },
            "enrolment": {

            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });



    //管理分析-支出分析-成本  cost_main.html (缺少工具栏)
    $stateProvider.state("cost_main", {
        url: "/cost_main",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/cost_main_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/cost_main.html"
            },
            "enrolment": {
                templateUrl: "../mgt_analysis/cost_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    //管理分析-支出分析-成本-人工  cost_manual_work.html
    $stateProvider.state("cost_manual_work", {
        url: "/cost_manual_work",
        views: {
            "toolbar": {

            },
            "content": {
                templateUrl: "../mgt_analysis/cost_manual_work.html"
            },
            "enrolment": {

            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    //管理分析-租赁分析-商户销量 merchant_sale_main.html
    $stateProvider.state("merchant_sale_main", {
        url: "/merchant_sale_main",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/merchant_sale_main_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/merchant_sale_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });
    //管理分析-租赁分析-欠费
    $stateProvider.state("arrears_main", {
        url: "/arrears_main",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/arrears_main_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/arrears_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });
    //管理分析-租赁分析-欠费明细
    $stateProvider.state("arrears_detail", {
        url: "/arrears_detail",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/arrears_detail_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/arrears_detail.html"
            },
            "enrolment": {
                templateUrl: "../mgt_analysis/arrears_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });
    //管理分析-租赁分析-欠费明细-录入
    $stateProvider.state("arrears_enrolment", {
        url: "/arrears_enrolment",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/arrears_enrolment_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/arrears_enrolment.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });
    // 管理分析-租赁分析-商户销量-业态详情	shop_sale_type_list.html
    $stateProvider.state("shop_sale_type_list", {
        url: "/shop_sale_type_list",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/shop_sale_type_list_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/shop_sale_type_list.html"
            },
            "enrolment": {
                templateUrl: "../mgt_analysis/shop_sale_type_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    //管理分析-租赁分析-租赁 rent_main.html
    $stateProvider.state("rent_main", {
        url: "/rent_main",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/rent_main_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/rent_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    //管理分析-租赁分析-欠费明细-商铺欠费明细 arrears_merchant_detail.html (缺少工具栏)
    $stateProvider.state("arrears_merchant_detail", {
        url: "/arrears_merchant_detail",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/arrears_merchant_detail_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/arrears_merchant_detail.html"
            },
            "enrolment": {
                templateUrl:"../mgt_analysis/arrears_merchant_detail_receiving.html"
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    // 管理分析-租赁分析-商户销量-排名 shop_sale_rank.html
    $stateProvider.state("shop_sale_rank", {
        url: "/shop_sale_rank",
        views: {
            "toolbar": {
            },
            "content": {
                templateUrl: "../mgt_analysis/shop_sale_rank.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    $stateProvider.state("blank", {
        url: "/blank",
        views: {
            "toolbar": {
            },
            "content": {
                templateUrl: "../views/blank_page.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

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


ampApp.controller('MainController', function($rootScope, $scope) {
    $rootScope.homePageIsShown = true;
    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;
        ampApp.collector.destory();
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

ampApp.nav_list={

    "noi":{
        sideNav:"#main-0",
        headerBar:"#header-tabs-0",
        headerItem:"#nav-tabs-item-0-0"
    },
    "rpgindex":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-0"
    },
    "rpgset":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-0"
    },
    "datasim":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-1"
    },
    "irrplan":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-2"
    }
};

//手动设置当前菜单的激活状态 navhash为当前route的state值 配置于ampApp.nav_list
ampApp.setNav=function(navhash){
    var navSets=ampApp.nav_list[navhash];
    if(typeof navSets!=="undefined"){
        $(".leftpanelinner ul.nav-bracket").find("li").removeClass("active");
        $(navSets.sideNav).closest("li").addClass("active");

        $(".head-main-menu").children(".nav-tabs").removeClass("active");
        $(navSets.headerBar).addClass("active").find("li").removeClass("active").end().find(navSets.headerItem).addClass("active");
    }
};

//swiper 和 datetimepicker的回收器
ampApp.collector=(function($,ac){
    var collector=ac;
    collector.array_swipers=[];
    collector.array_datepickers=[];

    collector.add_swiper=function(s){
        collector.array_swipers.push(s);
    };
    collector.add_datepicker=function(d){
        collector.array_datepickers.push(d);
    };

    collector.destory=function(){
        $.each(collector.array_swipers,function(i,e){
            e.destroy(true,true);
        });
        collector.array_swipers=[];
        $.each(collector.array_datepickers,function(i,e){
            $(e.selector).datetimepicker("remove");
        });
        collector.array_datepickers=[];

    };

    return collector;
})(jQuery,ampApp.collector||{});

