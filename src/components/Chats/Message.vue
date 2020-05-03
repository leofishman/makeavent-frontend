<template>
    <article :class="messageClass()">
        <div>
            <h3 v-on:click="$root.showBCrequesttoast(data.from, index)">{{data.from.name.split(" ")[0]}}</h3>
            <p class="p-message" v-on:click="showReplyButton(data.from, index)" v-html="data.html"></p>
            <div v-on:click="doReply(data, index)" v-if="showMessageModal === index" class="reply-button" >
                <img width="100%" src="@/assets/img/reply.png" alt="">
            </div>
        </div>
    </article>
</template>
<script>
    export default {
        name: 'Message',
        props: {
            data: Object,
            index: Number,
            contacts: Array,
        },
        data () {
            return {
                showMessageModal: false,
                showQuote: "",
                quotedMessage: "",
                quotedName: "",
                quoteId: "",
            }
        },
        methods: {
        // Just for test
        messageClass () {
            let admins = []
            this.contacts.map(el => {
                admins.push(el.email)
            })

            if (this.$root.isThatMe(this.data.from.email))
                return 'bubble-mine'

            else if (admins.includes(this.data.from.email))
                return 'bubble-admin'

            else
                return 'bubble-remote'
        },

        showReplyButton (from, index) {
            
            this.showQuote = false
            this.quotedMessage = ''
            this.quotedName = ''

            if (from.email != this.$root.profile.email) {
                if (this.showMessageModal === index)
                    this.showMessageModal = false
                
                else 
                    this.showMessageModal = index
            }
        },

        closeReply () {
            this.showQuote = false
            this.quotedMessage = ''
            this.quotedName = ''
            this.quoteId = ''
            this.showMessageModal = false
        },

        doReply (el, index) {
            this.showMessageModal = false
            this.showQuote = true
            this.quotedMessage = el.message
            this.quotedName = el.from.name.split(" ")[0]
            this.quoteId = el.id

            window.EventBus.$emit('reply-to-message', {
                showMessageModal: this.showMessageModal,
                showQuote: this.showQuote,
                quotedMessage: this.quotedMessage,
                quotedName: this.quotedName,
                quoteId: this.quoteId,
            })
        },
    },
}
</script>
<style lang="scss" scpoed>
.quoted-answer {
    padding: 0px !important;
    font-style: italic;
    border-bottom: 1px solid #c6c6c6;
}
</style>