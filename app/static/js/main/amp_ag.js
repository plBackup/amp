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
            }
        } //state
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
        }
    });



});
