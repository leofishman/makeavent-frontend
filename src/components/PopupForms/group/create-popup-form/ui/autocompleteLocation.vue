<template>
    <section>
        <b-field>
            <b-autocomplete
                v-model="name"
                :placeholder="content.groupPopupForm.placeholders.location"
                :data="filteredDataObj"
                @input="$emit('changeLocation', setLocation())"
                required
                :pattern="filteredDataObj"
                :validation-message="content.groupPopupForm.validation.location" 
                :open-on-focus="true"
            >
              <template slot="empty">{{$root.content.groupPopupForm.validation.noFound}}</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
  import {mapActions} from 'vuex'
  import eng from '@/english'

  export default {
    async mounted() {
      this.getCountries() 
    },
    data() {
      return {
        data: false,
        name: '',
        content: eng
      }
    },
    watch: {
      name(){        
        this.updateCountry(this.name)
        return null
      }
    },
    methods: {      
      ...mapActions(['getCountries', 'setCountry']),
      updateCountry(e){        
        this.setCountry(e)
        return false
      },
      setLocation(){
        return this.name
      }
    },
    computed: {
      filteredDataObj() {
        const allCountries = this.$store.getters.allCountries
        if(allCountries){
          this.data = allCountries          
          if (typeof this.data !== 'string') {
            return this.data.filter((option) => {
                return option
                  .toString()
                  .toLowerCase()
                  .indexOf(this.name.toLowerCase()) >= 0
            })
          }
        } 
      }
    }
  }
</script>