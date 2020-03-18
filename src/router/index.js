import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {host, socket} from '../env'
import VueSocketIO from 'socket.io-client'

/**
 * @components
 */
import Home from '../components/Home.vue'
import NoAccess from '../components/NoAccess.vue'
import Wait from '../components/Wait.vue'

Vue.use(Router)

let io = VueSocketIO(socket, {
    query: {
        token: window.location.hash.split("#/")[1]
    }
})

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
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
                requiresAuth: false
            }
        },
        {
            path: '/:id/wait',
            name: "Wait",
            component: Wait,
            meta: {
                requiresAuth: false
            }
        }
    ]
})

io.on('connect', () => {
    console.log('socket connected')
})

io.on('logout', () => {
    localStorage.auth = ""
    window.location = '/#/noaccess'
})

setInterval(() => {
    io.emit('auth', { id:window.location.hash.split("#/")[1] })
}, 5000)


router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.auth == "" && to.params.id != 'noaccess') {
            const id = to.params.id
            const response = await axios.get(`${host}/login?id=${id}`)
            localStorage.auth = response.headers.authorization
            next()
        }
        else {
            console.log(to.params.id)
            next()
        }
    }
    else {
        next()
    }
})

export default router