<template>
  <div class="admin-sidebar__list-item">
      <accordion>
        <accordion-item>            
            <template slot="accordion-trigger">
                <slot name="header"></slot>
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