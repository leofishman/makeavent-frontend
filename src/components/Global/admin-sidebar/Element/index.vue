<template>
    <div class="menu-el">
        <slot name="switch-loader"></slot> 
        <div class="menu-el">           
            <slot name="switch-header"></slot>          
            <slot name="switch"></slot>
        </div>
    </div>
</template>