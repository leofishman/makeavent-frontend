<template>
    <b-button class="is-red-dark" @click="click">
            <div class="btn-wrap">
                <div class="bnt-icon--square"></div>
                <div>Stop Recording</div>
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