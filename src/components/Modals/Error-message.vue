<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">{{title}}</p>
            </header>
            <section class="modal-card-body">
                <p>{{text}}</p>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
            </footer>
        </div>
    </form>
</template>
<script>
export default {
    props: {
        errorMessage: String,
        text: String
    },
    data() {
        return {
            title: this.$root.content.ErrorMessageModal[this.errorMessage],
            opened: true
        }
    },
}
</script>