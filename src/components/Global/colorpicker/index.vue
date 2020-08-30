<template>
    <div class="input-group color-picker" ref="colorpicker">
		<div>
			<input type="text" class="form-control" v-model="colorValue" @focus="showPicker()" @input="updateFromInput" />
		</div>
	    <span class="input-group-addon color-picker-container">
		    <span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"></span>
		    <chrome :value="colors"  @input="updateFromPicker" v-if="displayPicker" />
	    </span>
    </div>
</template>

<script>
import {Chrome} from 'vue-color'
export default {
    components: {
        Chrome
    },
	props: ['color', 'defaultValue'],
	data() {
		return {
			colors: {
				hex: '#000000',
			},
			colorValue: '',
			displayPicker: false,
		}
	},
	mounted() {
		this.setColor(this.color || '#000000');
	},
	methods: {
		setColor(color) {
			this.updateColors(color);
			this.colorValue = color;
		},
		updateColors(color) {
			if(color.slice(0, 1) == '#') {
				this.colors = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colors = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
		showPicker() {
			document.addEventListener('click', this.documentClick);
			this.displayPicker = true;
		},
		hidePicker() {
			document.removeEventListener('click', this.documentClick);
			this.displayPicker = false;
			this.blur()
		},
		togglePicker() {
			this.displayPicker ? this.hidePicker() : this.showPicker();
		},
		updateFromInput() {
			this.updateColors(this.colorValue);
		},
		updateFromPicker(color) {
			this.colors = color;
			if(color.rgba.a == 1) {
				this.colorValue = color.hex;
			}
			else {
				this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
		documentClick(e) {
			var el = this.$refs.colorpicker,
				target = e.target;
			if(target){
				if(el !== target && !el.contains(target)) {
					this.hidePicker()
				}
			}
		},
		blur(){
			this.$emit('blur')
		}
	},
	watch: {
		color(){
			this.setColor(this.$props.color)
		},
		colorValue(val) {
			if(val) {
				this.updateColors(val);
				this.$emit('input', val);
				//document.body.style.background = val;
			}
		},		
		defaultValue: {			
			handler(val){
				if(this.$props.defaultValue.isActive) {
					this.setColor(this.$props.defaultValue.color)
					this.$emit('toggle-default-value')
				}
			},
			deep: true
		}
	},
}
</script>

<style lang="scss">
.input-group.color-picker {
	display: flex;
	flex-flow: column;
	font-family: "Montserrat", sans-serif;
	.input-group-addon.color-picker-container {
		position: absolute;
		top: 55px;
		left: 0px;
		z-index: 2;
	}
	.vc-chrome {
		box-shadow: 0 0 2px rgba(0,0,0,.9), 0 4px 8px rgba(0,0,0,.9);
		font-family: "Montserrat", sans-serif;
	}
	.form-control {
		color: #363636;
		background-color: #ebeaea;
		display: inline-flex;
		font-size: 1rem;
		height: 2.25em;
		justify-content: flex-start;
		line-height: 1.5;
		padding-bottom: calc(0.375em - 1px);
		padding-left: calc(0.625em - 1px);
		padding-right: calc(0.625em - 1px);
		padding-top: calc(0.375em - 1px);
		position: relative;
		vertical-align: top;
		border-radius: 5px;
		border: 0px solid;
		&:focus {
			outline: none;
			border: 1px solid #0051d9;
			box-shadow: 0 0 0 0.125em rgba(0, 81, 217, 0.25);
		}
	}
	.ytp-chrome-top, .ytp-chrome-bottom {
		display: none !important;
	}
}
</style>