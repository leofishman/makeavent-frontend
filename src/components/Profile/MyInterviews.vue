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
export default {
    data() {
        this.allInterviews = []
        return {
            allInterviews: this.allInterviews
        }
    },
    methods: {
        getInterviews () {
            Axios.get(`${this.api}/interviews/user`, {
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