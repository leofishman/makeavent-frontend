<template>
    <div class="modal-card demo-modal">
		<header class="modal-card-head">
			<p class="modal-card-title"><span class="is-capitalized">{{content.title}}</span></p>
		</header>
		<section class="modal-card-body">
            <b-field
                :type="nameCheck"
                :message="nameCheckMessage"
                :label="content.nameLabel"
            >
                <b-input type="text" v-model="name" :aria-placeholder="content.namePlaceholder"></b-input>
            </b-field>
            <b-field :label="content.urlLabel">
                <b-input v-model="url" :aria-placeholder="content.urlPlaceholder"></b-input>
            </b-field>
		</section>
        <footer class="modal-card-foot">
            <b-button
                class="is-daner submit-button"
                v-on:click="closePopup"
            >{{$root.content.common.cancel}}</b-button>
            
            <b-button
                class="is-primary submit-button"  
                :disabled="confirmDisabled"
                v-on:click="checkUrl"
            >{{$root.content.common.confirm}}</b-button>
        </footer>
	</div>
</template>
<script>
import router from '@/store/routes/meetup-form'

import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EditStreams",
    computed: {
        content () {
            return this.$root.content.adminSidebar.items.streaming.addNewModal
        }
    },
    data() {
        return {
            name: '',
            url: '',
            confirmDisabled: true,
            nameCheck: '',
            nameCheckMessage: ''
        }
    },
    methods: {
		...mapActions(['getMeetupById']),
        addStreamingSource () {
            router.addStreamingSource({
                id: this.$root.meetup._id,
                sourceName: this.name,
                url: this.url
            })
            .then((result) => {
                this.$buefy.dialog.confirm({
                    title: this.$root.content.common.success,
                    message: this.content.successMessage,
                    cancelText: '',
                    canCancel: false,
                    onConfirm: async () => {
                        window.EventBus.$emit('reload-streaming-sources')
                        this.$parent.close()
                    }
                })
            }).catch((err) => {
                this.$root.createError(this.$root.content.ErrorMessages[11], 'oops')
            });
        },

        checkUrl () {
            if (this.url.indexOf('rtmp://') == -1) {
                this.$buefy.dialog.confirm({
                    title: this.content.warn,
                    message: this.content.warnDetails,
                    cancelText: this.$root.content.common.cancel,
                    canCancel: true,
                    confirmText: this.$root.content.common.confirm,
                    onConfirm: () => {
                        this.addStreamingSource()
                    }
                })
            }
            else {
                this.addStreamingSource()
            }
        },

        closePopup () {
            this.$parent.close()
        }
    },
    watch: {
        url () {
            if (this.url && this.name) {
                this.confirmDisabled = false
            }
        },

        name () {
            let res;
            this.$store.state.meetupForm.streamingSources.filter(el => {
                if ( el.name.toLowerCase() == this.name.toLowerCase() ) {
                    this.confirmDisabled = true
                    res = true
                }
            })

            if ( res ) {
                this.nameCheck = 'is-danger'
                this.nameCheckMessage = this.content.nameCheckFailed
            }
            else {
                this.nameCheck = ''
                this.nameCheckMessage = ''
            }
        }
    },
}
</script>