<template>
  <section>
      <item class="admin-bar__streaming">
            <p class="admin-bar__list-item-header" slot="header">{{this.$root.content.adminSidebar.items.streaming.title}}</p>
            <template slot="inner">
                <div class="admin-bar__streaming-list">
                    <buttons/>
                    <!-- <sources/> -->
                    <!-- <active-button
                        :name="$root.content.adminSidebar.items.streaming.buttons.add"
                        class="admin-bar__shortcuts-btn admin-bar__button">
                    </active-button> -->
                </div>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import Buttons from './Buttons'
import Sources from './Sources'

import {ActiveButton} from '@/components/Global/controll/'

export default {
    components: {
        Item,
        Buttons,
        Sources,
        ActiveButton
    }
}
</script>

<style>

</style>