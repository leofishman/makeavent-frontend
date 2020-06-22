<template>
	<div id="media-hall">
		<navbar></navbar>
		<div class="container">
			<Pagetitle :data="content.title"/>

			<section class="section section-media-hall">
				<div class="columns is-multiline is-mobile">
					<Mediahalllogo data="15"/><!-- Cointelegraph CT -->
					<Mediahalllogo data="13"/><!-- Coin gecko -->
					<Mediahalllogo data="22"/><!-- Cointelegraph español -->
					<Mediahalllogo data="1"/><!-- Cripto noticias -->
					<Mediahalllogo data="3"/><!-- Coincodex -->
					<Mediahalllogo data="0"/><!-- AMB -->
					<Mediahalllogo data="2"/><!-- Cointeligence -->
					<Mediahalllogo data="9"/><!-- Cointeligence -->
					<Mediahalllogo data="24"/><!-- Cointelegraph italy -->
					<Mediahalllogo data="12"/><!-- Super crypto news -->
					<Mediahalllogo data="10"/><!-- Crypto potato -->
					<Mediahalllogo data="18"/><!-- News BTC -->
					<Mediahalllogo data="11"/><!-- techie scoops -->
					<Mediahalllogo data="6"/><!-- Bitcoin mexico -->
					<Mediahalllogo data="14"/><!-- Coinmonks -->
					<Mediahalllogo data="23"/><!-- Coindoo -->
					<Mediahalllogo data="16"/><!-- Bitcoin Garden -->
					<Mediahalllogo data="19"/><!-- Hegion -->
					<Mediahalllogo data="17"/><!-- Satoshienvzla -->
					<Mediahalllogo data="4"/><!-- Blockchain .news -->
					<Mediahalllogo data="8"/><!-- Event chain -->
					<Mediahalllogo data="5"/><!-- Blockchain caffe -->
					<Mediahalllogo data="7"/><!-- Koin post -->
					<Mediahalllogo data="20"/><!-- Listing.help -->
					<Mediahalllogo data="21"/><!-- Theta -->
					<Mediahalllogo data="26"/><!-- NAME -->
					<Mediahalllogo data="25"/><!-- NAME -->
					<Mediahalllogo data="28"/><!-- NAME -->
					<Mediahalllogo data="29"/><!-- NAME -->
					<Mediahalllogo data="30"/><!-- NAME -->
					<Mediahalllogo data="31"/><!-- NAME -->
					<Mediahalllogo data="32"/><!-- NAME -->
					<Mediahalllogo data="33"/><!-- NAME -->
					<Mediahalllogo data="34"/><!-- NAME -->
					<Mediahalllogo data="35"/><!-- NAME -->
					<Mediahalllogo data="36"/><!-- NAME -->
					<Mediahalllogo data="37"/><!-- NAME -->
					<Mediahalllogo data="38"/><!-- NAME -->
					<Mediahalllogo data="39"/><!-- NAME -->
					<Mediahalllogo data="40"/><!-- NAME -->
				</div>
			</section>
		</div>

		<!-- <b-modal :active.sync="upcommingInterviews" scroll="keep">
			<UpcommingInterviews />
		</b-modal>

		<b-modal :active.sync="ongoingInterviews" scroll="keep">
			<OngoingInterviews />
		</b-modal> -->
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
