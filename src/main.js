import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource';

import Routers from './router';
import App from './App.vue';
import VueHtml5Editor from 'vue-html5-editor'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);

var options = {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
    // global component name
    name: "vue-html5-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // 配置图片模块
    // config image module
    image: {
        // 后端图片上传的地址，如果为空，默认转图片为base64
        // Url of the server-side,default null and convert image to base64
        server: null,
        // 请求时表单参数名
        // the name for file field in multipart request
        fieldName: "image",
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 是否压缩，默认true，设置为true时会使用localResizeIMG进行压缩
        // default true,if set to true,the image will resize by localResizeIMG (https://github.com/think2011/localResizeIMG)
        compress: true,
        // 图片压缩选项
        // follows are options of localResizeIMG
        width: 1600,
        height: 1600,
        quality: 80,
        // 响应数据处理
        // handle response data，return image url
        uploadHandler(responseText){
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    //default en-us, en-us and zh-cn are built-in
    language: "zh-cn",
    // 自定义语言
    i18n: {
        //specify your language here
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: [],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        "info",
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
};
Vue.use(VueHtml5Editor);

const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

Vue.http.interceptors.push(function(request, next) {

    // modify headers
    request.headers.set('Authorization', 'bearer dGh5QJXn8bSnB2G6UN0QxSLzGWfOKnNkdXuxdWpMeCeuhTn7v7oj6G0sTRsHlv_ZlRE4imbW3d82j5lZ9k2as2twC6SR7KwECuar1CalxroFsZWZwGhsf8XE07-y1zHoZWHceIIq2xO5MJ7iD2NiPf4aFjoAcgLYUT7nCAkkd4P-IGQWyNuw7DDr7e33yTKp5byt4TMWqSyCwj2qNevPU8NApkz0Z6AbkfvF3M2ls3Tmagw3PVkvfoVens0e-gy1BnkYuljJqMHVsoPRn9WwAP7LGhhbM319JxBqJrzX_SCd-Hyl_4eXWJ919StrWzQlDKMKnF76S-Ti-CfJchscXqtIlXPCk2qnFzzidEF3pi4pc2r_BmsuIX_H06D6e9ebp3uxTiNzVkFVBwl6mXwDFzHZl-ukaFw6s2GNHMq3IIy6xraaLDNa4D_Qq8a7gpjMpEQw95ugohuQABf8hWecSr1T6aZesCTbGhP1CEAJd81BRgatma2IKrY4qCkRYlVzi7SwBGZ4aSO5q36KNknIUQ');

    // continue to next interceptor
    next();
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
