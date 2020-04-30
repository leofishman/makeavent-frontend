<template>
    <div>
        <navbar></navbar>
        <navbar-profile></navbar-profile>

        <b-container fluid="md" class="container-white nopadding">
            <b-tabs card content-class="mt-3">
                <b-tab :title="$root.content.upcomming" active>
                    <b-card-text>

                    </b-card-text>
                </b-tab>
                <b-tab :title="$root.content.past">
                    <b-card-text>

                    </b-card-text>
                </b-tab>
                <b-tab :title="$root.content.failed">
                    <b-card-text>

                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-container>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '@/env'
export default {
    data() {
        this.$root.tokenCheck().then(() => {
            this.getInterviews()

        })
        return {
            allInterviews: this.allInterviews
        }
    },
    methods: {
        getInterviews () {
            Axios.get(`${host}/interviews/user/${this.$root.token}`, {
                headers: {
                    authorization: localStorage.auth
                }
            })
            .then(res => {
                this.allInterviews = res.data
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
}
</script>