ampApp.controller("arrears-enrolment-controller",["$scope","$rootScope","$ampDocumentReady",function($scope,$rootScope,$ampDocumentReady){

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("arrears-detail.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView() {
        container = $("#arrears-enrolment");
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

        function retrieveData(){
            var merchantName = $(container).find("[data-name=merchantName]").val();
            var receivableDate = $(container).find("[data-name=receivableDate]").val();
            var arrearsTotalAmount = $(container).find("[data-name=arrearsTotalAmount]").val();
            var arrearsType = $(container).find("[data-name=arrearsType]").val();

            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth()+1;

            var receivableYear = parseInt(receivableDate.split("-")[0]);
            var receivableMonth = parseInt(receivableDate.split("-")[1]);

            var contractLeaveMonth = (receivableYear-currentYear)*12+receivableMonth-currentMonth;
            if(contractLeaveMonth<0){
                contractLeaveMonth = 0;
            }
            if(isNaN(contractLeaveMonth)){contractLeaveMonth="-";}
            return {
                merchantName: merchantName,
                arrearsTotalAmount: arrearsTotalAmount,
                deposit:"-",
                depositRate:"-",
                crashStoreRate:"-",
                dateItem1:"-",
                dateItem2:"-",
                dateItem3:"-",
                dateItem4:"-",
                rentAmount:"-",
                contractLeaveMonth: contractLeaveMonth
            };

        }

        container.on("click","a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            $rootScope.$broadcast("arrears-detail.save-record",retrieveData());
            $scope.$apply();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");
        });

        container.on("click","a.continue-save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            $rootScope.$broadcast("arrears-detail.save-record",retrieveData());
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
