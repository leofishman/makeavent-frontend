<template>
    <section>
        <b-loading 
            :is-full-page="false" 
            :active.sync="isLoading" 
            :can-cancel="false"
        />
        <item class="admin-bar__design"  :opened="false">
            <p class="admin-bar__list-item-header" slot="header">{{content.items.design.title}}</p>
            
            <template slot="inner">
                <div class="admin-bar__design-switchers">
                    <switchers 
                        @updateMode="updateMode"
                        @updateActive="updateActive" 
                        @resetToDefault="resetToDefault"
                        :isActive="isActive"
                        :isLight="isLight"
                    />
                </div>
                <div class="admin-bar__design-colors" v-if="isActive">
                    <p class="admin-bar__design-colors-par">{{content.items.design.subtitle}}</p>
                    <colors 
                        :isLight="isLight" 
                        :defaultValue="defaultValue"
                        @toggle-default-value="isActiveFalse"
                    />
                </div>
                <active-button :style="{ marginTop: !isActive ? '-35px' : '28px' }" class="admin-bar__button" @clicked="openScreenSaver" :name="content.items.design.button"/>
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

import routes from '@/store/routes/meetup-form'

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
            isLight: this.$root.meetup.color_schema.isLight,
            defaultValue: {
              isActive: false,
              primary: '#4fe6db',
              dark: '#053056',
              light: '#f4edfbff',
            },
            isLoading: false
        }
    },
    methods: {
        ...mapMutations(['updateCustomColor', 'updateColorMode', 'updateSchemaColor', 'updateIsDefault']),
        async updateActive(val) {
            this.isActive = val
            try {
                this.isLoading = true
                const obj = {
                    id: this.$root.meetup._id,
                    color_schema: this.$store.getters.meetupFull.color_schema,
                    custom_colors: val,
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
                this.isLoading = false
            } catch (e){
                console.log(e);
            }
        },
        updateMode(val){
            this.updateColorMode(val)
            this.isLight = val
        },
        openScreenSaver(){
            let popup = this.$buefy.modal.open({
                hasModalCard: true,
                canCancel: true,
                trapFocus: true,
                component: editScreenSaver,
                parent: this
            })

            window.EventBus.$on('ScreenSaverPopupForm:close', () => {
                popup.close()
            })
        },
        resetToDefault(){
            this.isLight = true
            this.defaultColorShema()
            let colorShema = {
              primary: '#4fe6db',
              dark: '#053056',
              light: '#f4edfbff',
            }
            
            // Primary
            let obj = {key: 'primary', value: colorShema.primary}
            this.updateSchemaColor(obj)
            this.updateIsDefault()
            // Dark
            obj = {key: 'dark', value: colorShema.dark}
            this.updateSchemaColor(obj)
            this.updateIsDefault()
            // Light
            obj = {key: 'light', value: colorShema.light}
            this.updateSchemaColor(obj)
            this.updateIsDefault()
            this.defaultValue.isActive = true
        },
        updateColorShema(val){
            if(val){
                let opts = [ 'primary', 'dark', 'light' ]
                opts.map(type => {
                    let query = `#app .is-${type}-changeable--bg, #app .is-${type}-changeable--color, #app .is-${type}-changeable--border-top`
                    
                    Array.from(document.querySelectorAll(query)).map(el => {
                        const classList = Array.from(el.classList)
                        // Border top
                        if ( classList.includes(`is-${type}-changeable--border-top`) ) {
                            if ( classList.includes('distinct-color') )
                                el.style.borderTop = `solid 4rem ${pSBC(0.2, val, invertColor(val))}`
                            else
                                el.style.borderTop = `solid 4rem ${val}`
                        }
                        // Background
                        if ( classList.includes(`is-${type}-changeable--bg`) ) {
                            if ( classList.includes('distinct-color') )
                                el.style.backgroundColor = pSBC(0.2, val, invertColor(val))
                            else
                                el.style.backgroundColor = val
                        }
                        // Text color
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
                    })
                })
            } else { 
                this.defaultColorShema()            
            }
        },
        defaultColorShema(){   
            let opts = [ 'primary', 'dark', 'light' ]
            opts.map(type => {
                let query = `#app .is-${type}-changeable--bg, #app .is-${type}-changeable--color, #app .is-${type}-changeable--border-top,  .invert-color`
                
                Array.from(document.querySelectorAll(query)).map(el => {
                    el.style.borderTop = ''
                    el.style.backgroundColor = ''
                    el.style.color = ''
                })
            })
        },
        async isActiveFalse(){
            this.defaultValue.isActive = false

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
        }
    }
}
</script>
