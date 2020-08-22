<template>
  <div class="admin-sidebar-color-item">
      <color-item @input="check" :defaultColor="defaultColor">
        <p slot="name">Light</p>
      </color-item>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ColorItem from '@/components/Global/admin-sidebar/ColorItem'

export default {
    components: {
        ColorItem
    },
    methods: {
        check(val){
            const query = `.meetup-profile, .networking-rooms, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms aside, #app .meetup-profile aside, #app .networking-rooms nav, #app .meetup-profile nav, .meetup-profile article, .networking-rooms article`
            Array.from(document.querySelectorAll(query)).map(el => {
                el.style.backgroundColor = val
            })
            const obj = {key: 'light', value: val}
            this.updateSchemaColor(obj)
        },
        ...mapMutations(['updateSchemaColor'])
    },
    data(){
        return {
            defaultColor: this.$store.getters.meetupColorSchema.light
        }
    }
}
</script>

<style>

</style>