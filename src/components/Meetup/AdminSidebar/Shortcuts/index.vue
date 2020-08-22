<template>
  <section>
      <item class="admin-bar__shortcuts">
            <p class="admin-bar__list-item-header" slot="header">Shortcuts</p>
            <template slot="inner">
                <div class="admin-bar__shortcuts-list">
                    <buttons/>
                </div>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import Buttons from './Buttons'

export default {
    components: {
        Item,
        Buttons,
    }
}
</script>

<style>

</style>