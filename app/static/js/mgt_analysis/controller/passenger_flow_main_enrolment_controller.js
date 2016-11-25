ampApp.controller("passenger-flow-main-enrolment-controller",["$scope","$ampDocumentReady","$filter",function($scope,$ampDocumentReady,$filter){


    $scope.record={
        year:2016,
        real1:"",
        real2:"",
        real3:"",
        real4:"",
        real5:"",
        real6:"",
        real7:"",
        real8:"",
        real9:"",
        real10:"",
        real11:"",
        real12:"",
        budget1:0,
        budget2:"",
        budget3:"",
        budget4:"",
        budget5:"",
        budget6:"",
        budget7:"",
        budget8:"",
        budget9:"",
        budget10:"",
        budget11:"",
        budget12:""
    };

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#passenger-flow-main-enrolment");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

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



