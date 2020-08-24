<template>
    <b-button class="is-green" @click="click">
        <div class="btn-wrap">
            <div class="bnt-icon--binding"></div>
            <div>{{this.$root.content.adminSidebar.items.streaming.buttons.start}}</div>
        </div>                        
    </b-button>
</template>

<script>
export default {
    methods: {
        click(){
            this.$emit('clicked')
        }
    }
}
</script>

<style>

</style>