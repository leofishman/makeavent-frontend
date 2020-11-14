<template>
    <b-button type="is-primary" @click="openRecordings" class="click admin-bar__list-item-header" slot="header">{{content.title}}</b-button>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'
import {ActiveButton} from '@/components/Global/controll/'

export default {
    name: 'recording',
    components: {
        Item,
        ActiveButton
    },
    methods: {
        openRecordings () {
            const a = document.createElement('a')
            a.href = `/recordings?id=${this.$root.meetup._id}`
            a.target = "_blank"
            a.click()
        }
    },
    computed: {
        content () {
            return this.$root.content.adminSidebar.items.recording
        }
    },
}
</script>

<style>

</style>