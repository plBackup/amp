ampApp.controller("cost-manual-work-controller",["$scope","$ampDocumentReady",function($scope,$ampDocumentReady){
    $scope.records = null;

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#cost-manual-work");

        if(isPC()){
            pin = $(container).find(".dept-table-head").pin({
                containerSelector: $(container).find(".cost-manual-work-pin-wrapper"),
                padding: {top: 44, bottom: 50}
            });
        }


    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click", "a.collapse-btn", function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).toggleClass("collapsed");
            $(this).closest("table").find(".sub-record").toggleClass("amp-display-hide");

            if(isPC()){
                pin.refresh();
            }


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



