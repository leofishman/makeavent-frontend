<template>
    <div>
        <a v-on:click="resetPwdPop()" v-html="content.clickHere"></a>
    </div>
</template>
<script>
import ResetPwdPop from '@/components/Popups/ResetPwdPopup.vue'
import './index.scss'

export default {
    data() {
        return {
            content: this.$root.content.ResetPwd
        }
    },
    methods: {
        resetPwdPop () {
            this.$buefy.modal.open({
                parent: this,
                component: ResetPwdPop,
                hasModalCard: true,
            })
        }
    }
}
</script>