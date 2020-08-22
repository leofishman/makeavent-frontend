<template>
  <div v-if="!_.isEmpty(allSubInterests)">
    <h2 class="title">{{$root.content.groupEditPopupForm.labels.subinterest}}</h2>
    <section>
        <b-field>
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                @typing="getFilteredTags"
                @input="addTag"
                :open-on-focus="openOnFocus"
                :before-adding="beforeAdding"
                >
                <template slot="empty">
                    {{$root.content.groupPopupForm.validation.noItems}}
                </template>
            </b-taginput>
        </b-field>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    props: ['interest', 'subInterest'],
    data() {
      return {
        filteredTags: [],
        isSelectOnly: false,
        tags: [],
        openOnFocus: true
      }
    },
    methods: {
      ...mapActions(['getSubInterests', 'setSubInterest']),
      updateSubInterest(e){ 
          if(!e) this.setSubInterest([])
          else this.setSubInterest(e)
          return false
      },
      getFilteredTags(text) {
        if(this.openOnFocus) this.openOnFocus = false
        else this.openOnFocus = true
        
        const allSubInterests = this.$store.getters.allSubInterests
        
        if(allSubInterests){
          if (typeof this.allSubInterests !== 'string') {            
            this.filteredTags = this.allSubInterests.filter((option) => {
              return option
                .toString()
                .toLowerCase()
                .indexOf(text.toLowerCase()) >= 0
            })
          }
        }
      },
    	beforeAdding(tag) {
    		return this.allSubInterests.includes(tag)
      },
      addTag(){
        this.filteredTags = this.$store.getters.allSubInterests
        this.filteredTags = this._.difference(this.filteredTags, this.tags);
        this.$emit('changeSubInterets', this.tags )
      },
    },
    watch: {
      tags(){
        this.updateSubInterest(this.tags)
        return false
      },
      interest: function () {
        this.tags = []    
        const interestObj = {
          interest: this.$props.interest
        }
          
        this.getSubInterests(interestObj).then(res => {
          this.filteredTags = this.$store.getters.allSubInterests
          if(this._.isEmpty(this.filteredTags)) {            
            this.$emit('changeSubInterets', 'empty')
          }
        })
      },
      subInterest() {
        this.tags = this.$props.subInterest
      }
    },
    computed: mapGetters(['allSubInterests'])
  }
</script>
