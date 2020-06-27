<template>
    <div>
        {{$root.content.ResetPwd.text}}
        <a v-on:click="resetPwdPop()"><b>{{$root.content.ResetPwd.clickHere}}</b></a>
        {{$root.content.ResetPwd.textFinish}}
    </div>
</template>
<script>
import ResetPwdPop from '@/components/Popups/ResetPwdPopup.vue'

export default {
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