ampApp.controller("shop-sale-rank-controller",["$scope","$ampDocumentReady",function($scope,$ampDocumentReady){
    var commercialDataAll = {
        top:[{"saleMerchantName":"南京大排档","saleAmount":"1795515.6","orderNo":"1","performanceAmount":"8218","rentSaleMerchantName":"老鳯祥黄金","performanceMerchantName":"金数码","rentSaleRate":"4%"},{"saleMerchantName":"无印良品","saleAmount":"1178433.1599999999","orderNo":"2","performanceAmount":"7231","rentSaleMerchantName":"香港十三座","performanceMerchantName":"冰冰糖糖","rentSaleRate":"8%"},{"saleMerchantName":"金数码","saleAmount":"1003369","orderNo":"3","performanceAmount":"5348","rentSaleMerchantName":"热风","performanceMerchantName":"老鳯祥黄金","rentSaleRate":"8%"},{"saleMerchantName":"古炉","saleAmount":"924897.72","orderNo":"4","performanceAmount":"4055","rentSaleMerchantName":"快乐柠檬","performanceMerchantName":"香港十三座","rentSaleRate":"8%"},{"saleMerchantName":"塔哈尔","saleAmount":"899710.78","orderNo":"5","performanceAmount":"3974","rentSaleMerchantName":"和风铁板烧","performanceMerchantName":"巴黎贝甜","rentSaleRate":"9%"},{"saleMerchantName":"旖彩城","saleAmount":"879322.8","orderNo":"6","performanceAmount":"3903","rentSaleMerchantName":"AMANI造型","performanceMerchantName":"快乐柠檬","rentSaleRate":"11%"},{"saleMerchantName":"避风塘","saleAmount":"864248.3","orderNo":"7","performanceAmount":"3260","rentSaleMerchantName":"百老汇","performanceMerchantName":"都可茶饮","rentSaleRate":"11%"},{"saleMerchantName":"徽语","saleAmount":"845299.4","orderNo":"8","performanceAmount":"2889","rentSaleMerchantName":"如意馄饨","performanceMerchantName":"蘭芳园","rentSaleRate":"13%"},{"saleMerchantName":"H&M","saleAmount":"783736.23","orderNo":"9","performanceAmount":"2754","rentSaleMerchantName":"小杨生煎","performanceMerchantName":"塔哈尔","rentSaleRate":"14%"},{"saleMerchantName":"爱食馆美食广场","saleAmount":"757591.29","orderNo":"10","performanceAmount":"2546","rentSaleMerchantName":"ABS","performanceMerchantName":"南京大排档","rentSaleRate":"14%"}],
        bottom:[{"saleMerchantName":"薇薇摄影","saleAmount":"300","orderNo":"1","performanceAmount":"19","rentSaleMerchantName":"茂棒","performanceMerchantName":"橙爱玩国","rentSaleRate":"256%"},{"saleMerchantName":"烘焙实验室","saleAmount":"2491.8000000000002","orderNo":"2","performanceAmount":"19","rentSaleMerchantName":"墨上品","performanceMerchantName":"薇薇摄影","rentSaleRate":"214%"},{"saleMerchantName":"名表维修","saleAmount":"2900","orderNo":"3","performanceAmount":"34","rentSaleMerchantName":"罗帝可可","performanceMerchantName":"WARAWARA","rentSaleRate":"203%"},{"saleMerchantName":"茂棒","saleAmount":"3055","orderNo":"4","performanceAmount":"35","rentSaleMerchantName":"名表维修","performanceMerchantName":"女王之宠","rentSaleRate":"152%"},{"saleMerchantName":"女王之宠","saleAmount":"3223","orderNo":"5","performanceAmount":"45","rentSaleMerchantName":"优蜜","performanceMerchantName":"龙炎","rentSaleRate":"151%"},{"saleMerchantName":"思乐得","saleAmount":"4223","orderNo":"6","performanceAmount":"48","rentSaleMerchantName":"城隍庙金福银楼","performanceMerchantName":"烘焙实验室","rentSaleRate":"142%"},{"saleMerchantName":"金煜珠宝","saleAmount":"4320","orderNo":"7","performanceAmount":"51","rentSaleMerchantName":"万合至配","performanceMerchantName":"咕噜咕噜","rentSaleRate":"138%"},{"saleMerchantName":"橙爱玩国","saleAmount":"4806","orderNo":"8","performanceAmount":"59","rentSaleMerchantName":"金煜珠宝","performanceMerchantName":"爱尚英语","rentSaleRate":"126%"},{"saleMerchantName":"龙炎","saleAmount":"5216.41","orderNo":"9","performanceAmount":"70","rentSaleMerchantName":"足装秀","performanceMerchantName":"罗帝可可","rentSaleRate":"122%"},{"saleMerchantName":"T400","saleAmount":"6260.6","orderNo":"10","performanceAmount":"73","rentSaleMerchantName":"懒咖","performanceMerchantName":"地球尔","rentSaleRate":"115%"}]
    };
    var commercialDataRepast = {
        top:[{"saleMerchantName":"南京大排档","saleAmount":"1795515.6","orderNo":"1","performanceAmount":"7230","rentSaleMerchantName":"香港十三座","performanceMerchantName":"冰冰糖糖","rentSaleRate":"8%"},{"saleMerchantName":"古炉","saleAmount":"924897.72","orderNo":"2","performanceAmount":"4055","rentSaleMerchantName":"快乐柠檬","performanceMerchantName":"香港十三座","rentSaleRate":"8%"},{"saleMerchantName":"塔哈尔","saleAmount":"899710.78","orderNo":"3","performanceAmount":"3974","rentSaleMerchantName":"和风铁板烧","performanceMerchantName":"巴黎贝甜","rentSaleRate":"9%"},{"saleMerchantName":"避风塘","saleAmount":"864248.3","orderNo":"4","performanceAmount":"3904","rentSaleMerchantName":"小杨生煎","performanceMerchantName":"快乐柠檬","rentSaleRate":"14%"},{"saleMerchantName":"徽语","saleAmount":"845299.4","orderNo":"5","performanceAmount":"3260","rentSaleMerchantName":"绝味鸭脖","performanceMerchantName":"都可茶饮","rentSaleRate":"15%"},{"saleMerchantName":"爱食馆美食广场","saleAmount":"757591.29","orderNo":"6","performanceAmount":"2889","rentSaleMerchantName":"桂源铺","performanceMerchantName":"蘭芳园","rentSaleRate":"18%"},{"saleMerchantName":"云海肴","saleAmount":"673002","orderNo":"7","performanceAmount":"2754","rentSaleMerchantName":"丸来玩趣","performanceMerchantName":"塔哈尔","rentSaleRate":"18%"},{"saleMerchantName":"星巴克","saleAmount":"648241","orderNo":"8","performanceAmount":"2546","rentSaleMerchantName":"鲜之恋情榨汁","performanceMerchantName":"南京大排档","rentSaleRate":"19%"},{"saleMerchantName":"巴实火锅","saleAmount":"624316","orderNo":"9","performanceAmount":"2348","rentSaleMerchantName":"豆花开了","performanceMerchantName":"小杨生煎","rentSaleRate":"19%"},{"saleMerchantName":"味三亭","saleAmount":"576656","orderNo":"10","performanceAmount":"2233","rentSaleMerchantName":"萨莉亚意式餐厅","performanceMerchantName":"和风铁板烧","rentSaleRate":"20%"}],
        bottom:[{"saleMerchantName":"烘焙实验室","saleAmount":"2491.8000000000002","orderNo":"1","performanceAmount":"34","rentSaleMerchantName":"茂棒","performanceMerchantName":"WARAWARA","rentSaleRate":"256%"},{"saleMerchantName":"茂棒","saleAmount":"3055","orderNo":"2","performanceAmount":"35","rentSaleMerchantName":"罗帝可可","performanceMerchantName":"女王之宠","rentSaleRate":"203%"},{"saleMerchantName":"女王之宠","saleAmount":"3223","orderNo":"3","performanceAmount":"45","rentSaleMerchantName":"优蜜","performanceMerchantName":"龙炎","rentSaleRate":"151%"},{"saleMerchantName":"龙炎","saleAmount":"5216.41","orderNo":"4","performanceAmount":"48","rentSaleMerchantName":"懒咖","performanceMerchantName":"烘焙实验室","rentSaleRate":"115%"},{"saleMerchantName":"罗帝可可","saleAmount":"7615.58","orderNo":"5","performanceAmount":"70","rentSaleMerchantName":"雪冰","performanceMerchantName":"罗帝可可","rentSaleRate":"83%"},{"saleMerchantName":"吧块吧","saleAmount":"7624.6","orderNo":"6","performanceAmount":"82","rentSaleMerchantName":"大益茶庭","performanceMerchantName":"懒咖","rentSaleRate":"83%"},{"saleMerchantName":"大通冰室","saleAmount":"8810.9","orderNo":"7","performanceAmount":"95","rentSaleMerchantName":"酒窝甜品","performanceMerchantName":"度小月生活馆","rentSaleRate":"71%"},{"saleMerchantName":"玉品番达","saleAmount":"9373","orderNo":"8","performanceAmount":"114","rentSaleMerchantName":"鹅颈桥","performanceMerchantName":"音乐天空","rentSaleRate":"70%"},{"saleMerchantName":"茶桔便","saleAmount":"9507.2999999999993","orderNo":"9","performanceAmount":"126","rentSaleMerchantName":"阿秦家味","performanceMerchantName":"茂棒","rentSaleRate":"69%"},{"saleMerchantName":"杜茜","saleAmount":"10362.5","orderNo":"10","performanceAmount":"146","rentSaleMerchantName":"杜茜","performanceMerchantName":"吧块吧","rentSaleRate":"62%"}]
    };

    $scope.records =commercialDataAll;

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#shop-sale-rank");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.on("click",".commercial-item a[data-href]",function(e){
            e.stopPropagation();
            e.preventDefault();
            var href = $(this).attr("data-href");
            if(href=="all"){
                $scope.$apply(function(){
                    $scope.records = commercialDataAll;
                });
            }else if(href=="repast"){
                $scope.$apply(function(){
                    $scope.records = commercialDataRepast;
                });
            }

            $(this).closest(".commercial-item-list").find("a").removeClass("active");
            $(this).addClass("active");


        });

    }

    /* ======================================== common methods ======================================== */
    function destroy(){}
    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();

}]);



