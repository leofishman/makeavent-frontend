<template>
    <div class="modal-card">
        <div class="modal-card-head">
            <p class="modal-card-title">
                Success
            </p>
        </div>
        <div class="modal-card-body">
            You have accepted interview invitation.
            <br>
            <b class="media-name">{{$root.capitalizeFirstLetter(mediaName)}}</b> was notified. 
            Please click confirm to go to <b class="media-name">{{$root.capitalizeFirstLetter(mediaName)}}</b> booth.
        </div>
         <footer class="modal-card-foot">
            <b-button type="is-primary" v-on:click="openPage()">Confirm</b-button>
        </footer>
    </div>
</template>
<script>
export default {
    name: "AcceptedInterview",
    props: {
        mediaName: String
    },
    data () {
        return {}
    },
    methods: {
        openPage () {
            this.$parent.close()
            this.$router.push({
                path: `mediahall/${toLo(this.mediaName)}`
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .media-name {
        color: #9D6DBE;
    }
</style>