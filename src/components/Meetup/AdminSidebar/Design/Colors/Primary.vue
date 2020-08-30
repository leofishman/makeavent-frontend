<template>
  <div class="admin-sidebar-color-item">
      <color-item 
        @blur="updateColorShema" 
        @input="check" 
        :defaultColor="defaultColor"
        :defaultValue="$props.defaultValue"
        @toggle-default-value="$emit('toggle-default-value')"
      >
        <p slot="name">{{this.$root.content.adminSidebar.items.design.colors.primary}}</p>
      </color-item>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ColorItem from '@/components/Global/admin-sidebar/ColorItem'
import routes from '@/store/routes/meetup-form'

import tinycolor from 'tinycolor2'

export default {
    props: {
      isLight: Boolean,
      defaultValue: Object
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
              const classList = Array.from(el.classList)
              
              if ( classList.includes('is-primary-changeable--border-top') ) {
                if ( classList.includes('distinct-color') )
                  el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
                else
                  el.style.borderTop = `solid 4rem ${val}`
              }
              
              if ( classList.includes('is-primary-changeable--bg') ) {
                if ( classList.includes('distinct-color') )
                  el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
                else
                  el.style.backgroundColor = val
              }
              
              if ( classList.includes('is-primary-changeable--color') ) {
                if ( classList.includes('distinct-color') )
                  el.style.color = pSBC(0.2, val, invertColor(val))
                else
                  el.style.color = val
              }

              if ( classList.includes('invert-color') )
                if ( isRGB(el.style.backgroundColor) ) 
                  el.style.color = pSBC(
                    0.4,
                    invertColor(rgbToHex(el.style.backgroundColor)),
                    tinycolor(invertColor(rgbToHex(el.style.backgroundColor))).isLight()
                      ? "#FFFFFF"
                      : "#000000")
                
                else if ( isHEX(el.style.backgroundColor) )
                  el.style.color = pSBC(
                    0.4,
                    invertColor(el.style.backgroundColor),
                    tinycolor(invertColor(el.style.backgroundColor)).isLight()
                      ? "#FFFFFF"
                      : "#000000")
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