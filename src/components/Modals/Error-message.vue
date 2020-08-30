<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title" v-html="title"></p>
            </header>
            <section class="modal-card-body">
                <p v-html="text"></p>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="close">{{$root.content.common.close}}</button>
            </footer>
        </div>
    </form>
</template>
<script>
export default {
    props: {
        errorMessage: String,
        text: String,
        cancelEvent: String
    },
    data() {
        return {
            title: this.$root.content.ErrorMessageModal[this.errorMessage],
            opened: true
        }
    },
    methods: {
        close () {
            if ( this.cancelEvent ) {
                window.EventBus.$emit(this.cancelEvent)
            }
            this.$parent.close()
        }
    },
}
</script>