<template>
    <div id="investors">
        <navbar></navbar>

        <div class="container">
        
            <Pagetitle data="Investors"/>

            <section class="section section-investors">
                <div class="columns is-multiline">
                    <div v-if="displayContent"  class="column is-full">
                        <Investorsrow
                            v-for="(el, index) in $root.Investors"
                            :key="index"
                            :data="el"
                        />
                    </div>
                </div>

            </section>
        </div>
    </div>
</template>

<script>
import Investorsrow from '@/components/Investors/Investorsrow.vue'

import axios from 'axios'
import {host, self} from '@/env'

export default {
    name: "Investors",
    components: {
        Investorsrow
    },
    props: {
        data: String
    },
    data () {
        this.activiness = []

        this.$root.check('usertype token Investors').then(async _ => {
            if ( this.$root.checkComponentAccess('invstorslist') ) {
                this.adInfoToInvestor()

                
            }  
        })

        return {
            displayContent: false,
        }
    },
    methods: {
        adInfoToInvestor () {
            this.$root.Investors.map(async el => {
                if (!el.photo)
                    el.photo = host + this.$root.tryGetProfilePhoto(el.email)
                else
                    el.photo = host + el.photo

                el.companyLogo = host + await this.$root.tryGetCompanyLogo(el.company)

                this.displayContent = true
            })
        },

        openPage (link) {
            this.$router.push(link.split(self)[1])
        }
    }
}
</script>

<style scoped>

</style>