<template>
  <section>
      <item class="admin-bar__streaming">
            <p class="admin-bar__list-item-header" slot="header">Streaming</p>
            <template slot="inner">
                <div class="admin-bar__streaming-list">
                    <buttons/>
                    <sources/>
                </div>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'

import Buttons from './Buttons'
import Sources from './Sources'

export default {
    components: {
        Item,
        Buttons,
        Sources
    }
}
</script>

<style>

</style>