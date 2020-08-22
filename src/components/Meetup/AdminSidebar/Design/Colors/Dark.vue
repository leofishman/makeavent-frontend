<template>
  <div class="admin-sidebar-color-item">
      <color-item @input="check" :defaultColor="defaultColor">
        <p slot="name">Dark</p>
      </color-item>
      <!-- <div>{{$store.getters.meetupFull.logo}}</div> -->
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
            const query = `#app .networking-rooms .h1, #app .meetup-profile .h1, #app .networking-rooms .h2, #app .meetup-profile .h2, #app .networking-rooms .h3, #app .meetup-profile .h3, #app .networking-rooms .h4, #app .meetup-profile .h4, #app .networking-rooms .h5, #app .meetup-profile .h5, #app .networking-rooms .h6, #app .meetup-profile .h6, #app .networking-rooms h1, #app .meetup-profile h1, #app .networking-rooms h2, #app .meetup-profile h2, #app .networking-rooms h3, #app .meetup-profile h3, #app .networking-rooms h4, #app .meetup-profile h4, #app .networking-rooms h5, #app .meetup-profile h5, #app .networking-rooms h6, #app .meetup-profile h6, #app .networking-rooms p, #app .meetup-profile p, #app .networking-rooms storng, #app .meetup-profile storng, #app .networking-rooms em, #app .meetup-profile em, #app .networking-rooms ol ol, #app .meetup-profile ol ol, #app .networking-rooms ol ul, #app .meetup-profile ol ul, #app .networking-rooms ul ol, #app .meetup-profile ul ol, #app .networking-rooms ul ul, #app .meetup-profile ul ul, #app .networking-rooms ul li, #app .meetup-profile ul li, #app .networking-rooms ol li, #app .meetup-profile ol li, #app .networking-rooms sub, #app .meetup-profile sub, #app .networking-rooms sup, #app .meetup-profile sup, #app .networking-rooms code, #app .meetup-profile code, #app .networking-rooms kbd, #app .meetup-profile kbd, #app .networking-rooms pre, #app .meetup-profile pre, #app .networking-rooms samp, #app .meetup-profile samp, #app .networking-rooms svg, #app .meetup-profile svg, #app .networking-rooms th, #app .meetup-profile th, #app .networking-rooms tr, #app .meetup-profile tr, #app .networking-rooms button, #app .meetup-profile button, #app .networking-rooms optgroup, #app .meetup-profile optgroup, #app .networking-rooms strong, #app .meetup-profile strong, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms span, #app .meetup-profile span`
            
            Array.from(document.querySelectorAll(query)).map(el => {
                el.style.color = val
            })
            const obj = {key: 'dark', value: val}
            this.updateSchemaColor(obj)
        },
        ...mapMutations(['updateSchemaColor'])
    },
    data(){
        return {
            defaultColor: this.$store.getters.meetupColorSchema.dark
        }
    },
}
</script>