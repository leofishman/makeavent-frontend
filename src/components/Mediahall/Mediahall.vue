<template>
	<div id="media-hall">
		<navbar></navbar>
		<div class="container">
			<Pagetitle :data="content.title"/>

			<section class="section section-media-hall">
				<div class="columns">
					<div class="column">
						<div class="tile">
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="1"/>
								<Mediahalllogo data="2"/>
								<Mediahalllogo data="3"/>
								<Mediahalllogo data="4"/>
								<Mediahalllogo data="5"/>
							</div>
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="6"/>
								<Mediahalllogo data="7"/>
								<Mediahalllogo data="8"/>
								<Mediahalllogo data="9"/>
								<Mediahalllogo data="10"/>
							</div>
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="11"/>
								<Mediahalllogo data="12"/>
								<Mediahalllogo data="13"/>
								<Mediahalllogo data="14"/>
								<Mediahalllogo data="15"/>
							</div>
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="16"/>
								<Mediahalllogo data="17"/>
								<Mediahalllogo data="18"/>
								<Mediahalllogo data="19"/>
								<Mediahalllogo data="20"/>
							</div>
						</div>
					</div>

					<div class="column is-one-fifths">
						<div class="tile is-child">
							<h2 class="">{{content.wli}}</h2>
							<!-- [YD] If inactive add watch-interview-inactive class-->
							<div @click="ongoingInterviews = true" class="watch-interview"></div>

							<div class="upcoming-interview" @click="upcommingInterviews = true">
								<h3>{{content.ui}}</h3>
							</div>

						</div>
					</div>
					
					<div class="column">
						<div class="tile">
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="21"/>
								<Mediahalllogo data="22"/>
								<Mediahalllogo data="23"/>
								<Mediahalllogo data="24"/>
								<Mediahalllogo data="25"/>
							</div>
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="26"/>
								<Mediahalllogo data="27"/>
								<Mediahalllogo data="28"/>
								<Mediahalllogo data="29"/>
								<Mediahalllogo data="30"/>
							</div>
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="31"/>
								<Mediahalllogo data="32"/>
								<Mediahalllogo data="33"/>
								<Mediahalllogo data="34"/>
								<Mediahalllogo data="35"/>
							</div>
							<div class="tile is-parent is-vertical">
								<Mediahalllogo data="36"/>
								<Mediahalllogo data="37"/>
								<Mediahalllogo data="38"/>
								<Mediahalllogo data="39"/>
								<Mediahalllogo data="40"/>
							</div>
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