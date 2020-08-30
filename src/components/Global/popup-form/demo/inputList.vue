<template>
  <div class="stuff-list">
      <input-row 
        v-for="(demosItem, index) of demosArray" 
        :key="index"  
        :index="index"  
        :demosItem="demosItem"  
        @submitDisabled="pushValidArray"
        @removeItem="removeItem"
    />
  </div>
</template>

<script>
import inputRow from './inputRow'

export default {
    props: ['demosArray', 'updated'],
    data() {
        return {
            validArray: [],
            isAdd: true
        }  
    },
    watch: {
        demosArray(array){
            if ( this.isAdd ) {
                const index = array.length-1
                const submitDisabled = ! array[index].name.length > 0

                const obj = {
                    index: index,
                    submitDisabled: submitDisabled
                }
                this.pushValidArray(obj)
            } else {
                this.isAdd = true
            }
        }
    },
    components: {
        inputRow
    },
    methods: {
        pushValidArray(val) {
            const arr = this.validArray
            const index = this._.findIndex(arr, ['index', val.index]);

            if(index !== -1 && arr.length > 0) {             
                arr[index] = val
            } else {                     
                arr.push(val)
            }

            const valid = this._.findIndex(arr, ['submitDisabled', true]) 
            
            this.$emit('checkArr', valid >= 0)
            if (valid >= 0) {
                this.$emit('saveArr', this.validArray)
            }
        },
        removeItem(index) {
            let arr = this.$props.demosArray
            this.isAdd = false
            arr = arr.splice(index, 1)
            this.validArray = this.validArray.splice(index, 1)
        }
    }
}
</script>

<style>

</style>