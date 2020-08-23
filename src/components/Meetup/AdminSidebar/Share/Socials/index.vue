<template>
    <div>    
            <p class="admin-bar__share-social-list-par">Post in social media</p>
            <div class="admin-bar__share-social-list">
                <facebook/>
                <twitter/>
                <linkedin/>
            </div>
            <ActiveButton class="admin-bar__share-social-list-btn admin-bar__button" :name="'Add New Source'"/>
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
    }
}
</script>

<style>

</style>