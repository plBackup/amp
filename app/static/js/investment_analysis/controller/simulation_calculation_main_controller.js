ampApp.controller("simulation-calculation-main-controller",["$scope","$ampDocumentReady","$getPaginationResult",function($scope,$ampDocumentReady,$getPaginationResult){

    $scope.records = [
        {
            caseName:"方案1",
            irrPercent:"11%",
            netPresentValue:"106874.05",
            appreciation:"10591.12",
            purchasingPrice:"96282.93",
            loan:"48141.46",
            yearCount:"10"
        },
        {
            caseName:"方案2",
            irrPercent:"9.61%",
            netPresentValue:"113073.98",
            appreciation:"9913.70",
            purchasingPrice:"103160.28",
            loan:"51580.14",
            yearCount:"10"
        }
    ];

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});






    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#simulation-calculation-main");

        $(container).find(".ys-tips").tooltip();

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".case-content",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.open("../investment_analysis/simulation_calculation.html");
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



