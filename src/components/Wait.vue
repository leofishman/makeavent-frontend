<template>
    <div>
        <navbar></navbar>
        <b-jumbotron>
            <template v-slot:header>{{$root.content.pageWillBeLater}}</template>

            <template v-slot:lead>
                {{$root.content.comebackSoon}}
            </template>

            <hr class="my-4">

            <b-button variant="primary" href="https://blockconf.digital">{{$root.content.buyTicket}}</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    
}
</script>