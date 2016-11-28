ampApp.controller("shop-sale-type-list-controller",["$scope","$ampDocumentReady","$getPaginationResult",function($scope,$ampDocumentReady,$getPaginationResult){
    var allData = {
        // 餐饮
        catering:[{"saleAmount":"10750.9","performanceValue":"597.27222222222224","rentSaleRate":"39%","brandName":"克菲斯"},{"saleAmount":"26924","performanceValue":"1121.8333333333333","rentSaleRate":"40%","brandName":"分子冰激凌"},{"saleAmount":"49136.76","performanceValue":"432.1994898407952","rentSaleRate":"51%","brandName":"大夹子先生"},{"saleAmount":"24933","performanceValue":"1003.743961352657","rentSaleRate":"38%","brandName":"人在茶在茶饮店"},{"saleAmount":"22298.880000000001","performanceValue":"912.01963190184051","rentSaleRate":"44%","brandName":"魔法分子冰淇淋"},{"saleAmount":"3055","performanceValue":"126.2396694214876","rentSaleRate":"256%","brandName":"茂棒"},{"saleAmount":"35913.19","performanceValue":"329.78135904499544","rentSaleRate":"41%","brandName":"下雪的村庄"},{"saleAmount":"14191.4","performanceValue":"457.78709677419351","rentSaleRate":"34%","brandName":"阿姨很芒"},{"saleAmount":"156323","performanceValue":"2233.1857142857143","rentSaleRate":"9%","brandName":"和风铁板烧"}],
        // 配套
        mating:[{"saleAmount":"10187.84","performanceValue":"213.67114093959731","rentSaleRate":"6%","brandName":"青沐美睫"},{"saleAmount":"21310","performanceValue":"259.8780487804878","rentSaleRate":"9%","brandName":"天宝龙凤"},{"saleAmount":"30670","performanceValue":"134","rentSaleRate":"25%","brandName":"ROC ON SKY"},{"saleAmount":"74082","performanceValue":"107","rentSaleRate":"26%","brandName":"芭妮兰"},{"saleAmount":"18607","performanceValue":"138.75466070096942","rentSaleRate":"8%","brandName":"柯莹珠宝"},{"saleAmount":"4320","performanceValue":"198.16513761467888","rentSaleRate":"26%","brandName":"金煜珠宝"},{"saleAmount":"62595.9","performanceValue":"146.8456612006475","rentSaleRate":"30%","brandName":"BOBO宠物空间"},{"saleAmount":"24315.5","performanceValue":"98.14530776992936","rentSaleRate":"21%","brandName":"墨上品"},{"saleAmount":"16432","performanceValue":"186.51532349602726","rentSaleRate":"17%","brandName":"足装秀"},{"saleAmount":"11770.5","performanceValue":"105","rentSaleRate":"28%","brandName":"樱佐"}],
        // 服装
        clothing:[{"saleAmount":"142700.20000000001","performanceValue":"777.40357376334714","rentSaleRate":"0%","brandName":"杰克琼斯"},{"saleAmount":"452991","performanceValue":"748.26310312360624","rentSaleRate":"0%","brandName":"UA"},{"saleAmount":"657620.69999999995","performanceValue":"569.86195840554592","rentSaleRate":"0%","brandName":"U&R"},{"saleAmount":"235534","performanceValue":"1770.9323308270677","rentSaleRate":"0%","brandName":"美丽档案"},{"saleAmount":"151147.9","performanceValue":"946.92331787996488","rentSaleRate":"0%","brandName":"斯莱德"},{"saleAmount":"121438.44","performanceValue":"1175.4761397734972","rentSaleRate":"0%","brandName":"听说"},{"saleAmount":"236929.6","performanceValue":"754.0005728288196","rentSaleRate":"0%","brandName":"MTEE"},{"saleAmount":"408797","performanceValue":"668.64634106447704","rentSaleRate":"0%","brandName":"VERO MODA"},{"saleAmount":"208049","performanceValue":"588.99017637233533","rentSaleRate":"0%","brandName":"江南布衣"}],
        // 儿童
        children:[{"saleAmount":"60120","performanceValue":"333.25942350332593","rentSaleRate":"0%","brandName":"韦哲国际创意中心"},{"saleAmount":"141300","performanceValue":"262.76150627615061","rentSaleRate":"0%","brandName":"象上小学生"},{"saleAmount":"292983","performanceValue":"1803.6382664368382","rentSaleRate":"0%","brandName":"热气球"},{"saleAmount":"23960","performanceValue":"58.988625732433896","rentSaleRate":"0%","brandName":"爱尚英语"},{"saleAmount":"21094","performanceValue":"51.331094563683266","rentSaleRate":"0%","brandName":"咕噜咕噜"},{"saleAmount":"630536","performanceValue":"1132.0215439856374","rentSaleRate":"0%","brandName":"金宝贝"},{"saleAmount":"298941","performanceValue":"549.40270528559881","rentSaleRate":"0%","brandName":"悦宝园"},{"saleAmount":"151115","performanceValue":"644.88115051423199","rentSaleRate":"0%","brandName":"巴拉巴拉"},{"saleAmount":"129420","performanceValue":"274.80040767793446","rentSaleRate":"41%","brandName":"乐乐派"}],
        // 影院
        cinema:[{"saleAmount":"454728","performanceValue":"137.56583664344294","rentSaleRate":"11%","brandName":"百老汇"}]
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

    $scope.result = {};

    resetPaginationInfo();

    function resetPaginationInfo(){
        var selectedType = local_storage.getItem("select_commercial_type_for_sale");

        $scope.commercialType = allType[selectedType];

        $scope.result = $getPaginationResult(allData[selectedType],10);
    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("shop-sale-type.save-record",function(event,params){
        initData.unshift(params);
        resetPaginationInfo();
    });

    $scope.$on("shop-sale-type.enrolment",function(e,data){
        console.log("----------------");
        console.log(e);
    })

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#shop-sale-type-list");
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



