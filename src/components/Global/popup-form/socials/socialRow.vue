<template>
    <div class="stuff-item stuff-item--soc">
        <div class="soc__label" @click="updateItem(index)">
            <p>{{socialsItem.name}}</p>
        </div>
        <div class="soc__row">
            <div class="soc__icon" @click="updateItem(index)">
                <img :src="require(`@/assets/icon/socials/${socialsItem.name}.svg`)" alt="">
            </div>
            <!-- <div class="soc__link">
                {{socialsItem.link}}
            </div> -->
            <input  @click="updateItem(index)" class="soc__link" type="text" readonly="readonly" :value="socialsItem.link">
            <div class="soc__close" @click="removeItem(index)">
                <span>x</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['socialsItem', 'index'],
    methods: {
        removeItem(index){
            this.$emit('removeItem', index)
        },
        updateItem(index){
            this.$emit('updateItem', index)
        }
    },
    computed: {
    }
}
</script>

<style>

</style>