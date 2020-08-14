<template>
  <div class="stuff-list">
        <input-row 
            v-for="(stuffItem, index) of stuffArray"
            :key="index"
            :index="index"
            :stuffItem="stuffItem"
            :updated="updated"
            @submitDisabled="pushValidArray"
            @removeItem="removeItem"
        />
    </div>
</template>

<script>
import inputRow from './inputRow'

export default {
    props: ['stuffArray', 'updated'],
    components: {
        inputRow
    },
    watch: {
        stuffArray(array){
            if(this.isAdd){
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
    data() {
        return {
            validArray: [],
            isAdd: true
        }
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
            let arr = this.$props.stuffArray
            this.isAdd = false
            arr = arr.splice(index, 1)
            this.validArray = this.validArray.splice(index, 1)
        }
    }
}
</script>

<style>

</style>