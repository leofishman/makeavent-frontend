<template>    
    <div class="group-popup-form-wrap">
        <div class="group-popup-form">
            <div class="group-popup-form__header">
                <p><slot name="title"></slot></p>
                <!-- <img class="close" src="@/assets/icon/steps-close.png"> -->
                <svg class="close" @click="close" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.97 9.50061L17.5386 3.6227C18.1538 2.97325 18.1538 1.92034 17.5386 1.2719L16.7962 0.488304C16.1807 -0.161347 15.1832 -0.161347 14.5689 0.488304L9.00058 6.36601L3.43203 0.487086C2.81677 -0.162362 1.81927 -0.162362 1.20496 0.487086L0.46145 1.27069C-0.153817 1.92034 -0.153817 2.97325 0.46145 3.62169L6.03096 9.50061L0.462603 15.3783C-0.152855 16.028 -0.152855 17.0809 0.462603 17.7293L1.20496 18.5129C1.82023 19.1624 2.81773 19.1624 3.43203 18.5129L9.00058 12.635L14.5689 18.5129C15.1844 19.1624 16.1819 19.1624 16.7962 18.5129L17.5386 17.7293C18.1538 17.0797 18.1538 16.0267 17.5386 15.3783L11.97 9.50061Z" fill="#4B4B4B" fill-opacity="0.64"/>
                </svg>

            </div>
            <div class="group-popup-form__content">
                <slot name="inner-from"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  methods: {
    close(){
      this.$emit('close')
    }
  },
}
</script>