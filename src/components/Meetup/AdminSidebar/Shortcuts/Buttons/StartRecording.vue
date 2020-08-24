<template>
    <b-button class="is-red" @click="click">
            <div class="btn-wrap">
                <div class="bnt-icon--cycle"></div>
                <div>{{this.$root.content.adminSidebar.items.shortcuts.buttons.o_recording}}</div>
            </div>
    </b-button>
</template>

<script>
export default {
    methods: {
        click() {
            this.$emit('clicked')
        }
    }
}
</script>

<style>

</style>