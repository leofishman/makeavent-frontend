<template>
    <div class="centrify-content">
        <b-button @click="create" class="full-width-button" style="font-size:12px;" type="is-danger">
            {{content.delete}}
        </b-button>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "DeleteButton",
    props: ['meetup'],
    data() {
        return {
            content: this.$root.content.ProfileMeetupsTabs,
            global_content: this.$root.content.common,

            activeTab: 0
        }
    },
    methods: {
        ...mapActions(['deleteMeetup']),
        ...mapGetters(['filterMeetupsOnlyAdminStatus']),
        create () {
            let popup = this.$buefy.dialog.confirm({
                canClose: true,
                parent: this,
                title: this.content.dialog.confirm,
                message: this.content.dialog.message(this.meetup.meetup_name),
                cancelText: this.global_content.cancel,
                confirmText: this.global_content.confirm,
                onConfirm: async () => {
                    await this.deleteMeetup({ id: this.meetup._id })
                    popup.close()
                    this.$root.profile.meetups = this.$root.profile.meetups.filter(el => el!=this.meetup._id)
                    this.filterMeetupsOnlyAdminStatus().then(func => {
                        func(this.$root.profile)
                    })
                }
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