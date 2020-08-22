<template>
  <div class="admin-sidebar-color-item">
      <color-item @input="check" :defaultColor="defaultColor">
        <p slot="name">Primary</p>
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
            const query = `#app .networking-rooms .is-primary, #app .meetup-profile .is-primary`
            Array.from(document.querySelectorAll(query)).map(el => {
                el.style.backgroundColor = val
            })
            const obj = {key: 'primary', value: val}
            this.updateSchemaColor(obj)
        },
        ...mapMutations(['updateSchemaColor'])
    },
    data(){
        return {
            defaultColor: this.$store.getters.meetupColorSchema.primary
        }
    }
}
</script>

<style>

</style>