<template>
    <section>
        <b-field v-if="!_.isEmpty(this.allSubInterests)">
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                @typing="getFilteredTags"
                @input="addTag"
                :open-on-focus="true"
                :before-adding="beforeAdding"
                >
                <template slot="empty">
                    {{$root.content.groupPopupForm.validation.noItems}}
                </template>
            </b-taginput>
        </b-field>
        <p v-if="_.isEmpty(this.allSubInterests)">{{$root.content.groupPopupForm.validation.noItems}}</p>
    </section>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    props: ['interest'],
    data() {
      return {
        filteredTags: this.allSubInterests,
        isSelectOnly: false,
        tags: [],
      }
    },
    methods: {
      ...mapActions(['getSubInterests', 'setSubInterest']),
      updateSubInterest(e){        
          this.setSubInterest(e)
          return false
      },
      getFilteredTags(text) {
        const allSubInterests = this.$store.getters.allSubInterests
        
        if(allSubInterests){
          if (typeof allSubInterests !== 'string') { 
            if(this.tags.length) {
              this.filteredTags = allSubInterests.filter((option) => {
                return option
                  .toString()
                  .toLowerCase()
                  .indexOf(text.toLowerCase()) >= 0
              })
            } else {
              this.filteredTags = allSubInterests
            }          
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
        setTimeout(() => {
          if(this._.isEmpty(this.allSubInterests)){
            this.$emit('changeSubInterets','empty')
          } else {
            this.getFilteredTags()
          }
        }, 200)
      }
    },
    computed: mapGetters(['allSubInterests'])
  }
</script>
