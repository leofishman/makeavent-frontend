<template>
    <section>
        <b-field>
            <b-autocomplete
                v-model="name"
                :placeholder="content.groupEditPopupForm.placeholders.interest"
                :data="filteredDataObj"
                @input="$emit('changeInterets', updateInterets(name))"
                required
                :pattern="filteredDataObj"
                :open-on-focus="true"
                :validation-message="content.groupEditPopupForm.validation.interest"
            >
                <template slot="empty">{{$root.content.groupPopupForm.validation.noFound}}</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    props: ['interest'],
    async mounted() {
      this.fetchInterests() 
    },
    data() {
      return {
        data: false,
        name: 'Arts & Culture',
        // selected: null
      }
    },
    watch: {
      name(){
        this.updateInterest(this.selected)
      },
      interest(){
        this.name = this.$props.interest
      }
    },
    methods: {
      ...mapActions(['fetchInterests','setInterest']),
      updateInterest(){   
        return false
      },
      updateInterets(e){           
        this.setInterest(e)    
        return this.name
      }
    },
    computed: {
      filteredDataObj() {              
        const allInterests = this.$store.getters.allInterests
        if (allInterests){
          this.data = allInterests
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