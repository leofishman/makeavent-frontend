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

export default {
  name: 'GroupPopupForm',
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
