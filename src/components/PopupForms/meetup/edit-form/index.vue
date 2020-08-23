<template>
  <!-- <div class="group-popup-form-wrap edit-form">
    <div class="group-popup-form">
      <div class="group-popup-form__content">
        <edit-form/>
      </div>
    </div>
  </div>   -->
  <wrap v-if="show" @close="close" class="group-popup-form--edit-from">     
    <p slot="title">{{$root.content.groupEditPopupForm.title}}</p>
    <template slot="inner-from" >
      <section>
        <edit-form />
      </section>
    </template>    
  </wrap>
</template>

<script>
import EditForm from './ui/edit-form'
import wrap from '@/components/Global/popup-form'

export default {
  name: 'MeetupPopupForm',
  data(){
    return {
      show: true
    }
  },
  methods: {
    close(){
      this.show = false
    }
  },
  components: {
    EditForm,
    wrap
  }
}
</script>
