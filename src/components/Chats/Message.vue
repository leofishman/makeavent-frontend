<template>
    <article :class="messageClass()">
        <div>
            <h3 v-on:click="$root.tryBusinessCard(data.from, index)">{{data.from.name.split(" ")[0]}}</h3>
            <b-tooltip
                :label="$root.content.common.replyHint"
                :active="showMessageModal === index"
                position="is-right"
                always
                class="reply-button"
            >
                <p :id="data.id" class="p-message" v-on:click="showReplyButton(data.from, index)" v-html="data.html">
                </p>
            </b-tooltip>
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
            let self = this

            window.EventBus.$on('close-reply', (msg) => {
                this.showQuote = false
                this.quotedMessage = ''
                this.quotedName = ''
                this.quoteId = ''
                this.showMessageModal = false
            })

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
    mounted () {
        let self = this
        document.getElementById(this.data.id).addEventListener('contextmenu', function(ev) {
            ev.preventDefault();
            
            self.doReply(self.data, self.index)

            return false;
        }, false);
    }
}
</script>
<style lang="scss" scpoed>
.quoted-answer {
    padding: 0px !important;
    font-style: italic;
    border-bottom: 1px solid #c6c6c6;
}
</style>