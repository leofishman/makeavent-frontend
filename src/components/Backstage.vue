<template>
    <div id="noaccess">
        <div class="container">
            <navbar :nav="false"></navbar>
            <section class="section has-text-centered">
                <div>
                    <h2 v-if="show" v-html="$root.content.backstage"></h2>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import {host} from '@/env'
export default {
    name: "Noaccess",
    data() {
        if (new Date().toLocaleString > (1590368400000 - 3600000)) {
            this.$root.getWebinar("backstage").then(res => {
                this.$root.openExternalInBlank(res.webinarId)
            })
        }
        else 
            this.show = true

        return {
            host: host,
            show: this.show
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