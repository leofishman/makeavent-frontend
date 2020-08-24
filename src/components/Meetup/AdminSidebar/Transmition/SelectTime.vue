<template>
    <b-field :label="$root.content.adminSidebar.items.transmition.labels.time">
        <b-clockpicker
            :placeholder="$root.content.adminSidebar.items.transmition.placeholders.time"
            icon="clock"
            editable
        >
        </b-clockpicker>
    </b-field>
</template>

<script>
export default {

}
</script>

<style>

</style>