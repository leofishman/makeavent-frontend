<template>
    <div>
        <navbar></navbar>
        <b-jumbotron>
            <template v-slot:header>{{$root.content.noAccessTitle}}</template>

            <template v-slot:lead>
                {{$root.content.sorryAttender}}
            </template>

            <hr class="my-4">

            <p v-html="$root.content.reasonWhyNoAccess"></p>

            <b-button variant="primary" href="https://blockconf.digital">{{$root.content.buyTicket}}</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    name: "Noaccess"
}
</script>