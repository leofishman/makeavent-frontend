<template>
    <div class="admin-sidebar-color-item">
        <div class="admin-sidebar-color-item__color-picker">
            <color-picker @blur="blur"  :color="currentColor" v-model="currentColor" @input="updateColor" />
        </div>
        <div 
            :class="activeClass"
            :style="{ backgroundColor: currentColor }"
        ></div>
        <div class="admin-sidebar-color-item__color-name">
            <slot name="name"></slot>
        </div>
    </div>
</template>

<script>
import ColorPicker from '@/components/Global/colorpicker/'

export default {
    props: {
        defaultColor: String
    },
    components: {
        ColorPicker
    },
    methods: {
        updateColor(val) {
            this.currentColor = val
            this.$emit('input',this.currentColor)
        },
        blur(){
            this.$emit('blur')
        }
    },
    data(){
        return {
            inValidColors: [
                '#fff',
                '#ffffff',
                '#FFF',
                '#FFFFFF',
                'rgba(255, 255, 222, 1)'
            ],
            currentColor: this.$props.defaultColor
        }
        
    },
    watch: {
        defaultColor() {
            return this.$emit('updated', this.$props.defaultColor)
        }
    },
    computed: {
        activeClass() {
            return this.inValidColors.includes(this.currentColor) ? 'admin-sidebar-color-item__color-preview-default' : 'admin-sidebar-color-item__color-preview'
        }
    }
}
</script>

<style>

</style>