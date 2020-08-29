<template>
    <div>
        <b-button @click="create" class="full-width-button" type="is-primary">
            {{content.create}}
        </b-button>
    </div>
</template>
<script>
import {MEETUP} from '@/api/endpoints'
import Axios from 'axios'
import CreateForm from '@/components/PopupForms/meetup/create-popup-form/index.vue'

export default {
    name: "CreateNewButton",
    data() {
        return {
            content: this.$root.content.ProfileMeetupsTabs.CreateNewButton,
            global_content: this.$root.content.common,

            activeTab: 0
        }
    },
    methods: {
        create () {
            let popup = this.$buefy.modal.open({
                component: CreateForm,
                canClose: true,
                parent: this
            })

            window.EventBus.$on('CreateNewMeetup:close', popup.close)
        }
    },
}
</script>
<style lang="scss">
.full-width-button {
    display: block;
    position: relative;
    width: 100%;
    margin: 10px 0px;
}
</style>