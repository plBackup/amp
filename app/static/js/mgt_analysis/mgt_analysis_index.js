var myApp = angular.module("my-app", ["ui.router"]);

myApp.config(function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.when("","/contract_main");

    // 管理分析-收入分析-合同
    $stateProvider.state("contract_main", {
        url: "/contract_main",
        views: {
            "left": {
                templateUrl: "contract_main_left.html"
            },
            "main": {
                templateUrl: "contract_main.html"
            },
            "right": {
                templateUrl: "contract_main_right.html"
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });
    //管理分析-收入分析-营收
    $stateProvider.state("business_main", {
        url: "/business_main",
        views: {
            "left": {
                templateUrl: "business_main_left.html"
            },
            "main": {
                templateUrl: "business_main.html"
            },
            "right": {
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });

    //管理分析-收入分析-营收-列表 business_merchant_list.html
    $stateProvider.state("business_merchant_list", {
        url: "/business_merchant_list",
        views: {
            "left": {
                templateUrl: "business_merchant_list_left.html"
            },
            "main": {
                templateUrl: "business_merchant_list.html"
            },
            "right": {
            	templateUrl: "business_merchant_detail.html"
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });

    // 管理分析-运营分析-客流 passenger_flow_main.html
    $stateProvider.state("passenger_flow_main", {
        url: "/passenger_flow_main",
        views: {
            "left": {
                templateUrl: "passenger_flow_main_left.html"
            },
            "main": {
                templateUrl: "passenger_flow_main.html"
            },
            "right": {
                templateUrl: "passenger_flow_main_enrolment.html"
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });



    //管理分析-支出分析-成本  cost_main.html (缺少工具栏)
    $stateProvider.state("cost_main", {
        url: "/cost_main",
        views: {
            "left": {
                templateUrl: "cost_main_left.html"
            },
            "main": {
                templateUrl: "cost_main.html"
            },
            "right": {
                templateUrl: "cost_manual_work.html"
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });

    //管理分析-租赁分析-商户销量 merchant_sale_main.html
    $stateProvider.state("merchant_sale_main", {
        url: "/merchant_sale_main",
        views: {
            "left": {
                templateUrl: "merchant_sale_main_left.html"
            },
            "main": {
                templateUrl: "merchant_sale_main.html"
            },
            "right": {
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });
    //管理分析-租赁分析-欠费
    $stateProvider.state("arrears_main", {
        url: "/arrears_main",
        views: {
            "left": {
                templateUrl: "arrears_main_left.html"
            },
            "main": {
                templateUrl: "arrears_main.html"
            },
            "right": {
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });
  //管理分析-租赁分析-欠费明细
    $stateProvider.state("arrears_detail", {
        url: "/arrears_detail",
        views: {
            "left": {
                templateUrl: "arrears_detail_left.html"
            },
            "main": {
                templateUrl: "arrears_detail.html"
            },
            "right": {
                templateUrl: "arrears_enrolment.html"
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });
    //管理分析-租赁分析-欠费明细-录入
     $stateProvider.state("arrears_enrolment", {
        url: "/arrears_enrolment",
        views: {
            "left": {
                templateUrl: "arrears_enrolment_left.html"
            },
            "main": {
                templateUrl: "arrears_enrolment.html"
            },
            "right": {
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });
    // 管理分析-租赁分析-商户销量-业态详情	shop_sale_type_list.html
    $stateProvider.state("shop_sale_type_list", {
        url: "/shop_sale_type_list",
        views: {
            "left": {
                templateUrl: "shop_sale_type_list_left.html"
            },
            "main": {
                templateUrl: "shop_sale_type_list.html"
            },
            "right": {
            	 templateUrl: "shop_sale_type_enrolment.html"
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });

    //管理分析-租赁分析-租赁 rent_main.html
    $stateProvider.state("rent_main", {
        url: "/rent_main",
        views: {
            "left": {
                templateUrl: "rent_main_left.html"
            },
            "main": {
                templateUrl: "rent_main.html"
            },
            "right": {
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });
  
   //管理分析-租赁分析-欠费明细-商铺欠费明细 arrears_merchant_detail.html (缺少工具栏)
    $stateProvider.state("arrears_merchant_detail", {
        url: "/arrears_merchant_detail",
        views: {
            "left": {
                templateUrl: "arrears_merchant_detail_left.html"
            },
            "main": {
                templateUrl: "arrears_merchant_detail.html"
            },
            "right": {
                templateUrl:"arrears_merchant_detail_receiving.html"
            },
            "top": {
            },
            "backdrop": {
            }
        }
    });

    // 管理分析-租赁分析-商户销量-排名 shop_sale_rank.html
    $stateProvider.state("shop_sale_rank", {
        url: "/shop_sale_rank",
        views: {
            "left": {
            },
            "main": {
                templateUrl: "shop_sale_rank.html"
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


var container = $("#mgt-analysis-index");
container.on("click",".headerpanel .head-main-menu ul li a",function(e){
    e.stopPropagation();
    e.preventDefault();

    $(this).closest("ul").find("li").removeClass("active");
    $(this).parent().addClass("active");

    var href = $(this).attr("data-href");
    window.location = href;
});
