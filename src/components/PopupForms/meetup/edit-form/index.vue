<template>
  <wrap class="group-popup-form--edit-from">     
    <p slot="title">{{$root.content.groupEditPopupForm.title}}</p>
    <template slot="inner-from" >
      <section>
        <edit-form :id="this.id"/>
      </section>
    </template>    
  </wrap>
</template>

<script>
import EditForm from './ui/edit-form'
import wrap from '@/components/Global/popup-form'

export default {
  name: 'MeetupPopupForm',
  props: {
    id: String,
  },
  components: {
    EditForm,
    wrap
  }
}
</script>
