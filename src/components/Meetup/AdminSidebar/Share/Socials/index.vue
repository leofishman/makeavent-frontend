<template>
    <div>    
        <p class="admin-bar__share-social-list-par">{{content}}</p>
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

import {ActiveButton} from '@/components/Global/controll/'

export default {
    components: {
        Facebook, Linkedin, Twitter, ActiveButton
    },
    computed: {
        content( ) {
            return this.$root.content.adminSidebar.items.share.socials
        }
    },
}
</script>

<style>

</style>