// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BackToTop from "./components/BackToTop.vue";
// import update from "./components/update.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import HomeUnderline from "./components/HomeUnderline.vue"


 // 进度条组件
import { inBrowser } from 'vitepress'
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'

import './style/var.css'
import './style/blockquote.css'
import './style/blur.css'
import './style/hidden.css'
import './style/vp-code.css'
import './style/vp-code-group.css'
import './style/sidebarIcon.css'


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 指定组件使用doc-footer-before插槽
      'doc-footer-before': () => h(BackToTop),
    })
  },
  enhanceApp({ app, router, siteData }) {

    // 注册全局组件
    // app.component('update' , update)
    app.component('ArticleMetadata' , ArticleMetadata)
    app.component('HomeUnderline' , HomeUnderline)


    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        // 开始进度条
        NProgress.start() 
      }
      router.onAfterRouteChange = () => {
        // 停止进度条
         NProgress.done() 
       }
    }
    
  }
}