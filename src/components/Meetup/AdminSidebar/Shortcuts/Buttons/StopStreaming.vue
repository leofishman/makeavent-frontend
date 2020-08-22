<template>
    <b-button class="is-green-dark" @click="click">
            <div class="btn-wrap">
                <div class="bnt-icon--binding"></div>
                <div>Stop Streaming</div>
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