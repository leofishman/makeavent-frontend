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
import Mediahall from '../components/Mediahall.vue'
import Agenda from '../components/Agenda.vue'
import MediaPartnerProfile from '../components/MediaPartnerProfile.vue'
import StartupsDemoDay from '../components/StartupsDemoDay.vue'
import StartupProfile from '../components/StartupProfile.vue'
import DemoDayPitchingBooth from '../components/DemoDayPitchingBooth.vue'

import Profile from '../components/profile/Profile.vue'
import MyInterviews from '../components/profile/MyInterviews.vue'
import MyBusinessCards from '../components/profile/MyBusinessCards.vue'

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
            path: '/:id/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/profile/myinterviews',
            name: 'MyInterviews',
            component: MyInterviews,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/profile/businesscards',
            name: 'MyBusinessCards',
            component: MyBusinessCards,
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
        },
        {
            path: '/:id/mediahall',
            name: "Mediahall",
            component: Mediahall,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/mediahall/:name',
            name: "MediaPartnerProfile",
            component: MediaPartnerProfile,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/startupsdemoday',
            name: "StartupsDemoDay",
            component: StartupsDemoDay,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/startupsdemoday/:name',
            name: "StartupProfile",
            component: StartupProfile,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/ddpb',
            name: "DemoDayPitchingBooth",
            component: DemoDayPitchingBooth,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/agenda',
            name: "Agenda",
            component: Agenda,
            meta: {
                requiresAuth: true,
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
                    window.location.pathname.split("/")[2] != "home" &&
                    window.location.pathname.split("/")[2] != "mediahall" &&
                    window.location.pathname.split("/")[2] != "agenda" &&
                    window.location.pathname.split("/")[2] != "profile" && 
                    window.location.pathname.split("/")[2] != "startupsdemoday" &&
                    window.location.pathname.split("/")[2] != "ddpb"
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
