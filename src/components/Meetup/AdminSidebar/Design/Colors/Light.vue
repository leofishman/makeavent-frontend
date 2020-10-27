<template>
  <div class="admin-sidebar-color-item">
      <color-item 
        @blur="updateColorShema" 
        @input="check" 
        :defaultColor="defaultColor"
        :defaultValue="$props.defaultValue"
        @toggle-default-value="$emit('toggle-default-value')"
      >
        <p slot="name">{{this.$root.content.adminSidebar.items.design.colors.light}}</p>
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
        if(this.$root.meetup.custom_colors) {
            this.light = this.$root.meetup.color_schema.isLight
            this.updateColor(this.$root.meetup.color_schema.light)
        }
    },
    watch: {
      isLight(){
        this.light = this.$props.isLight
        this.updateColor(this.$store.getters.meetupColorSchema.light)
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
                custom_colors: this.$store.getters.meetupFull.custom_colors,
                preview: 'no_update',
                image: 'no_update',
                meetup_name: "no_update",
                description: "no_update",
                company_name: "no_update",
                company_description: "no_update",
                date: "no_update",
                website: "no_update",
            }
            await routes.postUpdate(obj)
        },
        check(val){
            this.updateColor(val)
        },

        updateFunc (el, val, type) {
            const classList = Array.from(el.classList)
              
            if ( classList.includes(`is-${type}-changeable--border-top`) ) {
                if ( classList.includes('distinct-color') )
                    el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
                else
                    el.style.borderTop = `solid 4rem ${val}`
            }
            
            if ( classList.includes(`is-${type}-changeable--bg`) ) {
                if ( classList.includes('distinct-color') )
                    el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
                else
                    el.style.backgroundColor = val
            }
            
            if ( classList.includes(`is-${type}-changeable--color`) ) {
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
        },

        updateColor(val){
            let query = `#app .is-light-changeable, #app .is-light-changeable--color, #app .is-light-changeable--bg, #app .is-light-changeable--border-top`

            if(!this.light) {
                query = `#app .is-dark-changeable, #app .is-dark-changeable--bg, #app .is-dark-changeable--color, #app .is-dark-changeable--border-top`
                Array.from(document.querySelectorAll(query)).map(el => {
                    this.updateFunc(el, val, 'dark')
                })
            } else {
                Array.from(document.querySelectorAll(query)).map(el => {
                    this.updateFunc(el, val, 'light')
                })
            }
            
            const obj = {key: 'light', value: val}
            this.updateSchemaColor(obj)
        },
        ...mapMutations(['updateSchemaColor'])
    },
    data(){
        return {
            defaultColor: this.$root.meetup.color_schema.light,
            light: this.$props.isLight
        }
    }
}
</script>

<style>
</style>