<template>
    <div>
        <navbar></navbar>
    </div>
</template>
<script>

export default {
    data() {
        this.name = this.$router.currentRoute.params.name
        this.mediaCompany = this.$root.MediaPartners.filter(el => el.name == this.name.toUpperCase())[0]
        
        return {
            
        }
    },
    methods: {
        
    },
}
</script>
<style lang="css">
    
</style>
