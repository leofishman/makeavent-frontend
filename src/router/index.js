import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {host, startDate} from '../env'

/**
 * @components
 */
import Home from '../components/Home.vue'
import NoAccess from '../components/NoAccess.vue'
import Company from '../components/Company.vue'
import Password from '../components/Password.vue'
import VipMeetingRoom from '../components/VipMeetingRoom.vue'
import LoginWithTempEmail from '../components/LoginWithTempEmail.vue'
import BusinessCard from '../components/BusinessCard.vue'

Vue.use(Router)

const router = new Router({
    mode: "history",
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/noaccess',
            name: "Noaccess",
            component: NoAccess,
        },
        {
            path: '/:id/company',
            name: "Company",
            component: Company,
            meta: {
                requiresAuth: true,
                platformLaunch: true
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
        },
        {
            path: '/login/businesscard/:id',
            name: "LoginThenBusinessCard",
            component: Password,
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/:id/vip',
            name: "Vip",
            component: VipMeetingRoom,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/loginWithTemporaryEmail',
            name: "LoginWithTempEmail",
            component: LoginWithTempEmail,
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/:id/businesscard',
            name: "BusinessCard",
            component: BusinessCard,
            meta: {
                requiresAuth: false,
                platformLaunch: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    // if (to.meta.platformLaunch && new Date().getTime() < startDate) {
    //     window.location.pathname = '/noaccess'
    // }
    // else {
        if (to.path == "/noaccess") {
            next()
        }
        else if (to.path == "/" && localStorage.auth) {
            axios.get(host + `/login/redirectToHallByjwt`, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                window.location.pathname = res.data + '/home'
            })
            .catch(e => {
                console.log(e)
                localStorage.auth = ""
                window.location = '/login'
            })
        }
        else if (to.path == "/" && !localStorage.auth) {
            window.location.pathname = "/login"
        }
        else if (to.path == "/loginWithTemporaryEmail" && to.query.access) {
            localStorage.auth = ''
            next()
        }
        else if (to.path.split('/')[2] == "businesscard") {
            next()
        }
        else if (!localStorage.auth) {
            if (window.location.pathname.split("/")[1] != "login" && window.location.pathname.split("/")[1] != "noaccess") 
                window.location.pathname = "/login"
            
            else
                next()
        }
        else if (window.location.pathname.split("/")[2] == "home" && to.query.auth == "true") {
            window.location.search = ""
            to.query = {}
            window.location.pathname = `/${window.location.pathname.split("/")[1]}/home`
        }
        else if (!to.fullPath.includes('auth=true') && window.location.pathname.split("/")[1] != "login") {
            axios.get(host + `/login/checkToken?access=${window.location.pathname.split("/")[1]}`, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                if (
                    window.location.pathname.split("/")[1] != "login" &&
                    window.location.pathname.split("/")[1] != "noaccess" &&
                    window.location.pathname.split("/")[2] != "company" && 
                    window.location.pathname.split("/")[2] != "vip" &&
                    window.location.pathname.split("/")[2] != "home"
                ) {
                    window.location.pathname = `/${window.location.pathname.split("/")[1]}/home`
                }
                else  {
                    next()
                }
            })
            .catch(e => {
                localStorage.auth = ""
                window.location = '/login'
            })
        }
        else 
            next()
    // }
})

export default router
