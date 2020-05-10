import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {host, startDate} from '../env'

/**
 * @components
 */
import Home from '@/components/Home.vue'
import Agenda from '@/components/Agenda/Agenda'
import Investors from '@/components/Investors/Investors'

/**
 * @DemoDay
 */
import DemodayPitchingBooth from '@/components/Demoday/DemodayPitchingBooth'
import StartupsDemoDay from '@/components/Demoday/StartupsDemoDay.vue'
import StartupProfile from '@/components/Demoday/StartupProfile.vue'
import InvestFundProfile from '@/components/Demoday/InvestFundProfile.vue'

/**
 * @Media
 */
import Mediahall from '@/components/Mediahall/Mediahall.vue'
import Mediapartnerbooth from '@/components/Mediapartnerbooth/Mediapartnerbooth.vue'

/**
 * @VIP
 */
import VipMeetingRoom from '@/components/Vip/VipMeetingRoom.vue'

/**
 * @MEETUP
 */
import Meetup from '@/components/Meetup/Meetup.vue'

/**
 * @Booth
 */
import Booth from '@/components/Meetup/Booth.vue'

/**
 * @Workshop
 */
import WorkshopAgenda from '@/components/Workshop/WorkshopAgenda.vue'

import Login from '@/components/Login.vue'
import LoginWithTempEmail from '@/components/LoginWithTempEmail.vue'
import RegistrationHall from '@/components/RegistrationHall'

import NoAccess from '@/components/NoAccess.vue'
import Company from '@/components/CompanyProfile/Company.vue'

import Profile from '@/components/Profile/Profile.vue'
import MyInterviews from '@/components/Profile/MyInterviews.vue'
import MyBusinessCards from '@/components/Profile/MyBusinessCards.vue'

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
            component: Login,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/reghall",
            name: "RegistrationHall",
            component: RegistrationHall,
            meta: {
                requiresAuth: false
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
            path: '/:id/meetup',
            name: "Meetup",
            component: Meetup,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/booth',
            name: "Booth",
            component: Booth,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            },
            props: (route) => ({ name: route.query.name })
        },
        {
            path: '/loginrtp',
            name: "LoginWithTempEmail",
            component: LoginWithTempEmail,
            meta: {
                requiresAuth: false,
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
            component: Mediapartnerbooth,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {   // startup investment profile
            path: '/:id/sip',
            name: "StartupsDemoDay",
            component: StartupsDemoDay,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/sip/:name',
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
            component: DemodayPitchingBooth,
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
        },
        {
            path: '/:id/investors',
            name: "Investors",
            component: Investors,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/wa',
            name: "WorkshopAgenda",
            component: WorkshopAgenda,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/:id/ifp',
            name: "InvestFundProfile",
            component: InvestFundProfile,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            },
            props: (route) => ({ name: route.query.name })
        }
    ]
})

router.beforeEach((to, from, next) => {

    //  if (to.meta.platformLaunch && new Date().getTime() < startDate) {
    //     window.location.pathname = '/noaccess'
    //  }
    //  else {
        if (to.path == "/noaccess" || to.path == "/reghall") {
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
        else if (to.path == "/loginrtp" && to.query.access) {
            localStorage.auth = ''
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
                    window.location.pathname.split("/")[2] != "meetup" &&
                    window.location.pathname.split("/")[2] != "booth" &&
                    window.location.pathname.split("/")[2] != "home" &&
                    window.location.pathname.split("/")[2] != "mediahall" &&
                    window.location.pathname.split("/")[2] != "agenda" &&
                    window.location.pathname.split("/")[2] != "profile" && 
                    window.location.pathname.split("/")[2] != "sip" &&
                    window.location.pathname.split("/")[2] != "ddpb" &&
                    window.location.pathname.split("/")[2] != "investors"
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
    //  }
})

export default router
