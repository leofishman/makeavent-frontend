<template>
    <div id="noaccess">
        <div class="container">
            <navbar :nav="false"></navbar>
            <section class="section has-text-centered">
                <div>
                    <h2 v-if="show" v-html="$root.content.backstage"></h2>
                    <h2 v-if="!show">
                        If you have popup blocked, try clicking the link below
                        <a :href="followLink" target="_blank">Open Backstage</a>
                    </h2>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import {api} from '@/env'
export default {
    name: "Noaccess",
    data() {
//        if (new Date().toLocaleString > (1590368400000 - 3600000)) {
            this.$root.getWebinar("backstage").then(res => {
                this.$root.openExternalInBlank(res.webinarId)
		        this.followLink = res.webinarId
            })
//        }
//        else 
//            this.show = true

        return {
            api: api,
            show: this.show,
	        followLink: ""
        }
    },
}
</script>
<style lang="scss">
    .noaccess-logo {
        margin: 0px 0px 40px 0px;
        width: 350px;
    }
</style>
