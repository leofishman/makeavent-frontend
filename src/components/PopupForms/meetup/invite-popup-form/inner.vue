<template>
    <section class="group-steps stuff-popup-form">
        <h2 class="title">{{$root.content.inviteSpeaker.labels.invite}}</h2>
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
    </section>
</template>

<script>
import MeetupFormRoutes from '@/store/routes/meetup-form'
export default {
    data(){
        return {
            link: this.config.server_url+'/meetup/get-invite?link=',
            isActive: false
        }
    },
    async mounted(){
        const obj = {
            role: 'speaker',
            userId: this.$root.profile._id,
            id: this.$root.meetup._id
        }
        const res = await MeetupFormRoutes.postCreateInviteLink(obj);
        this.link = res.data
    },
    methods: {
        copy() {
            var copyText = document.querySelector('.stuff-field__link .input-disabled__inner')
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            /* Copy the text inside the text field */
            document.execCommand("copy");
            this.isActive = true
            setTimeout(() => this.isActive = false, 1000)
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