ampApp.controller("business-merchant-list-controller",["$scope","$ampDocumentReady","$filter",function($scope,$ampDocumentReady,$filter){
    var allData = {
        // 餐饮
        catering:[{"curMonthAmount":"29403","storeNo":"S1-1F-006","curYearAmount":"29403","brandName":"下雪的村庄"},{"curMonthAmount":"40180","storeNo":"S1-1F-007","curYearAmount":"40180","brandName":"巴黎贝甜"},{"curMonthAmount":"26274","storeNo":"S1-1F-008","curYearAmount":"26274","brandName":"gotchurros"},{"curMonthAmount":"21600","storeNo":"S1-1F-013","curYearAmount":"21600","brandName":"分子冰激凌"},{"curMonthAmount":"33825.18","storeNo":"S1-1F-016","curYearAmount":"33825.18","brandName":"爱茜茜里"},{"curMonthAmount":"0","storeNo":"S1-1F-017,S1-2F-015","curYearAmount":"0","brandName":"星巴克"},{"curMonthAmount":"11743.2","storeNo":"S1-1F-018","curYearAmount":"11743.2","brandName":"乐堂私房茶"},{"curMonthAmount":"88340","storeNo":"S1-1F-019a/020b","curYearAmount":"88340","brandName":"龙蒸虎豆"},{"curMonthAmount":"163890","storeNo":"S1-1F-019b,S1-2F-016","curYearAmount":"163890","brandName":"巴实火锅"},{"curMonthAmount":"118367.7","storeNo":"S1-1F-020a,S1-1F-021","curYearAmount":"118367.7","brandName":"川掌门"}],
        // 配套
        mating:[{"curMonthAmount":"21347.33","storeNo":"B1-12,B1-14","curYearAmount":"21347.33","brandName":"天宝龙凤"},{"curMonthAmount":"5435.47","storeNo":"B1-230,B1-231","curYearAmount":"5435.47","brandName":"金煜珠宝"},{"curMonthAmount":"52027.5","storeNo":"T1-58,T1-60,T1-62,T1-64,T1-66","curYearAmount":"88446.75","brandName":"墨上品"},{"curMonthAmount":"20086.8","storeNo":"B1-227,B1-228,B1-30,B1-32","curYearAmount":"34147.56","brandName":"足装秀"},{"curMonthAmount":"3260.4","storeNo":"B1-226","curYearAmount":"3260.4","brandName":"樱佐"},{"curMonthAmount":"12907.55","storeNo":"S4a-3F-001","curYearAmount":"21942.83","brandName":"爱学习"},{"curMonthAmount":"11934","storeNo":"B1-194,B1-195","curYearAmount":"20287.8","brandName":"六六顺"},{"curMonthAmount":"4420","storeNo":"B1-229","curYearAmount":"7514","brandName":"名表维修"},{"curMonthAmount":"6480","storeNo":"S3-2F-003","curYearAmount":"11016","brandName":"Zippo"},{"curMonthAmount":"21849.67","storeNo":"B1-16,B1-18","curYearAmount":"21849.67","brandName":"老鳯祥黄金"}],
        // 服装
        clothing:[{"curMonthAmount":"0","storeNo":"S2-2F-002b-1","curYearAmount":"0","brandName":"海天空"},{"curMonthAmount":"0","storeNo":"S4a-2F-006-2/007b-2","curYearAmount":"0","brandName":"杰克琼斯"},{"curMonthAmount":"0","storeNo":"S5-2F-004,S5-1F-003","curYearAmount":"0","brandName":"UA"},{"curMonthAmount":"0","storeNo":"B1-50,B1-52,B1-54,B1-56,B1-66","curYearAmount":"0","brandName":"美丽档案"},{"curMonthAmount":"0","storeNo":"S4b-2F-006","curYearAmount":"0","brandName":"斯莱德"},{"curMonthAmount":"0","storeNo":"S2-2F-002a-1","curYearAmount":"0","brandName":"听说"},{"curMonthAmount":"0","storeNo":"S4a-1F-006,S4a-1F-007,S4a-1F-008","curYearAmount":"0","brandName":"MTEE"},{"curMonthAmount":"0","storeNo":"S4b-1F-007a,S4b-1F-008d,S4b-1F-007b-1,S4b-2F-008","curYearAmount":"0","brandName":"VERO MODA"},{"curMonthAmount":"0","storeNo":"S4b-1F-006,S4b-1F-007c,S4b-1F-007b-2","curYearAmount":"0","brandName":"江南布衣"}],
        // 儿童
        children:[{"curMonthAmount":"14750","storeNo":"S2-3F-002-1","curYearAmount":"25075","brandName":"江博士"},{"curMonthAmount":"0","storeNo":"S2-3F-005,S2-3F-003-1","curYearAmount":"0","brandName":"韦哲国际创意中心"},{"curMonthAmount":"0","storeNo":"T4-391,T4-393,T4-201,T4-202,T4-203,T4-204,T4-205,T4-206","curYearAmount":"0","brandName":"象上小学生"},{"curMonthAmount":"0","storeNo":"S1-4F-003,S1-4F-005a","curYearAmount":"0","brandName":"热气球"},{"curMonthAmount":"0","storeNo":"S3-3F-003a,S3-3F-003b","curYearAmount":"0","brandName":"爱尚英语"},{"curMonthAmount":"0","storeNo":"S4a-3F-005a","curYearAmount":"0","brandName":"咕噜咕噜"},{"curMonthAmount":"0","storeNo":"S4a-3F-002-2,S4a-3F-003","curYearAmount":"0","brandName":"金宝贝"},{"curMonthAmount":"0","storeNo":"T3-12,T3-14,T3-417,T3-419,T3-421,T3-423,T3-425,T3-427,T3-429","curYearAmount":"0","brandName":"悦宝园"},{"curMonthAmount":"0","storeNo":"S5-3F-003","curYearAmount":"0","brandName":"巴拉巴拉"},{"curMonthAmount":"53532.45","storeNo":"S3-3F-001a/001b","curYearAmount":"53532.45","brandName":"乐乐派"}],
        // 影院
        cinema:[{"curMonthAmount":"50000","storeNo":"S1-4F-005b S1-4F-006","curYearAmount":"50000","brandName":"百老汇"}]
    };
    var allType = {
        // 餐饮
        catering:"餐饮",
        // 配套
        mating:"配套",
        // 服装
        clothing:"服装",
        // 儿童
        children:"儿童",
        // 影院
        cinema:"影院"
    };

    var selectedType = local_storage.getItem("select_commercial_type");

    $scope.records = allData[selectedType];
    $scope.commercialType = allType[selectedType];

    var queryParams = {brandName:"",storeNo:""};

    $scope.filteredRecords = $filter("filter")($scope.records,queryParams);

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("business-merchant-list.search",function(event,params){
        queryParams = params;
        $scope.filteredRecords = $filter("filter")($scope.records,queryParams);
        $scope.$apply();
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#business-merchant-list");

        if(isPC()){
            $(container).find(".amp-thead").pin({
                containerSelector: $(container).find(".amp-collapse-table"),
                padding: {top: 44, bottom: 50}
            });
        }

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click", "ul.amp-table-row-content", function (e) {
            e.stopPropagation();
            e.preventDefault();

            var merchantName = $(this).find("li:first-child").html();
            local_storage.setItem("selected_merchant_name",merchantName);

            window.location="#/business_merchant_detail";
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



