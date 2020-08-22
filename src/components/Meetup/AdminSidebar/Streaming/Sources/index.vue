<template>
    <div class="admin-bar__streaming-sources">
        <p>Current Sources</p>
        <div class="admin-bar__streaming-sources-list">
            <youtube/>
            <twitch/>
            <facebook/>
        </div>
    </div>  
</template>

<script>
import Facebook from './Facebook'
import Twitch from './Twitch'
import Youtube from './Youtube'

export default {
    components: {
        Facebook,
        Twitch,
        Youtube
    }
}
</script>

<style>

</style>