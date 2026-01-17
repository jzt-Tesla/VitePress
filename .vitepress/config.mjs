import {defineConfig} from 'vitepress'
import Sidebar from "vitepress-plugin-sidebar-resolve";
import {createRewrites} from "vitepress-plugin-permalink";


// 参考文档：https://vitepress.dev/reference/site-config
export default defineConfig({
    //语言，可选 en-US
    lang: 'zh-CN',

    // 站点标题
    title: "我的笔记",

    // 站点描述
    description: "Some documents",

    // 基础路径配置，对于自定义域名设置为根路径
    base: "/",

    // 开发服务器配置
    server: {
        host: '0.0.0.0', // 监听所有网络接口
        port: 5173       // 明确指定端口（可选，但推荐）
    },

    // 永久连接
    rewrites: createRewrites(),

    // Vite 配置
    vite: {
        // Vite 服务器配置
        server: {
            // 允许的域名列表，包括自定义域名
            allowedHosts: ['ss.hejinyo.cn']
        },

        // 静态资源目录配置
        publicDir: 'public',

        plugins: [
            // 自动目录插件
            Sidebar({
                // https://github.com/Kele-Bingtang/vitepress-theme-teek/tree/main/plugins/vitepress-plugin-sidebar-resolve
                // 必须保留这个，否则目录结构会消失
                // resolveRule: "filePath",
                resolveRule: "rewrites",
                titleFormMd: true,
                debug: true,
                collapsed: true
            })
        ],

    },

    // 文档右下角更新时间，首次的配置不会立即生效，需git提交后爬取时间戳
    lastUpdated: true,

    // markdown配置
    markdown: {
        
        // 组件插入h1标题下
        config: (md) => {
            md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
                let htmlResult = slf.renderToken(tokens, idx, options);
                if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
                return htmlResult;
            }
        }
    },

    // 主题配置
    themeConfig: {

        //上次更新时间
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                // 可选值full、long、medium、short
                dateStyle: 'short',
                timeStyle: 'medium'
            },
        },

        // 全局关闭右侧大纲
        // aside: false,

        // 网站 Logo
        logo: '/logo.png',

        // 标题隐藏
        siteTitle: false,

        // 导航栏配置 参考文档：https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '主页', link: '/'},
            {text: '笔记', link: '/page/preface'},
            {text: 'Luca', link: 'https://github.com/jzt-Tesla', noIcon: true},
        ],

        // 手动配置的侧边栏（当前被注释掉）
        // sidebar: [
        //   {
        //     text: '介绍',
        //     collapsed: false,
        //     items: [
        //       { text: '前言', link: '/page/preface' },
        //     ],
        //   },
        //   {
        //     text: 'java',
        //     collapsed: false,
        //     items: [
        //       { text: '多线程-单例模式', link: '/page/learn/java/multithreading' },
        //       { text: '类加载过程', link: '/page/learn/java/classLoadingProcess' },
        //       { text: '多JDK环境', link: '/page/learn/java/multiJdk' },
        //     ],
        //   },
        // ],

        // 社交媒体链接配置
        socialLinks: [
            // {
            //     icon: 'github',
            //     link: 'https://github.com/Luca/'
            // },
            // { icon: 'github', link: 'https://github.com/Luca/' }
        ],

        // 站点地图配置 参考文档：https://vitepress.dev/reference/site-config#sitemap
        sitemap: {
            hostname: 'https://github.com/jzt-Tesla',
        },

        // 编辑本页
        editLink: {
            pattern: 'https://github.com/jzt-Tesla/VitePress/blob/main/:path',
            text: '编辑'
        },

        // 手机端深浅模式文字修改
        darkModeSwitchLabel: '深浅模式',

        // 侧边栏文字更改(移动端)
        sidebarMenuLabel: '目录',

        // 返回顶部文字修改
        returnToTopLabel: '返回顶部',

        // 自定义上下页名
        docFooter: {
            prev: '上页',
            next: '下页',
        },

        outline: {
            // 右侧页面导航栏文字修改
            label: '页面导航',
            // 大纲显示2-3级标题
            level: [2, 3]
        },

        // // 页脚配置
        // footer: {
        //   message: 'Released under the MIT License.',
        //   copyright: 'Copyright © 2025-2026 Luca',
        // },

        // Algolia搜索
        search: {
            provider: 'algolia',
            options: {
                appId: 'LKWXVW2HV9',
                apiKey: '2a0b483f5148d629b7948f90576163da',
                indexName: 'doc',
                // 重点：在这里添加中文翻译
                placeholder: '搜索',
                translations: {
                    button: {
                        buttonText: '搜索',
                        buttonAriaLabel: '搜索'
                    },
                    modal: {
                        searchBox: {
                            resetButtonTitle: '清除查询条件',
                            resetButtonAriaLabel: '清除查询条件',
                            cancelButtonText: '取消',
                            cancelButtonAriaLabel: '取消'
                        },
                        startScreen: {
                            recentSearchesTitle: '搜索历史',
                            noRecentSearchesText: '没有搜索历史',
                            saveRecentSearchButtonTitle: '保存至搜索历史',
                            removeRecentSearchButtonTitle: '从搜索历史中移除',
                            favoriteSearchesTitle: '收藏',
                            removeFavoriteSearchButtonTitle: '从收藏中移除'
                        },
                        errorScreen: {
                            titleText: '无法获取结果',
                            helpText: '你可能需要检查网络连接'
                        },
                        footer: {
                            selectText: '选择',
                            navigateText: '切换',
                            closeText: '关闭',
                            searchByText: ''
                        },
                        noResultsScreen: {
                            noResultsText: '无法找到相关结果',
                            suggestedQueryText: '你可以尝试查询',
                            reportMissingResultsText: '你认为该查询应该有结果？',
                            reportMissingResultsLinkText: '点击反馈'
                        }
                    }
                }
            },
        },
    }
})
