<template>
  <section>
      <item class="admin-bar__speakers">
            <p class="admin-bar__list-item-header" slot="header">speakers</p>
            <template slot="inner">
                <div class="admin-bar__speakers-list">
                    <active-button class="admin-bar__button" :name="'Manage Backstage'"/>
                    <active-button class="admin-bar__button" :name="'Add Speaker'"/>
                </div>
            </template>
      </item>
  </section>
</template>

<script>
import Item from '@/components/Global/admin-sidebar/Item/'
import {ActiveButton} from '@/components/Global/controll/'

export default {
    components: {
        ActiveButton,
        Item,
    }
}
</script>

<style>

</style>