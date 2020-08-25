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
        axios.get(communitySrv + '/meetup/get-invite?link=' + this.link)
        .then(res => {
            this.$router.push('/profile')
        })
        return {}
    },
    methods: {

    }
}
</script>