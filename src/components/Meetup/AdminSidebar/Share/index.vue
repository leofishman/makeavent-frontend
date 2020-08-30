<template>
  <section>
      <item class="admin-bar__share">
        <p class="admin-bar__list-item-header" slot="header">{{content.title}}</p>
        <template slot="inner">
            <in-active-button @clicked="copy" class="admin-bar__button" :name="content.buttons.clipboard"/>
            <!-- <in-active-button class="admin-bar__button" :name="content.buttons.invitations"/> -->
            <input :value="link" class="input-disabled__inner" type="text">
            <!-- <socials/> -->
        </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'
import {InActiveButton} from '@/components/Global/controll/'
import Socials from './Socials'
import MeetupFormRoutes from '@/store/routes/meetup-form'

export default {
    components: {
        Socials,
        InActiveButton,
        Item,
    },
    async mounted(){
        const obj = {
            role: 'basic',
            userId: this.$root.profile._id,
            id: this.$root.meetup._id
        }
        const res = await MeetupFormRoutes.postCreateInviteLink(obj);
        this.link = res.data
    },
    data () {
        return {
            link: "",
            content: this.$root.content.adminSidebar.items.share
        }
    },
    methods: {
        copy(){            
            var copyText = document.querySelector('.admin-bar__share .input-disabled__inner')
            copyText.value = this.link
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");

            this.$buefy.notification.open({
                duration: 3000,
                position: 'is-bottom-left',
                message: `
                    <div class="notification-clipboard">
                        <div class="notification-clipboar__icon">
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path d="M30.7347 2.26541C27.7141 -0.755125 22.8171 -0.755125 19.7966 2.26534L13.3323 8.7296C10.2079 11.8541 10.4972 16.8325 13.3323 19.6677C13.8071 20.1424 14.3324 20.5296 14.887 20.8475L16.0669 19.6677C16.8407 18.8937 16.5683 17.989 16.5544 17.3362C16.3845 17.2158 16.2194 17.0856 16.0669 16.9331C14.612 15.4784 14.5465 12.9844 16.0669 11.4641C16.2926 11.2383 22.394 5.13699 22.531 4.99996C24.0391 3.49182 26.4919 3.49182 28 4.99996C29.5082 6.5081 29.5082 8.96086 28 10.469L23.7272 14.7418C23.8508 15.4254 24.5923 17.0449 24.2109 19.7163C24.2295 19.698 24.2518 19.6862 24.2704 19.6678L30.7347 13.2035C33.7551 10.183 33.7551 5.28594 30.7347 2.26541Z" fill="white"/>
                            <path d="M20.1685 12.8312C19.6938 12.3564 19.1685 11.9693 18.6139 11.6514L17.4341 12.8312C16.6602 13.605 16.9325 14.5097 16.9465 15.1626C17.1164 15.283 17.2816 15.4131 17.4341 15.5656C18.889 17.0205 18.9544 19.5143 17.4341 21.0346C17.2078 21.2609 10.6011 27.8676 10.4689 27.9998C8.96079 29.508 6.50802 29.508 4.99989 27.9998C3.49175 26.4917 3.49175 24.0389 4.99989 22.5308L9.77374 17.7569C9.65018 17.0733 8.90858 15.4538 9.29008 12.7824C9.27145 12.8007 9.24902 12.8126 9.23046 12.8311L2.26533 19.7964C-0.75507 22.8169 -0.75507 27.7139 2.26533 30.7345C5.28586 33.7549 10.1828 33.7549 13.2034 30.7345L20.1685 23.7693C23.235 20.7028 23.0674 15.73 20.1685 12.8312Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="33" height="33" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>
                        <div class="notification-clipboar__text">
                            <span>${this.$root.content.common.copiedToClipboard}</span>
                        </div>
                    </div>
                `,
            })
        }
    }
}
</script>
