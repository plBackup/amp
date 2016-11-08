/**
 * Created by limeiting on 16/11/8.
 */

var noi_head_swiper = new Swiper('#noi-main-table-head', {
    //scrollbar: '.swiper-scrollbar',
    direction: 'horizontal',
    slidesPerView: 'auto',
    //mousewheelControl: true,
    freeMode: true,
    scrollbarHide:true
});
var noi_main_swiper = new Swiper('#noi-main-table', {
    scrollbar: '.swiper-scrollbar',
    direction: 'horizontal',
    slidesPerView: 'auto',
    //mousewheelControl: true,
    freeMode: true,
    scrollbarHide:false
});
noi_head_swiper.params.control = noi_main_swiper;
noi_main_swiper.params.control = noi_head_swiper;

var pin=$(".ys-table-fixed-top").pin({
    containerSelector: "#noi-main-table-wrapper",
    padding: {top: 44, bottom: 50}
});


$(".ys-table-main").on("mouseenter","tr",function(e){
    var index=$(this).index();
    var parentTagName=$(this).parent().get(0).tagName;
    $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
        $(this).find("tr").eq(index).addClass("hover");
    });
});

$(".ys-table-main").on("mouseleave","tr",function(e){
    var index=$(this).index();
    var parentTagName=$(this).parent().get(0).tagName;
    $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
        $(this).find("tr").eq(index).removeClass("hover");
    });

});

$(".ys-table-main").on("click","tbody>tr",function(e){
    if($(this).hasClass("tr-main")){
        var index=$(this).index();
        $(this).closest(".ys-table-main").find(".amp-table").each(function(i,e){
            var $trMain=$(this).find("tr").eq(index);
            $trMain.toggleClass("tr-collapse");
            if($trMain.hasClass("tr-collapse")){
                $trMain.nextUntil(".tr-main","tr").addClass("tr-collapsed");

            }else{
                //展开时，要判断 tr-sub-main的状态，来更改tr-tri的折叠状态
                $trMain.nextUntil(".tr-main","tr.tr-sub").removeClass("tr-collapsed");
                var sub_main_collapse= false;
                $trMain.nextUntil(".tr-main","tr.tr-tri").each(function(i,e){
                    if(i==0){

                        sub_main_collapse=$(this).prev(".tr-sub-main").hasClass("tr-collapse");
                    }

                    if(!sub_main_collapse){
                        $(this).removeClass("tr-collapsed");
                    }
                });
            }
        });
        pin.refresh();
    }

    if($(this).hasClass("tr-sub-main")){
        var index=$(this).index();
        $(this).closest(".ys-table-main").find(".amp-table").each(function(i,e){
            $(this).find("tr").eq(index).toggleClass("tr-collapse").nextUntil(".tr-sub").toggleClass("tr-collapsed");
        });
    }
});

$("#noi-arrearage").on("click","tr.tr-main",function(e){
    $(this).toggleClass("tr-collapse").nextAll("tr.tr-sub").toggle();
});
var defer=null;

$(window).resize(function(){
    if(!defer){

        defer=setTimeout(function(){
            swiperUpdate();
            defer=null;
        },200);
    }else{
        clearTimeout(defer);
        defer=setTimeout(function(){
            swiperUpdate();
            defer=null;
        },200);
    }

});

var swiperUpdate=function(){
    noi_head_swiper.update();
    noi_main_swiper.update();
    pin.refresh();
};

//初始化折叠项目
$(".tr-init-collapse").trigger("click");