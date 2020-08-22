<template>
  <div class="group-popup-form-wrap edit-form">
    <div class="group-popup-form">
      <div class="group-popup-form__content">
        <edit-form/>
      </div>
    </div>
  </div>
</template>

<script>
import EditForm from './ui/edit-form'
import eng from '@/english'

export default {
  name: 'GroupPopupForm',
  data(){
    return {
      content: eng
    }
  },
  methods: {
    close(){
      this.show = false
    }
  },
  components: {
    EditForm
  }
}
</script>
