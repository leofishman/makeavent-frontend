<template>
    <div>
        <b-modal v-model="opened" size="lg" id="open-interview-agenda" centered :title="$root.content.upcommingInterviews">
            <b-row>
                
            </b-row>
        </b-modal>
    </div>
</template>
<script>
import Axios from 'axios'
import {host} from '../../env'
export default {
    data() {
        Axios.get(`${host}/interviews/ongoing`).then(res => {
            console.log(res)
        })

        return {
            opened: this.opened
        }
    },
    methods: {
        
    },
}
</script>
<style lang="css">
    
</style>