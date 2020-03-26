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
    methods: {
        showOrUpgrade () {
            if (this.$root.type == "business" || this.$root.type == "vip") {
                axios.get(`${host}/data/savedbusinesscard?id=${this.id}`)
                .then(res => {
                    window.EventBus.$emit('show_business_card', res.data)
                })
                .catch(e => {
                    this.$router.push('/')
                })
            }
            else {
                this.$root.showMessageToUpgradeBusOrVip("Business Card", "Business or VIP")
            }
        }
    },
    mounted() {
        if (localStorage.auth && !this.$root.type) {
            axios.get(host + "/login/checkToken?access=" + window.location.pathname.split('/')[1], {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                this.$root.type = res.data.type
                this.id = this.$router.currentRoute.query.id
                this.showOrUpgrade()
            })
            .catch(e => {
                this.id = this.$router.currentRoute.query.id
                this.$router.push(`/login/businesscard/${this.id}`)
            })
        }
        else if (!localStorage.auth) {
            this.id = this.$router.currentRoute.query.id
            this.$router.push(`/login/businesscard/${this.id}`)
        }
        else if (localStorage.auth && this.$root.token) {
            this.id = this.$router.currentRoute.query.id
            this.showOrUpgrade()
        }
    },
}
</script>