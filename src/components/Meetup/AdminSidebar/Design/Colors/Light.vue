<template>
  <div class="admin-sidebar-color-item">
      <color-item @blur="updateColorShema" @input="check" :defaultColor="defaultColor">
        <p slot="name">{{this.$root.content.adminSidebar.items.design.colors.light}}</p>
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
                custom_colors: this.$store.getters.meetupFull.custom_colors
            }
            await routes.postUpdate(obj)
        },
        check(val){
            this.updateColor(val)
        },
        updateColor(val){
            // let query = `.meetup-profile, .networking-rooms, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms aside, #app .meetup-profile aside, #app .networking-rooms nav, #app .meetup-profile nav, .meetup-profile article, .networking-rooms article, .meetup-profile button:not(.is-primary), .networking-rooms button:not(.is-primary)`
            let query = `#app .is-light-changeable, #app .is-light-changeable--color, #app .is-light-changeable--bg`

            if(!this.light) {
                query = `#app .networking-rooms .h1, #app .meetup-profile .h1, #app .networking-rooms .h2, #app .meetup-profile .h2, #app .networking-rooms .h3, #app .meetup-profile .h3, #app .networking-rooms .h4, #app .meetup-profile .h4, #app .networking-rooms .h5, #app .meetup-profile .h5, #app .networking-rooms .h6, #app .meetup-profile .h6, #app .networking-rooms h1, #app .meetup-profile h1, #app .networking-rooms h2, #app .meetup-profile h2, #app .networking-rooms h3, #app .meetup-profile h3, #app .networking-rooms h4, #app .meetup-profile h4, #app .networking-rooms h5, #app .meetup-profile h5, #app .networking-rooms h6, #app .meetup-profile h6, #app .networking-rooms p, #app .meetup-profile p, #app .networking-rooms storng, #app .meetup-profile storng, #app .networking-rooms em, #app .meetup-profile em, #app .networking-rooms ol ol, #app .meetup-profile ol ol, #app .networking-rooms ol ul, #app .meetup-profile ol ul, #app .networking-rooms ul ol, #app .meetup-profile ul ol, #app .networking-rooms ul ul, #app .meetup-profile ul ul, #app .networking-rooms ul li, #app .meetup-profile ul li, #app .networking-rooms ol li, #app .meetup-profile ol li, #app .networking-rooms sub, #app .meetup-profile sub, #app .networking-rooms sup, #app .meetup-profile sup, #app .networking-rooms code, #app .meetup-profile code, #app .networking-rooms kbd, #app .meetup-profile kbd, #app .networking-rooms pre, #app .meetup-profile pre, #app .networking-rooms samp, #app .meetup-profile samp, #app .networking-rooms svg, #app .meetup-profile svg, #app .networking-rooms th, #app .meetup-profile th, #app .networking-rooms tr, #app .meetup-profile tr, #app .networking-rooms button, #app .meetup-profile button, #app .networking-rooms optgroup, #app .meetup-profile optgroup, #app .networking-rooms strong, #app .meetup-profile strong, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms span, #app .meetup-profile span`
                
                Array.from(document.querySelectorAll(query)).map(el => {
                    el.style.color = val
                })
            } else {
                Array.from(document.querySelectorAll(query)).map(el => {
                    if ( Array.from(el.classList).includes('is-light-changeable--color') ) {
                        el.style.color = val    
                    }
                    else if ( Array.from(el.classList).includes('is-light-changeable--bg') ) {
                        el.style.backgroundColor = val
                    }
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