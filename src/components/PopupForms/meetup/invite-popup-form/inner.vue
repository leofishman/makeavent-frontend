<template>
    <section class="group-steps stuff-popup-form">
        <div v-if="isLoading">
            <b-loading style="margin:15px" class="loading-overlay--dark" :is-full-page="false" :active="true" :can-cancel="false"></b-loading>
        </div>
        <div v-else>
            <h2 class="title">{{content.labels.invite}}</h2>
            <b-field class="stuff-field__link">
                <div class="input-disabled">
                    <input class="input-disabled__inner" :value="link" readonly>
                    <div class="input-disabled__copt-btn-wrap">
                        <b-tooltip :label="$root.content.globalForms.labels.copy" type="is-black" position="is-top" :class="isActive ? 'is-active': ''">
                            <button class="input-disabled__copt-btn" @click="copy">{{$root.content.globalForms.buttons.copy}}</button>
                        </b-tooltip>
                    </div>
                </div> 
            </b-field>
            <p>{{content.hintByLink}}</p>

            <section style="margin-top:20px">
                <h2 class="title">{{content.labels.inviteByEmail}}</h2>
                <b-field>
                    <b-taginput
                        v-model="tags"
                        autocomplete
                        :allow-new="allowNew"
                        :open-on-focus="openOnFocus"
                        field="user.email"
                        icon="label"
                        :placeholder="content.labels.addEmail"
                        >
                    </b-taginput>
                </b-field>
                <span>{{content.pressEnter}}</span>
            </section>
            <div v-if="tags.length" class="columns" style="margin-top:10px">
                <div class="column is-3">
                    <b-button class="button is-success is-outlined submit-button" @click="submit">{{$root.content.common.submit}}</b-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import MeetupFormRoutes from '@/store/routes/meetup-form'
import {mapActions} from 'vuex'

export default {
    data(){
        return {
            link: '',
            isActive: false,
            isSelectOnly: false,
            tags: [],
            allowNew: true,
            openOnFocus: false,
            isLoading: false
        }
    },
    computed: {
        content () {
            return this.$root.content.inviteSpeaker
        }
    },
    async mounted(){
        const obj = {
            role: 'speaker',
            userId: this.$root.profile._id,
            id: this.$root.meetup._id
        }
        const res = await MeetupFormRoutes.postCreateInviteLink(obj);
        //this.link = res.data
        this.link = res.data.replace('https://app.makeavent.com/', 'https://demo.makeavent.com/')
    },
    methods: {
        ...mapActions(['getMeetupById']),
        copy() {
            var copyText = document.querySelector('.stuff-field__link .input-disabled__inner')
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            /* Copy the text inside the text field */
            document.execCommand("copy");
            this.isActive = true
            setTimeout(() => this.isActive = false, 1000)
        },
        async submit () {
            this.isLoading = true
            const data = {
                emails: this.tags,
                role: 'speaker',
                id: this.$root.meetup._id
            }
            try {
                await MeetupFormRoutes.postInviteByEmail(data)

                await this.getMeetupById({ id: this.$root.meetup._id })

                this.isLoading = false
                this.tags = []
                this.$buefy.dialog.confirm({
                    title: this.$root.content.common.success,
                    message: this.content.successMessage,
                    cancelText: '',
                    canCancel: false,
                })
            }
            catch (e) {
                this.isLoading = false
                this.tags = []
                this.$root.createError(this.content.ErrorMessages[13], 'oops')
            }
        }
    }
}
</script>
<style lang="scss">
    .input-disabled {
        background: #F3F3F3;
        border: 0.5px solid #7E7E7E;
        box-sizing: border-box;
        border-radius: 3px;
        position: relative;
        height: 40px;
        padding: 5px 15px;
        display: flex;
        align-items: center;
    }
    .input-disabled__copt-btn-wrap {
        display: flex;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: 5px;     
    }
    .input-disabled__copt-btn-wrap .b-tooltip {
        &::before, &::after {
            transition: all .3s ease-in-out;
            opacity: 0 !important;
        } 
    }
    .input-disabled__copt-btn-wrap .b-tooltip.is-active {
        &::before, &::after {
            opacity: 1 !important;
        }         
    }
    .input-disabled__copt-btn {
        text-align: center;
        width: 111px;
        height: 25.71px;
        background: rgba(75, 75, 75, 0.32);
        border-radius: 3px;   
        font-weight: 600;
        font-size: 18px;
        line-height: 1em;
        letter-spacing: -0.015em;
        color: #FFFFFF;
        border: 0px;
        cursor: pointer;
        transition: all .3s ease-in-out;
        &:hover {
            background: rgba(75, 75, 75, 0.5);
        }
    }
    .input-disabled__inner {
        width: calc(100% - 111px);
        height: 100%;
        border: 0;
        background-color: transparent;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.015em;
        color: #4B4B4B;        
        font-family: 'Montserrat';
        outline: 0px;
        -webkit-touch-callout: none; 
        -webkit-user-select: none;  
        -khtml-user-select: none; 
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &::selection {
            color: #4B4B4B;
            background: transparent;
        }
    }
</style> 