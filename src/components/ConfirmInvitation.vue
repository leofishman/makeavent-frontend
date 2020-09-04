<template>
    <div>
        
    </div>
</template>
<script>
import axios from 'axios'
import {communitySrv} from '@/env'

export default {
    name: "ConfirmInvitation",
    props: {
        link: String
    },
    data () {
        axios.get(communitySrv + '/meetup/get-invite?link=' + this.link, {
            headers: {
                authorization: localStorage.auth
            }
        })
        .then(res => {
            window.location.pathname = '/profile'
        })
        return {}
    },
    methods: {

    }
}
</script>