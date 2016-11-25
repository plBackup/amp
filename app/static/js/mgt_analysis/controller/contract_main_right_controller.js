ampApp.controller("contract-main-right-controller",["$scope","$rootScope","$ampDocumentReady",function($scope,$rootScope,$ampDocumentReady){

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("contract-main.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView() {
        container = $("#contract-main-right");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        $(container).find(".amp-datetimepicker input").datetimepicker({
            language: "zh-CN",
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            weekStart: 1,
            todayHighlight: 1,
            autoclose: 1,
            forceParse: 0
        });

        $(container).find(".amp-datetimepicker").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".amp-datetimepicker").find("input").datetimepicker("show");
        });

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

        container.on("click","a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var record = {};
            container.find("[data-name]").each(function(){
                var name = $(this).attr("data-name");
                var value = $(this).val();
                record[name]=value;
            });

            $rootScope.$broadcast("contract-main.save-record",record);
            $scope.$apply();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");
        });

        container.on("click","a.continue-save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var record = {};
            container.find("[data-name]").each(function(){
                var name = $(this).attr("data-name");
                var value = $(this).val();
                record[name]=value;
            });

            $rootScope.$broadcast("contract-main.save-record",record);
            $scope.$apply();
            reset();
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
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
