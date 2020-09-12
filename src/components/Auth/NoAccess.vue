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
import './index.scss'
export default {
    name: "Noaccess",
}
</script>
<style lang="scss">
    #noaccess {
        .title-logo {
            margin: 0px 0px 40px 0px;
            width: 350px;
        }
    }
</style>