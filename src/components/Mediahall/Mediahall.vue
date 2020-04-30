<template>
    <div id="media-hall">
		<navbar></navbar>
		<div class="container">
			<Pagetitle :data="content.title"/>

			<section class="section section-media-hall">

				<div class="columns">
					<div class="column is-3-desktop is-2-widescreen is-offset-1-widescreen">
						<div class="tile is-vertical">
							<Mediahalllogo data="1"/>
							<Mediahalllogo data="2"/>
							<Mediahalllogo data="3"/>
						</div>
					</div>
					<div class="column is-half">
						<div class="tile is-child">
							<h2 class="">{{content.wli}}</h2>
							<div @click="ongoingInterviews = true" class="watch-interview" >
							</div>
							

							<div class="upcoming-interview" @click="upcommingInterviews = true">
								<h3>{{content.ui}}</h3>
							</div>
                        
						</div>
					</div>
					<div class="column is-3-desktop is-2-widescreen">
						<div class="tile is-vertical">
							<Mediahalllogo data="4"/>
							<Mediahalllogo data="5"/>
							<Mediahalllogo data="6"/>
						</div>
					</div>

				</div>
			</section>
		</div>

        <!-- Modal -->
        <b-modal :active.sync="upcommingInterviews" scroll="keep">
            <UpcommingInterviews />
        </b-modal>

        <!-- Modal -->
        <b-modal :active.sync="ongoingInterviews" scroll="keep">
            <OngoingInterviews />
        </b-modal>
	</div>
</template>
<script>
import Pagetitle from '@/components/Pagetitle.vue';
import Mediahalllogo from '@/components/Mediahall/Mediahalllogo.vue';
import UpcommingInterviews from '@/components/Mediahall/UpcommingInterviews.vue'
import OngoingInterviews from '@/components/Mediahall/OngoingInterviews.vue'

export default {
    name: "Mediahall",
    components: {
        Pagetitle,
        Mediahalllogo,
        UpcommingInterviews,
        OngoingInterviews
    },
    props: {
        data: String
    },
    data () {
        return {
            isImageModalActive: false,
            upcommingInterviews: false,
            ongoingInterviews: false,

            content: this.$root.content.Mediahall
        }
    }
}
</script>