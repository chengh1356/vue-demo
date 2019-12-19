import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/views/login/login'
import HomeView from '@/views/HomePage'

Vue.use(Router)


let constRouter = [{
    path: '/login',
    name: '登录页',
    component: LoginView
}, {
    path: '/',
    name: '首页',
    component: HomeView
}]
let router = new Router({
    routes: constRouter
});

export default router