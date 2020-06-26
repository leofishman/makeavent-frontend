import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {api, startDate, meetupDate} from '../env'

/**
 * @components
 */
import Home from '@/components/Home'
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

import VipMeetingRoom from '@/components/Vip/VipMeetingRoom.vue'
import WorkshopAgenda from '@/components/Workshop/WorkshopAgenda.vue'
import Login from '@/components/Login.vue'
import LoginWithTempEmail from '@/components/LoginWithTempEmail.vue'
import RegistrationHall from '@/components/RegistrationHall'
import Register from '@/components/Register'
import LoginWithNewPassword from '@/components/LoginWithNewPassword'
import InfoDesk from '@/components/InfoDesk'
import NoAccess from '@/components/NoAccess.vue'
import Company from '@/components/CompanyProfile/Company.vue'
import Profile from '@/components/Profile/Profile.vue'
import MyInterviews from '@/components/Profile/MyInterviews.vue'
import MyBusinessCards from '@/components/Profile/MyBusinessCards.vue'
import AcceptInterview from '@/components/AcceptInterview'

import Backstage from '@/components/Backstage'

Vue.use(Router)

const router = new Router({
    mode: "history",
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/info',
            name: 'InfoDesk',
            component: InfoDesk,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/profile/myinterviews',
            name: 'MyInterviews',
            component: MyInterviews,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/profile/businesscards',
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
            path: '/backstage',
            name: "Backstage",
            component: Backstage,
        },
        {
            path: '/company',
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
                requiresAuth: false,
                platformLaunch: true
            }
        },
        {
            path: '/register',
            name: "Register",
            component: Register,
            meta: {
                requiresAuth: false,
                platformLaunch: true
            }
        },
        {
            path: "/reghall",
            name: "RegistrationHall",
            component: RegistrationHall,
            meta: {
                requiresAuth: false,
                platformLaunch: true
            }
        },
        {
            path: '/vip',
            name: "Vip",
            component: VipMeetingRoom,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/loginrtp',
            name: "LoginWithTempEmail",
            component: LoginWithTempEmail,
            meta: {
                requiresAuth: false,
                platformLaunch: true
            }
        },
        {
            path: "/acceptinterview",
            name: "AcceptInterview",
            component: AcceptInterview,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/resetpwd',
            name: "LoginWithNewPassword",
            component: LoginWithNewPassword,
            meta: {
                requiresAuth: false,
                platformLaunch: true
            }
        },
        {
            path: '/mediahall',
            name: "Mediahall",
            component: Mediahall,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/mediahall/:name',
            name: "MediaPartnerProfile",
            component: Mediapartnerbooth,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {   // startup investment profile
            path: '/sip',
            name: "StartupsDemoDay",
            component: StartupsDemoDay,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/sip/:name',
            name: "StartupProfile",
            component: StartupProfile,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/ddpb',
            name: "DemoDayPitchingBooth",
            component: DemodayPitchingBooth,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/agenda',
            name: "Agenda",
            component: Agenda,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/investors',
            name: "Investors",
            component: Investors,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/wa',
            name: "WorkshopAgenda",
            component: WorkshopAgenda,
            meta: {
                requiresAuth: true,
                platformLaunch: true
            }
        },
        {
            path: '/ifp',
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
    if (to.meta.requiresAuth) {
        if (localStorage.auth) {
            axios.get(api + `/auth/checkAccess?path=${toUp(to.name)}`, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                next()
            })
            .catch(e => {
                console.log(e.response)
                if (e.response.data == "NO ACCESS")
                    next('/login')
                else {
                    console.log('router 279')
                }
            })
        }
        else
            next('/login')
    }
    else
        next()
})

export default router
