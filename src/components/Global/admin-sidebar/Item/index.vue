<template>
  <div class="admin-sidebar__list-item">
      <accordion :opened="false">
        <accordion-item>            
            <template slot="accordion-trigger">
                <slot name="header"></slot>
                <div class="accordion-trigger__arrow">
                  <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L12.5 13L23 2" stroke="black" stroke-opacity="0.34" stroke-width="3"/>
                  </svg>
                </div>

              </template>
            <template slot="accordion-content">              
              <slot name="inner"></slot>
            </template>
        </accordion-item>
      </accordion>
  </div>
</template>

<script>

import Accordion from "@/components/Global/accordion/accordion";
import AccordionItem from "@/components/Global/accordion/accordion-item";

export default {
    components: {
        Accordion, AccordionItem
    },
}
</script>

<style>

</style>