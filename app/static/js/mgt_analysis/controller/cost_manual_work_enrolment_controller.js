ampApp.controller("cost-manual-work-enrolment-controller",["$scope","$ampDocumentReady",function($scope,$ampDocumentReady){
    $scope.records = null;

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("cost-manual-work.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");
    });


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#cost-manual-work-enrolment");


    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.find(".contract-enrolment").on("webkitAnimationEnd animationend",function(){
            if($(this).hasClass("amp-slide-right-out")){
                container.addClass("amp-display-hide");
            }
            $(this).removeClass("amp-slide-right-out");
            $(this).removeClass("amp-slide-left-in");
        });

        container.on("click","a.close-panel-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);



