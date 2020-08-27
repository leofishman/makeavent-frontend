<template>
  <section>
      <item class="admin-bar__design">
            <p class="admin-bar__list-item-header" slot="header">{{content.items.design.title}}</p>
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
                    <p class="admin-bar__design-colors-par">{{content.items.design.subtitle}}</p>
                    <colors :isLight="isLight"/>
                </div>
                <active-button class="admin-bar__button" @clicked="openScreenSaver" :name="content.items.design.button"/>
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
import tinycolor from 'tinycolor2'


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
            this.updateColorShema(this.isActive)
        }
    },
    data(){
        return {
            content: this.$root.content.adminSidebar,
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
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                component: editScreenSaver,
                parent: this
            })
        },
        updateColorShema(val){
            if(val){
                let opts = [ 'primary', 'dark', 'light' ]
                opts.map(el => {
                    let query = `#app .is-${el}-changeable--bg, #app .is-${el}-changeable--color, #app .is-${el}-changeable--border-top`
                    
                    Array.from(document.querySelectorAll(query)).map(el => {
                        const classList = Array.from(el.classList)
                        // Border top
                        if ( classList.includes(`is-${el}-changeable--border-top`) ) {
                            if ( classList.includes('distinct-color') )
                                el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
                            else
                                el.style.borderTop = `solid 4rem ${val}`
                        }
                        // Background
                        if ( classList.includes(`is-${el}-changeable--bg`) ) {
                            if ( classList.includes('distinct-color') )
                                el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
                            else
                                el.style.backgroundColor = val
                        }
                        // Text color
                        if ( classList.includes(`is-${el}-changeable--color`) ) {
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
                })
            } else {                
                let opts = [ 'primary', 'dark', 'light' ]
                opts.map(el => {
                    let query = `#app .is-${el}-changeable--bg, #app .is-${el}-changeable--color, #app .is-${el}-changeable--border-top`
                    
                    Array.from(document.querySelectorAll(query)).map(el => {
                        el.style.borderTop = ''
                        el.style.backgroundColor = ''
                        el.style.color = ''
                    })
                })
            }
        }
    }
}
</script>
