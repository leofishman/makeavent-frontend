<template>
    <div class="admin-bar__streaming-list">
        <start-streaming v-if="!isActive" @clicked="click" class="admin-bar__streaming-list-btn"/>
        <stop-streaming v-if="isActive" @clicked="click" class="admin-bar__streaming-list-btn"/>
    </div>
</template>

<script>
import StartStreaming from './StartStreaming'
import StopStreaming from './StopStreaming'

export default {
    components: {
        StartStreaming,
        StopStreaming
    },
    data(){
        return {
            isActive: false
        }
    },
    methods: {
        click() {
            this.isActive = !this.isActive
        }
    }
}
</script>

<style>

</style>