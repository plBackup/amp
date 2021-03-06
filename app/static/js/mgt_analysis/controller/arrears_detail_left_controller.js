ampApp.controller("arrears-detail-left-controller",["$scope","$rootScope","$ampDocumentReady",function($scope,$rootScope,$ampDocumentReady){

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#arrears-detail-left");

        amp_main.leftPanel_update();
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.enrolment-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            //mgt_analysis.arrears_enrolment_ins.show();
            $rootScope.$broadcast("arrears-detail.enrolment");
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
