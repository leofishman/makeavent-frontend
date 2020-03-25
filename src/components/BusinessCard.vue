<template>
    <div>
        
    </div>
</template>
<script>

import {host} from '../env'
import axios from 'axios'

export default {
    data () {
        return {
            
        }
    },
    mounted() {
        axios.get(`${host}/data/savedbusinesscard?id=${this.$router.currentRoute.query.id}`)
        .then(res => {
            window.EventBus.$emit('show_business_card', res.data)
        })
        .catch(e => {
            this.$router.push('/')
        })
    },
}
</script>