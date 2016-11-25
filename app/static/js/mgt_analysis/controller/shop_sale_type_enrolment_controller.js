ampApp.controller("shop-sale-type-enrolment-controller",["$scope","$rootScope","$ampDocumentReady",function($scope,$rootScope,$ampDocumentReady){

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("shop-sale-type.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");
    });


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView() {
        container = $("#shop-sale-type-enrolment");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.find(".contract-enrolment").on("webkitAnimationEnd animationend",function(){
            if($(this).hasClass("amp-slide-right-out")){
                container.addClass("amp-display-hide");
                reset();
            }
            $(this).removeClass("amp-slide-right-out");
            $(this).removeClass("amp-slide-left-in");
        });

        container.on("click","a.close-panel-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");
        });


        function retrieveData(){
            var brandName = $(container).find("[data-name=brandName]").val();
            var saleAmount = $(container).find("[data-name=saleAmount]").val();
            var performanceValue = $(container).find("[data-name=performanceValue]").val();
            var rentSaleRate = $(container).find("[data-name=rentSaleRate]").val();


            return {
                brandName:brandName,
                saleAmount:saleAmount,
                performanceValue:performanceValue,
                rentSaleRate:rentSaleRate
            };

        }

        container.on("click","a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            $rootScope.$broadcast("shop-sale-type.save-record",retrieveData());
            $scope.$apply();

            container.find(".contract-enrolment").addClass("amp-slide-right-out");
        });

        container.on("click","a.continue-save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            $rootScope.$broadcast("shop-sale-type.save-record",retrieveData());
            $scope.$apply();
            reset();
        });


    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    function reset(){
        $(container).find("[data-name]").val("");
    }
    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();


}]);
