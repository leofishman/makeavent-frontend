<template>
    <section>
        <b-field>
            <b-autocomplete
                v-model="name"
                :placeholder="content.groupPopupForm.placeholders.interest"
                :data="filteredDataObj"
                @input="$emit('changeInterets', updateInterets(name))"
                required
                :pattern="filteredDataObj"
                :validation-message="content.groupPopupForm.validation.interest"
                :open-on-focus="true"
            >
                <template slot="empty">{{$root.content.groupPopupForm.validation.noFound}}</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    async mounted() {
      this.fetchInterests() 
    },
    data() {
      return {
        data: false,
        name: '',
        // selected: null
      }
    },
    // watch: {
    //   name(){
    //     this.updateInterest(this.selected)
    //   }
    // },
    methods: {
      ...mapActions(['fetchInterests','setInterest']),
      // updateInterest(){   
      //   return false
      // },
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