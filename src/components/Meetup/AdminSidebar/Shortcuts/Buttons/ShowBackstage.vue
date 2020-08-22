<template>
  <active-button class="admin-bar__button admin-bar__shortcuts-btn" @clicked="click" :name="'Show Backstage Window'"/>
</template>

<script>
import {ActiveButton} from '@/components/Global/controll/'

export default {
    components: {
        ActiveButton,
    },
    methods: {
        click(){
            this.$emit('clicked')
        }
    }
}
</script>

<style>

</style>