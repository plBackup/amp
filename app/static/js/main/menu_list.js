/**
 * Created by user on 2016/10/18.
 */
var menu_list={
    amp_menu:[
        {
            name:"资产包综合报表",
            index:"main-0",
            icon:"ys-icon-asset",
            links:"../sys/amp_asset_noi.html",
            target:"#",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"存量分析",
                    index:"sub-0",
                    links:"../sys/amp_asset_noi.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转
                },
                {
                    name:"开发分析",
                    index:"sub-0",
                    links:"../amp/amp_asset_irr_swiper-finacial.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转
                },
            ]
        },
        {
            name:"财务分析",
            index:"main-1",
            icon:"ys-icon-finacial",
            links:"../amp/amp_financial_index.html",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"收益表",
                    index:"sub-1",
                    links:"../amp/amp_financial_index.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转
                },
                {
                    name:"收入分析",
                    index:"sub-1",
                    links:"../amp/amp_finacial_format_analysis.html",
                    target:"#page-frame",
                    show_sub_menu:true,
                    re_locate:true,//点击一级目录直接跳转
                },
            ]
        },
        {
            name:"风控分析",
            index:"main-2",
            icon:"ys-icon-risk",
            links:"../sys/amp_ctrl_rent_warn.html",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"租赁分析",
                    index:"sub-2",
                    links:"../sys/amp_ctrl_rent_warn.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转

                },
                {
                    name:"运营分析",
                    index:"sub-2",
                    links:"../amp/amp_opt_passenger_flow.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转
                },
            ]
        },
        {
            name:"管理工具",
            index:"main-3",
            icon:"ys-icon-tool",
            links:"../sys/amp_tookit_rentlist.html",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"租金包管理",
                    index:"sub-3",
                    links:"../sys/amp_tookit_rentlist.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转

                },
                {
                    name:"影子模型",
                    index:"sub-3",
                    links:"../sys/amp_floor_fake.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转

                },
                {
                    name:"回报计划",
                    index:"sub-3",
                    links:"../sys/amp_tookit_sim_swiper.html",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转
                }
            ]
        },
        {
            name:"数据工具",
            index:"main-4",
            icon:"ys-icon-data",
            links:"#",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"基础数据",
                    index:"sub-4",
                    links:"#",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转
                },
                {
                    name:"经营数据",
                    index:"sub-4",
                    links:"#",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转

                }
            ]
        }
    ],
};