import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import upload from '../pages/upload'
import filter from '../pages/filter'
import mine from '../pages/mine'
import AddTarget from '../pages/AddTarget'
import SearchTarget from '../pages/SearchTarget'
import check from "../pages/check"
import calcIndex from "../pages/calcIndex"
import makeCalc from "../pages/makeCalc"
import calcResult from "../pages/calcResult"
import calcGroup from "../pages/calcGroup"
import mineSearch from '../components/search-list'
import Fail from '../components/fail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/fail',
      name:'fail',
      component: Fail
    },
    {
      path: '/',
      redirect: '/index',
      meta: {
        keepAlive: false
      }
    }, {
      path: '/index',
      name:'index',
      component: index,
      meta: {
        keepAlive: false
      }
    }, {
      path: '/upload',
      component: upload,
      meta: {
        keepAlive: false
      }
    }, {
      path: '/filter',
      name:'filter',
      component: filter,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/filter/add',
      component: AddTarget,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/filter/search',
      name:'filterSearch',
      component: SearchTarget,
      meta: {
        keepAlive: true
      }
    },{
      path: '/mine',
      component: mine,
      meta: {
        keepAlive: true
      }
    },{
      path: '/mine/search',
      name:'search',
      component: mineSearch,
      meta: {
        keepAlive: true
      }
    },{
      path:'/check',
      name:'check',
      component:check
    },{
      path:'/calcIndex',
      name:'calcIndex',
      component:calcIndex
    },{
      path:'/calcResult',
      name:'calcResult',
      component:calcResult
    },
    {
      path:'/makeCalc',
      name:'makeCalc',
      component:makeCalc
    },
    {
      path:'/calcGroup',
      name:'calcGroup',
      component:calcGroup
    }
  ]
})
