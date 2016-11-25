ampApp.controller("arrears-main-controller",["$scope","$ampDocumentReady",function($scope,$ampDocumentReady){
    $scope.records = [{"dateItem3":"31","dateItem4":"4","dateItem1":"5","itemName":"租金","dateItem2":"42","merchantCount":"37","totalAccount":"82"},{"dateItem3":"35","dateItem4":"1","dateItem1":"10","itemName":"物业管理费","dateItem2":"53","merchantCount":"11","totalAccount":"99"},{"dateItem3":"0","dateItem4":"0","dateItem1":"0","itemName":"其他","dateItem2":"0","merchantCount":"0","totalAccount":"0"},{"dateItem3":"66","dateItem4":"5","dateItem1":"15","itemName":"合计","dateItem2":"95","merchantCount":"48","totalAccount":"181"}];

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#arrears-main");
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



