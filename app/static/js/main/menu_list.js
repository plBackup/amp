/**
 * Created by user on 2016/10/18.
 */
var menu_list={
    amp_menu:[
        {
            name:"存量分析",
            index:"main-0",
            icon:"ys-icon-asset",
            links:"noi",
            target:"#",
            show_sub_menu:false,
            re_locate:false,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"实际",
                    index:"sub-0",
                    links:"noi",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转
                }

            ]
        },
        {
            name:"投资分析",
            index:"main-1",
            icon:"ys-icon-finacial",
            links:"simulation_calculation_main",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"模拟测算",
                    index:"sub-1",
                    links:"../amp/amp_financial_index.html",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转
                }
            ]
        },
        {
            name:"管理分析",
            index:"main-2",
            icon:"ys-icon-risk",
            links:"contract_main",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"收入分析",
                    index:"sub-1",
                    links:"contract_main",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转
                },
                {
                    name:"支出分析",
                    index:"sub-2",
                    links:"cost_main",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转
                },
                {
                    name:"租赁分析",
                    index:"sub-3",
                    links:"rent_main",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转
                },
                {
                    name:"运营分析",
                    index:"sub-4",
                    links:"passenger_flow_main",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转
                },
            ]
        },
        {
            name:"风控分析",
            index:"main-3",
            icon:"ys-icon-tool",
            links:"blank",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:true,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"租赁分析",
                    index:"sub-3",
                    links:"blank",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转

                },
                {
                    name:"运营分析",
                    index:"sub-3",
                    links:"blank",
                    target:"#page-frame",
                    re_locate:true,//点击一级目录直接跳转

                },
            ]
        },
        {
            name:"数据工具",
            index:"main-4",
            icon:"ys-icon-data",
            links:"rpgindex",
            target:"#page-frame",
            show_sub_menu:false,
            re_locate:false,//点击一级目录直接跳转
            sub_menu:[
                {
                    name:"租金包",
                    index:"sub-4",
                    links:"rpgindex",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转
                },
                {
                    name:"影子模型",
                    index:"sub-4",
                    links:"datasim",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转

                },
                {
                    name:"回报计划",
                    index:"sub-4",
                    links:"irrplan",
                    target:"#page-frame",
                    re_locate:true//点击一级目录直接跳转

                }
            ]
        }
    ]
};