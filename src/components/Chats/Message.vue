<template>
    <article :class="messageClass()">
        <div>
            
            <span v-on:click="$root.tryBusinessCard(data.from, index)" class="click is-dark-changeable--color">
                {{data.from.name.split(" ")[0]}}
            </span>

            <b-tooltip
                :label="$root.content.common.replyHint"
                :active="showMessageModal === index"
                position="is-bottom"
                always
                type="is-black"
                class="reply-button"
            >
                <p
                    :id="data.id"
                    class="p-message is-light-changeable--bg distinct-color invert-color"
                    v-on:click="showReplyButton(data.from, index)"
                    v-html="data.html"
                    v-bind:class="{ us_sel: this.allowCopy }">
                </p>
                <a class="message-time is-dark-changeable--color" v-if="data.time">
                    {{new Date(data.time).getHours()}}:{{new Date(data.time).getMinutes()}}:{{new Date(data.time).getSeconds()}}
                </a>
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
            parentChat: String
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
                admins.push(el)
            })

            if (this.$root.isThatMe(this.data.from._id))
                return 'bubble-mine'

            else if (admins.includes(this.data.from._id))
                return 'bubble-admin'

            else
                return 'bubble-remote'
        },

        showReplyButton (from, index) {
            
            this.showQuote = false
            this.quotedMessage = ''
            this.quotedName = ''

            if (!compare(from._id, this.$root.profile._id)) {
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
                chat: this.parentChat,
                data: {
                    showMessageModal: this.showMessageModal,
                    showQuote: this.showQuote,
                    quotedMessage: this.quotedMessage,
                    quotedName: this.quotedName,
                    quoteId: this.quoteId,
                    time: new Date()
                }
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
    },
    computed: {
      allowCopy() {
        return this.data.link;
      }
    }
}
</script>
<style lang="scss" scpoed>
  .us_sel {
    user-select: text;
  }
</style>