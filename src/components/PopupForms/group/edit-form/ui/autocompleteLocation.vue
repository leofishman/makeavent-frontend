<template>
    <section>
        <b-field>
            <b-autocomplete
                v-model="name"
                :placeholder="content.groupEditPopupForm.placeholders.location"
                :data="filteredDataObj"
                @input="$emit('changeLocation', setLocation())"
                required
                :pattern="filteredDataObj"
                :open-on-focus="true"
                :validation-message="content.groupEditPopupForm.validation.location"
            >
              <template slot="empty">{{$root.content.groupPopupForm.validation.noFound}}</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    props: ['location'],
    async mounted() {
      this.getCountries() 
      
    },
    data() {
      return {
        data: false,
        name: '',
        // selected: null
      }
    },
    watch: {
      name(){
        this.updateCountry(this.name)
        return null
      },
      location(){
        this.name = this.$props.location
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