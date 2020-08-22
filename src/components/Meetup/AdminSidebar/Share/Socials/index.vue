<template>
    <div>    
            <p class="admin-bar__share-social-list-par">Post in social media</p>
            <div class="admin-bar__share-social-list">
                <facebook/>
                <twitter/>
                <linkedin/>
            </div>
    </div>
</template>

<script>
import Facebook from './Facebook'
import Linkedin from './Linkedin'
import Twitter from './Twitter'

export default {
    components: {
        Facebook, Linkedin, Twitter
    }
}
</script>

<style>

</style>