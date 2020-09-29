<template>
    <div class="admin-bar__streaming-sources">
        <p v-if="sources.length">{{content.current}}</p>
        <p v-else>{{content.addNew}}</p>

        <div>
            <div v-for="(el, index) in sources" :key="index" class="admin-bar__streaming-source-cards">
                <SourceCard :source="el" :showDeleteButton="false" />
            </div>
        </div>
    </div>
</template>

<script>
import SourceCard from './SourceCard'

export default {
    name: "StreamingSources",
    components: {
       SourceCard
    },
    computed: {
        sources () {
            return this.$store.state.meetupForm.streamingSources
        },
        content () {
            return this.$root.content.adminSidebar.items.streaming
        }
    },
}
</script>

<style>

</style>