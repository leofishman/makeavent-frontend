<template>
  <div class="admin-sidebar-color-item">
      <color-item @blur="updateColorShema" @input="check" :defaultColor="defaultColor">
        <p slot="name">{{this.$root.content.adminSidebar.items.design.colors.primary}}</p>
      </color-item>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ColorItem from '@/components/Global/admin-sidebar/ColorItem'

import routes from '@/store/routes/meetup-form'

export default {
    props: {
      isLight: Boolean
    },
    mounted(){
      this.updateColor(this.$root.meetup.color_schema.primary)
    },
    watch: {
      isLight(){
        this.light = this.$props.isLight
        this.updateColor(this.$store.getters.meetupColorSchema.primary)
      }
    },
    components: {
        ColorItem
    },
    methods: {
        async updateColorShema(){
            const obj = {
                id: this.$root.meetup._id,
                color_schema: this.$store.getters.meetupFull.color_schema,
                custom_colors: this.$store.getters.meetupFull.custom_colors
            }
            await routes.postUpdate(obj)
        },
        check(val){
          this.updateColor(val)
        },        
        updateColor(val){
            let query = `#app .is-primary-changeable--bg, #app .is-primary-changeable--color, #app .is-primary-changeable--border-top`
            Array.from(document.querySelectorAll(query)).map(el => {
              if ( Array.from(el.classList).includes('is-primary-changeable--border-top') ) {
                el.style.borderTop = `solid 4rem ${val}`
              }
              else if ( Array.from(el.classList).includes('is-primary-changeable--bg') ) {
                el.style.backgroundColor = val
              }
              else if ( Array.from(el.classList).includes('is-primary-changeable--color') ) {
                el.style.color = val
              }
            })
            const obj = {key: 'primary', value: val}
            this.updateSchemaColor(obj)
        },
        ...mapMutations(['updateSchemaColor'])
    },
    data(){
        return {
            defaultColor: this.$root.meetup.color_schema.primary,
            light: this.$props.isLight
        }
    }
}
</script>

<style>

</style>