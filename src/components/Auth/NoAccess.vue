<template>
    <div id="noaccess">
        <div class="container">
            <navbar :nav="false"></navbar>
            <section class="section has-text-centered">
                <div>
                    <h2 v-html="$root.content.willBeAtMay"></h2>
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
        return {
            api: api
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