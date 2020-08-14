<template>
    <b-autocomplete
        v-model="name"
        :data="socials"
        field="name"
        :open-on-focus="true"
        placeholder="Choose social"
        @select="option => selected = option"
        @input="$emit('changeSocial', setSocial())"
        @focus="scrollToFocus"
    >
        <template slot-scope="props">
            <div class="media">
                <!-- <div class="media-left">
                    <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`">
                </div> -->
                <div class="media-content">
                    <span v-html="props.option.name">{{ props.option.name }}</span>
                    <!-- <br>
                    <small>
                        Released at {{ props.option.release_date }},
                        rated <b>{{ props.option.vote_average }}</b>
                    </small> -->
                </div>
            </div>
        </template>
    </b-autocomplete>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        props: ['index', 'item'],
        mounted() {
            const item = this.$props.item
            if(item.name.length){                    
                const socials = this.$store.getters.socials
                const innerItem = socials.find(cuurentItem => {
                    return cuurentItem.name === this.$props.item.name
                })
                this.useMutations = false
                if(innerItem) {
                    if(innerItem.name && innerItem.name.length) {
                        this.name = innerItem.name
                    }
                    this.selected = innerItem
                }                  

                this.name = this.$props.item.name
        
                const sosialObj = {
                    index: this.$props.index,
                    social: this.selected
                }
                if(!this._.isNull(this.sosialObj)) this.pushSocial(sosialObj)                    
            }
        },
        data() {
            return {
                selected: null,
                data: [],
                name: '',
                useMutations: true
            }
        },
        watch: {
            selected() { 
                if (this.useMutations) { 
                    if (this.selected) {
                        const sosialObj = {
                            index: this.$props.index,
                            social: this.selected
                        }
                        const socials = this.$store.state.socialsForm.socials;
                        let exist = false
                        if(socials.length) {
                            socials.map(item => {
                                if(item.index === sosialObj.index ) exist = true
                            })
                        }
                        if(!exist) this.pushSocial(sosialObj) 
                        else this.updateSocial(sosialObj)
                    } else {                    
                        const sosialObj = {
                            index: this.$props.index,
                            social: false
                        }
                        this.updateSocial(sosialObj)
                    }
                } else {
                    this.useMutations = true
                }
            },
            item(){
                if(this.$props.item) {
                    const socials = this.$store.getters.socials

                    this.useMutations = false

                    if (this.$props.item.name.length) {
                        const innerItem = socials.find(cuurentItem => {
                            return cuurentItem.name === this.$props.item.name
                        })
                        if(innerItem) {
                            if(innerItem.name && innerItem.name.length) {
                                this.name = innerItem.name
                            }
                            this.selected = innerItem
                        }  
                    } else {
                        this.selected = null
                        this.name = ''
                    }            
                }                
            },
            index(){
                console.log('this.$props.item');
                if(this.$props.item) {
                    const socials = this.$store.getters.socials

                    this.useMutations = false

                    if (this.$props.item.name.length) {
                        const innerItem = socials.find(cuurentItem => {
                            return cuurentItem.name === this.$props.item.name
                        })
                        if(innerItem) {
                            if(innerItem.name && innerItem.name.length) {
                                this.name = innerItem.name
                            }
                            this.selected = innerItem
                        }  
                    } else {
                        this.selected = null
                        this.name = ''
                    }            
                }  
            }
        },
        methods: {
            ...mapMutations(['pushSocial', 'updateSocial']),
            setSocial(){
                if(this.name){
                    const socials = this.$store.getters.socials
                    const validValue = socials.filter(item => {
                        if(item.name) return item.name === this.name                        
                    })
                    if(validValue.length && this.selected) return {selectedItem: this.selected, index:this.$props.index}
                    else return false
                }
            },
            scrollToFocus($event){
                if(this.socials.length > 0){                
                    const interval = setInterval(() => {
                        const box = document.querySelector('.stuff-list')
                        const dropdownMenus = document.querySelectorAll('.stuff-list .dropdown-menu')
                        let flag = false
                        Array.from(dropdownMenus).map(item => {
                            if( item.style.display !== 'none' ) flag = true
                        })
                        if(flag) {
                            clearInterval(interval)
                            box.scrollTop =  $event.path[5].offsetTop
                            $event.target.click()
                        }
                        // var el = document.querySelectorAll('.stuff-item')
                        // box.scrollTop = box.getBoundingClientRect().height + $event.path[5].offsetTop                    
                    }, 400) 
                }
            }
        },
        computed: {
            socials() {
                let socials = this.$store.getters.validSocials
                socials = this._.difference(socials, this.tags)
                
                if(socials){
                    this.data = socials       
                    if (typeof this.data !== 'string') {
                        return this.data.filter((option) => {
                            if(option.name){
                                return option.name
                                .toString()
                                .toLowerCase()
                                .indexOf(this.name.toLowerCase()) >= 0
                            }
                        })
                    }
                }
            }
        }
    }
</script>