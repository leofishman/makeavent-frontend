<template>
    <div id="noaccess">
        <div class="container">
            <navbar :nav="false"></navbar>
            <section class="section has-text-centered">
                <div>
                    <h2 v-if="show" v-html="$root.content.backstage"></h2>
                    <h2 v-if="!show">
                        {{content.hint}}
                        <a :href="followLink" target="_blank">{{content.open}}}</a>
                    </h2>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: "Noaccess",
    data() {
        this.$root.getWebinar("backstage").then(res => {
            this.$root.openExternalInBlank(res.webinarId)
            this.followLink = res.webinarId
        })

        return {
            show: this.show,
            followLink: "",
            content: $root.content.Backstage
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
