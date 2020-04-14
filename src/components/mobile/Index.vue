<template>
    <b-container fluid="lg" style="padding-top:30px;">
        <!-- <b-row style="margin: 0px 0px;" class="justify-content-md-center">
            <b-col md="3">
                <img class="main-logo" src="../../assets/logo.svg" alt="">
            </b-col>
            <b-col md="2">
                <div v-on:click="navToPage()" class="hall-block" style="line-height:90px; background:#b8bfe6">
                    <strong>
                    MAIN STAGE<br>
                    DIAMOND SPONSOR
                    </strong>
                    <img class="absolute-bg-image stage" src="../../assets/img/stage.png" alt="">
                </div>
            </b-col>
            <b-col md="2">
                <div v-on:click="navToPage()" class="hall-block coffee" style="line-height:90px">
                    <strong>
                    e-COFFEE BREAK<br>
                    DIAMOND SPONSOR
                    </strong>
                    <img class="absolute-bg-image" src="../../assets/img/coffee.png" alt="">
                </div>
            </b-col>
            <b-col md="2">
                <div v-on:click="navToPage()" class="hall-block" style="line-height:90px; background:#c0eac6">
                    <strong>
                    SECOND STAGE<br>
                    DIAMOND SPONSOR
                    </strong>
                    <img class="absolute-bg-image stage" src="../../assets/img/stage.png" alt="">
                </div>
            </b-col>
            <b-col md="2">
                <div v-on:click="navToPage()" class="hall-block vip" style="line-height:90px">
                    <strong>
                    VIP e-MEETING ROOM<br>
                    DIAMOND SPONSOR
                    </strong>
                    <img class="absolute-bg-image vip" src="../../assets/img/vip.png" alt="">
                </div>
            </b-col>
        </b-row>

	  	<b-row>
			<span class="sponsor-type-bg">GOLD Sponsors</span>
			<b-col>
				<div v-on:click="navToPage()" style="margin-top:10px;" class="hall-block">
					<img class="sponsor-image" src="" alt="">
				</div>
			</b-col>
			<b-col>
				<div v-on:click="navToPage()" style="margin-top:10px;" class="hall-block">
					<img class="sponsor-image" src="" alt="">
				</div>
			</b-col>
		</b-row>

        <b-row style="margin: 0px">
            <span class="sponsor-type-bg">SILVER Sponsors</span>
            <b-col v-on:click="navToPage()" md="4" class="nopadding">
                <div class="hall-block small-margin">
                    <img class="sponsor-image" src="../../assets/img/sponsors/FAS/FAS.png" alt="">
                </div>
            </b-col>
            <b-col v-on:click="navToPage()" md="4" class="nopadding">
                <div class="hall-block small-margin">
                    <img class="sponsor-image" src="" alt="">
                </div>
            </b-col>
            <b-col v-on:click="navToPage()" md="4" class="nopadding">
                <div class="hall-block small-margin">
                    <img class="sponsor-image" src="../../assets/img/sponsors/CRYPTTP/CRYPTTP.png" alt="">
                </div>
            </b-col>
        </b-row>

        <b-row style="margin-top:15px;">
            <b-col v-on:click="navToPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
        </b-row>
            
        <b-row style="margin-top:15px;">
            <b-col v-on:click="navToPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
        </b-row>

        <b-row style="margin-top:15px;">
            <b-col v-on:click="navToPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
            <b-col v-on:click="navToPage()" md="6" class="hall-block small-margin wide-sponsor">Bronze sponsor</b-col>
        </b-row>

        <div v-if="narov()">
            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>
        </div>
        <div v-else>
            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row stlye="margin-top:15px">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>

            <b-row style="margin-top:15px;">
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
                <b-col v-on:click="navToPage()" class="hall-block small-margin small-sponsor"></b-col>
            </b-row>
        </div>


        <b-row v-if="narov()" style="margin-top:20px">
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
            <b-col v-on:click="navToPage()" class="hall-block micro-sponsor"></b-col>
        </b-row>
        <b-row v-else style="margin:20px 0px 0px 5px">
            <b-dropdown id="dropdown-1" text="Other booths">
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 1</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 2</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 3</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 4</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 5</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 6</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 7</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 8</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 9</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 10</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 11</b-dropdown-item>
                <b-dropdown-item v-on:click="navToPage()">Micro Booth 12</b-dropdown-item>
            </b-dropdown>
        </b-row> -->
    </b-container>
</template>
<script>
export default {
	name: "mobile",
	methods: {
		navToPage (name) {
			this.$router.push(`/${this.$router.currentRoute.params.id}/company`)
        },
        
        narov () {
            return window.innerWidth > 500
        }
	},
}
</script>