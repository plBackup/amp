ampApp.controller("arrears-merchant-detail-controller",["$scope","$ampDocumentReady","$getPaginationResult","$filter","$rootScope",function($scope,$ampDocumentReady,$getPaginationResult,$filter,$rootScope){
    var initData = [{"arrearsType":"租金","arrearsDayCount":"62","arrearsAmount":"5477.85"},{"arrearsType":"物管","arrearsDayCount":"47","arrearsAmount":"1983.15"},{"arrearsType":"其他","arrearsDayCount":"0","arrearsAmount":"0"}];

    var filteredData = initData;

    $scope.result = {};

    resetPaginationInfo();

    function resetPaginationInfo(){
        $scope.result = $getPaginationResult(filteredData,10);

    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("arrears-merchant-detail.query",function(event,params){
        filteredData = $filter("filter")(initData,params);

        resetPaginationInfo();

        $scope.$apply();
    });

    $scope.$on("arrears-merchant-detail.received",function(event,params){
        var arrearsTypes = [];
        container.find(".amp-checkbox.checked").each(function(){
            var arrearsType = $(this).next().html();
            arrearsTypes.push(arrearsType);
        });

        initData = initData.filter(function(item){
            for(var i=0;i<arrearsTypes.length;i++){
                if(item.arrearsType==arrearsTypes[i]){
                    return false;
                }
            }
            return true;
        });

        filteredData = $filter("filter")(initData,params);

        resetPaginationInfo();

        $scope.$apply();
    });


    /* ======================================== 初始化页面 ======================================== */
    var container = null;

    function initPageView(){
        container = $("#arrears-merchant-detail");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".amp-checkbox",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).toggleClass("checked");

            var selectedRecords = [];
            container.find(".amp-checkbox.checked").each(function(){
                var arrearsType = $(this).next().html();
                var arrearsAmount = parseFloat($(this).parent().next().attr("data-value"));
                selectedRecords.push({arrearsType:arrearsType,arrearsAmount:arrearsAmount});
            });
            $rootScope.$broadcast("arrears-merchant-detail.select",selectedRecords);
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



