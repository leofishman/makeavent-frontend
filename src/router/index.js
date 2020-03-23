import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {host, socket} from '../env'

/**
 * @components
 */
import Home from '../components/Home.vue'
import NoAccess from '../components/NoAccess.vue'
import Company from '../components/Company.vue'
import Password from '../components/Password.vue'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:id/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/noaccess',
            name: "Noaccess",
            component: NoAccess,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:id/company',
            name: "Company",
            component: Company,
            meta: {
                requiresAuth: true
            },
            props: (route) => ({ name: route.query.name })
        },
        {
            path: '/login',
            name: "Password",
            component: Password,
            meta: {
                requiresAuth: false
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !to.fullPath.includes('auth=true')) {
        axios.get(host + `/login/checkToken?access=${window.location.hash.split("#/")[1].split("/")[0]}`, {
            headers: {
                authorization: localStorage.auth
            }
        })
        .then(res => {
            next()
        })
        .catch(e => {
            window.location = '/#/login'
        })
    }
    else 
        next()
})

export default router
