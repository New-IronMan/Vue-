import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//引入登陆页面
import login from '../components/pages/login.vue'
//引入首页
import home from '../components/pages/home.vue'
//管理员管理组件
import controller from '../components/pages/controller.vue'
//管理员新建组件
import newjian from '../components/pages/new.vue'
//用户管理组件
import user from '../components/pages/user.vue'
//用户新建组件
import newadmin from '../components/pages/newadmin.vue'
//通知组件
import inform from '../components/pages/inform.vue'
//新建通知组件
import newnotice from '../components/pages/newnotice.vue'
//设备组件
import equipment from '../components/pages/equipment.vue'
//新建设备组件
import newequipment from '../components/pages/newequipment.vue'

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'controller',
          component: controller
        },
        {
          path: 'new/:id',
          component: newjian
        },
        {
          path: 'user',
          component: user
        },
        {
          path: 'newadmin/:id',
          component: newadmin
        },
        {
          path: 'inform',
          component: inform
        },
        {
          path: 'newnotice/:id',
          component: newnotice
        },
        {
          path:'equipment',
          component:equipment
        },
        {
          path:'newequipment/:id',
          component:newequipment
        },
        {
          path:'',
          redirect:'controller'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
