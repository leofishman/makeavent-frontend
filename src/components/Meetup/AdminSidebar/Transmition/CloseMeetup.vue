<template>
  <div>
    <b-loading 
        slot="switched-header" 
        :is-full-page="false" 
        :active.sync="isLoading" 
        :can-cancel="false"
    />
    <button class="button is-danger admin-bar__button admin-bar__shortcuts-btn" v-on:click="click">{{content}}</button>
  </div>
</template>

<script>
import router from "@/store/routes/meetup-form"
import {ActiveButton} from '@/components/Global/controll/'
import {mapActions} from 'vuex'

export default {
    components: {
        ActiveButton
    },
    methods: {
        ...mapActions(['getMeetupById']),
        async click () {
            const obj = {
                id: this.$root.meetup._id
            }

            this.isLoading = true
            await router.closeMeetup(obj)
            await this.getMeetupById(obj)
            setTimeout(() => {
                this.isLoading = false
            }, 1000)
        }
    },
    computed: {
        content () {
            let content = this.$root.content.adminSidebar.items.transmition.labels
            return this.$root.meetup.status == 'finished' ? content.open : content.close; 
        },
    },
    data(){
        return {
            isLoading: false
        }
    }
}
</script>