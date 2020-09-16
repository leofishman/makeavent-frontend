import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {api, startDate, meetupDate} from '../env'

/**
 * @Components
 */
import Home from '@/components/Home'
import Agenda from '@/components/Agenda/Agenda'

/**
 * @Media
 */
import Mediahall from '@/components/Mediahall/Mediahall'
import Mediapartnerbooth from '@/components/Mediapartnerbooth/Mediapartnerbooth'

/**
 * @Auth
 */
import Login from '@/components/Auth/Login'
import LoginWithTempEmail from '@/components/Auth/LoginWithTempEmail'
import Register from '@/components/Auth/Register'
import LoginWithNewPassword from '@/components/Auth/LoginWithNewPassword'
import NoAccess from '@/components/Auth/NoAccess'

import Profile from '@/components/Profile/Profile'
import MyInterviews from '@/components/Profile/MyInterviews'
import MyBusinessCards from '@/components/Profile/MyBusinessCards'
import AcceptInterview from '@/components/AcceptInterview'
import MeetupProfile from '@/components/Meetup/MeetupProfile'
import NetworkingRoom from '@/components/Networking/NetworkingRooms'

import Backstage from '@/components/Backstage'
import ConfirmInvitation from '@/components/ConfirmInvitation'

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
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile/myinterviews',
            name: 'MyInterviews',
            component: MyInterviews,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile/businesscards',
            name: 'MyBusinessCards',
            component: MyBusinessCards,
            meta: {
                requiresAuth: true
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
            path: '/login',
            name: "Password",
            component: Login,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            name: "Register",
            component: Register,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/loginrtp',
            name: "LoginWithTempEmail",
            component: LoginWithTempEmail,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/acceptinterview",
            name: "AcceptInterview",
            component: AcceptInterview,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/resetpwd',
            name: "LoginWithNewPassword",
            component: LoginWithNewPassword,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/mediahall',
            name: "Mediahall",
            component: Mediahall,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/mediahall/:name',
            name: "MediaPartnerProfile",
            component: Mediapartnerbooth,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/agenda',
            name: "Agenda",
            component: Agenda,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/meetup',
            name: "Meetup",
            component: MeetupProfile,
            meta: {
                requiresAuth: true
            },
            props: (route) => ({ id: route.query.id })
        },
        {
            path: '/networking',
            name: "NetworkingRoom",
            component: NetworkingRoom,
            meta: {
                requiresAuth: true
            },
            props: (route) => ({ id: route.query.id }),
        },
        {
            path: '/fas_futureblock',
            name: "Meetup",
            component: MeetupProfile,
            meta: {
                requiresAuth: true
            },
            props: (route) => ({ id: route.query.id })
        },
        {
            path: '/fas_futureblock_networking',
            name: "NetworkingRoom",
            component: NetworkingRoom,
            meta: {
                requiresAuth: true
            },
            props: (route) => ({ id: route.query.id }),
        },
        {
            path: '/fullscreenRoom',
            name: "NetworkingRoom",
            component: NetworkingRoom,
            meta: {
                requiresAuth: true
            },
            props: (route) => ({ id: route.query.id }),
        },
        {
            path: "/confirm_invitation",
            name: "ConfirmInvitation",
            component: ConfirmInvitation,
            meta: {
                requiresAuth: false
            },
            props: (route) => ({ link:route.query.link  })
        }
    ]
})

function isMeetupWithId (to) {
    if (to.name == "Meetup" && to.query.id)
        return true
    else
        return false
}

router.beforeEach((to, from, next) => {
    if (to.query.id == "5f53a682c810aa9f7a8150bc" && to.path == "/meetup") {
        window.location.href = '/fas_futureblock?id=5f53a682c810aa9f7a8150bc'
    }

    if (to.query.id == "5f53a682c810aa9f7a8150bc" && to.path == "/networking") {
        window.location.href = '/fas_futureblock_networking?id=5f53a682c810aa9f7a8150bc'
    }

    if (to.meta.requiresAuth) {
        if (localStorage.auth) {
            axios.get(api + `/auth/checkAccess?path=${toUp(to.name)}`, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                if (to.path == '/')
                    next('/profile')

                else
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
