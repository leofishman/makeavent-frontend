<template>
  <section>
      <item class="admin-bar__design">
            <p class="admin-bar__list-item-header" slot="header">{{this.$root.content.adminSidebar.items.design.title}}</p>
            <template slot="inner">
                <div class="admin-bar__design-switchers">
                    <switchers 
                        @updateMode="updateMode"
                        @updateActive="updateActive" 
                        :isActive="isActive"
                        :isLight="isLight"
                    />
                </div>
                <div class="admin-bar__design-colors" v-if="isActive">
                    <p class="admin-bar__design-colors-par">{{this.$root.content.adminSidebar.items.design.subtitle}}</p>
                    <colors :isLight="isLight"/>
                </div>
                <active-button class="admin-bar__button" @clicked="openScreenSaver" :name="$root.content.adminSidebar.items.design.button"/>
            </template>
      </item>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'

import {ActiveButton} from '@/components/Global/controll/'
import Item from '@/components/Global/admin-sidebar/Item/'

import editScreenSaver from '@/components/PopupForms/meetup/screensaver-popup-form/edit/'

import Switchers from './Switchers'
import Colors from './Colors'

export default {
    components: {
        Item,
        Switchers,
        Colors,
        ActiveButton
    },
    watch: {
        isActive(){
            this.updateCustomColor(this.isActive)
            if(!this.isActive){
                // Primary  
                let query = `#app .networking-rooms .is-primary, #app .meetup-profile .is-primary`
                Array.from(document.querySelectorAll(query)).map(el => {
                    if ( el.className == 'box member is-primary' ) {
                        el.style.borderTop = `solid 4rem #0051d9`
                    }
                    else {
                        el.style.backgroundColor = ''
                    }
                })
                // 1 Light                
                query = `.meetup-profile, .networking-rooms, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms aside, #app .meetup-profile aside, #app .networking-rooms nav, #app .meetup-profile nav, .meetup-profile article, .networking-rooms article`
                Array.from(document.querySelectorAll(query)).map(el => {
                    el.style.backgroundColor = ''
                })
                // 1 Dark                
                query = `#app .networking-rooms .h1, #app .meetup-profile .h1, #app .networking-rooms .h2, #app .meetup-profile .h2, #app .networking-rooms .h3, #app .meetup-profile .h3, #app .networking-rooms .h4, #app .meetup-profile .h4, #app .networking-rooms .h5, #app .meetup-profile .h5, #app .networking-rooms .h6, #app .meetup-profile .h6, #app .networking-rooms h1, #app .meetup-profile h1, #app .networking-rooms h2, #app .meetup-profile h2, #app .networking-rooms h3, #app .meetup-profile h3, #app .networking-rooms h4, #app .meetup-profile h4, #app .networking-rooms h5, #app .meetup-profile h5, #app .networking-rooms h6, #app .meetup-profile h6, #app .networking-rooms p, #app .meetup-profile p, #app .networking-rooms storng, #app .meetup-profile storng, #app .networking-rooms em, #app .meetup-profile em, #app .networking-rooms ol ol, #app .meetup-profile ol ol, #app .networking-rooms ol ul, #app .meetup-profile ol ul, #app .networking-rooms ul ol, #app .meetup-profile ul ol, #app .networking-rooms ul ul, #app .meetup-profile ul ul, #app .networking-rooms ul li, #app .meetup-profile ul li, #app .networking-rooms ol li, #app .meetup-profile ol li, #app .networking-rooms sub, #app .meetup-profile sub, #app .networking-rooms sup, #app .meetup-profile sup, #app .networking-rooms code, #app .meetup-profile code, #app .networking-rooms kbd, #app .meetup-profile kbd, #app .networking-rooms pre, #app .meetup-profile pre, #app .networking-rooms samp, #app .meetup-profile samp, #app .networking-rooms svg, #app .meetup-profile svg, #app .networking-rooms th, #app .meetup-profile th, #app .networking-rooms tr, #app .meetup-profile tr, #app .networking-rooms button, #app .meetup-profile button, #app .networking-rooms optgroup, #app .meetup-profile optgroup, #app .networking-rooms strong, #app .meetup-profile strong, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms span, #app .meetup-profile span`
                Array.from(document.querySelectorAll(query)).map(el => {
                    el.style.color = ''
                })
                // 2 Light  
                query = `#app .networking-rooms .h1, #app .meetup-profile .h1, #app .networking-rooms .h2, #app .meetup-profile .h2, #app .networking-rooms .h3, #app .meetup-profile .h3, #app .networking-rooms .h4, #app .meetup-profile .h4, #app .networking-rooms .h5, #app .meetup-profile .h5, #app .networking-rooms .h6, #app .meetup-profile .h6, #app .networking-rooms h1, #app .meetup-profile h1, #app .networking-rooms h2, #app .meetup-profile h2, #app .networking-rooms h3, #app .meetup-profile h3, #app .networking-rooms h4, #app .meetup-profile h4, #app .networking-rooms h5, #app .meetup-profile h5, #app .networking-rooms h6, #app .meetup-profile h6, #app .networking-rooms p, #app .meetup-profile p, #app .networking-rooms storng, #app .meetup-profile storng, #app .networking-rooms em, #app .meetup-profile em, #app .networking-rooms ol ol, #app .meetup-profile ol ol, #app .networking-rooms ol ul, #app .meetup-profile ol ul, #app .networking-rooms ul ol, #app .meetup-profile ul ol, #app .networking-rooms ul ul, #app .meetup-profile ul ul, #app .networking-rooms ul li, #app .meetup-profile ul li, #app .networking-rooms ol li, #app .meetup-profile ol li, #app .networking-rooms sub, #app .meetup-profile sub, #app .networking-rooms sup, #app .meetup-profile sup, #app .networking-rooms code, #app .meetup-profile code, #app .networking-rooms kbd, #app .meetup-profile kbd, #app .networking-rooms pre, #app .meetup-profile pre, #app .networking-rooms samp, #app .meetup-profile samp, #app .networking-rooms svg, #app .meetup-profile svg, #app .networking-rooms th, #app .meetup-profile th, #app .networking-rooms tr, #app .meetup-profile tr, #app .networking-rooms button, #app .meetup-profile button, #app .networking-rooms optgroup, #app .meetup-profile optgroup, #app .networking-rooms strong, #app .meetup-profile strong, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms span, #app .meetup-profile span`
                Array.from(document.querySelectorAll(query)).map(el => {
                    el.style.backgroundColor = ''
                })
                // 2 Dark                
                query = `.meetup-profile, .networking-rooms, #app .networking-rooms div, #app .meetup-profile div, #app .networking-rooms aside, #app .meetup-profile aside, #app .networking-rooms nav, #app .meetup-profile nav, .meetup-profile article, .networking-rooms article`
                Array.from(document.querySelectorAll(query)).map(el => {
                    el.style.color = ''
                })
            }
        }
    },
    data(){
        return {
            isActive: this.$root.meetup.custom_colors,
            isLight: this.$root.meetup.color_schema.isLight
        }
    },
    methods: {
        ...mapMutations(['updateCustomColor', 'updateColorMode']),
        updateActive(val) {
            this.isActive = val
        },
        updateMode(val){
            this.updateColorMode(val)
            this.isLight = val
        },
        openScreenSaver(){
            this.$buefy.modal.open({
                // fullScreen: true,
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                // customClass: 'modal-dark fullscreen-iframe',
                component: editScreenSaver,
                parent: this
            })
        }
    }
}
</script>
