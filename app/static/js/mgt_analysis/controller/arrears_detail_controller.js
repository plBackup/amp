ampApp.controller("arrears-detail-controller",["$scope","$ampDocumentReady","$getPaginationResult",function($scope,$ampDocumentReady,$getPaginationResult){
    var initData = [{"dateItem3":"5812.12","dateItem4":"5593.27","dateItem1":"6235.43","dateItem2":"6123.12","crashStoreRate":"10%","deposit":"40105","contractLeaveMonth":"61","depositRate":"149%","merchantName":"爱学习","arrearsTotalAmount":"26856.23","rentAmount":"23763.94"},{"dateItem3":"42763","dateItem4":"12828.9","dateItem1":"37531.43","dateItem2":"27531.21","crashStoreRate":"9%","deposit":"54684","contractLeaveMonth":"27","depositRate":"45%","merchantName":"NAPOLI火炸披萨","arrearsTotalAmount":"120654.54","rentAmount":"120654.54"},{"dateItem3":"23839.200000000001","dateItem4":"7390.15","dateItem1":"24633.84","dateItem2":"24633.84","crashStoreRate":"8%","deposit":"59030.4","contractLeaveMonth":"61","depositRate":"73%","merchantName":"德味家","arrearsTotalAmount":"80497.03","rentAmount":"80497.03"},{"dateItem3":"25080","dateItem4":"7524","dateItem1":"9871.43","dateItem2":"12432.01","crashStoreRate":"3%","deposit":"14400","contractLeaveMonth":"23","depositRate":"26%","merchantName":"观视界","arrearsTotalAmount":"54907.44","rentAmount":"54907.44"},{"dateItem3":"2824.31","dateItem4":"-","dateItem1":"7123.12","dateItem2":"9414.36","crashStoreRate":"5%","deposit":"18828.72","contractLeaveMonth":"23","depositRate":"97%","merchantName":"人在茶在茶饮店","arrearsTotalAmount":"19361.79","rentAmount":"19361.79"},{"dateItem3":"1512","dateItem4":"-","dateItem1":"10619.28","dateItem2":"5040","crashStoreRate":"4%","deposit":"10080","contractLeaveMonth":"27","depositRate":"59%","merchantName":"鲜之恋情榨汁","arrearsTotalAmount":"17171.28","rentAmount":"17171.28"},{"dateItem3":"-","dateItem4":"-","dateItem1":"7040","dateItem2":"2112","crashStoreRate":"2%","deposit":"14696","contractLeaveMonth":"27","depositRate":"161%","merchantName":"香港十三座","arrearsTotalAmount":"9152","rentAmount":"9152"},{"dateItem3":"-","dateItem4":"-","dateItem1":"32060.16","dateItem2":"9618.0499999999993","crashStoreRate":"2%","deposit":"67584","contractLeaveMonth":"61","depositRate":"162%","merchantName":"越打星","arrearsTotalAmount":"41678.21","rentAmount":"41678.21"},{"dateItem3":"-","dateItem4":"-","dateItem1":"8296.32","dateItem2":"-","crashStoreRate":"2%","deposit":"11520","contractLeaveMonth":"23","depositRate":"139%","merchantName":"质馆","arrearsTotalAmount":"8296.32","rentAmount":"8296.32"},{"dateItem3":"-","dateItem4":"-","dateItem1":"18,166.75","dateItem2":"-","crashStoreRate":"2%","deposit":"26196","contractLeaveMonth":"27","depositRate":"144%","merchantName":"ABS","arrearsTotalAmount":"18,166.75","rentAmount":"18,166.75"}];

    $scope.result = {};

    resetPaginationInfo();

    function resetPaginationInfo(){

        $scope.result = $getPaginationResult(initData,10);
    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("arrears-detail.save-record",function(event,params){
        initData.unshift(params);

        resetPaginationInfo();
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#arrears-detail");

        if(isPC()){
            pin = $(container).find(".amp-thead").pin({
                containerSelector: $(container).find(".amp-collapse-table"),
                padding: {top: 44, bottom: 50}
            });
        }
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".amp-table-row-content",function(e){
            e.stopPropagation();
            e.preventDefault();

            window.location = "#/arrears_merchant_detail";
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



