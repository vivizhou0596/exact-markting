#precise-marketing

###运行

* 纯前端服务: `npm run dev`
* 带 mock 后端API的前端开发服务：`npm run start`
* 编译打包：`npm run build`

###项目入口

src/main.js

###项目结构

├─build            webpack打包配置文件夹
├─config
├─dist             打包输出文件夹
├─docs             各类文档
├─mock             mock 服务器
│  └─routes        mock route信息
├─src              源代码
│  ├─api           控制API信息交换的中间函数
│  ├─assets        静态资源
│  │  ├─css
│  │  └─imgs
│  ├─common
│  │  ├─css
│  │  ├─img
│  │  └─js
│  ├─components    组件
│  │  └─base       通用子组件
│  ├─pages         页面
│  │  └─mock       临时的mock数据，可以删除
│  ├─router        vue-router信息配置
│  └─store         vuex配置
└─static           第三方静态资源

###项目搭建思路

以`src/main.js`为入口，引入vue以及相关组件、通用样式，渲染`src/App.vue`。`App.vue`为一个vue-router的视窗，同时根据路由配置决定路由下的组件是否在内存中进行缓存，如若路由的meta.keepAlive为true则缓存，否则不缓存。
vuex对应的store用于跨页面存储应用的状态，目前存储了指标新增/修改页面的数据：所有指标、我关注的指标、我勾选的指标，以及一些其它计算数据。

###filter页面说明

1.创造 Range 组件，本组件用于滑动控制指标值范围，接受最小值和最大值；
2.创造单选组件和多选组件以及范围选择这三个简单组件，组件接受参数为点击取消的回调函数和指标项；
3.在vuex中配置各种关于所有指标、可选指标、我勾选的指标的mutation，之后创建store，并连接到vue中；
4.根据store中的数据渲染页面，并将mutation映射到filter页面中作为methods，通过这种方法实现对store的变异，实现应用状态的更新。

###vuex生成store说明

`mutation-types.js`中是所有mutation的类型，`targetMutations.js`是关于指标的mutation构造，`index.js`合并vuex需要的所有部分变为单一的store。