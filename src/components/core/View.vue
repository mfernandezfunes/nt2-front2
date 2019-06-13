<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in" duration="15">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer v-if="$route.name !== 'Maps'" />
  </v-content>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: 'Panel de Control'
    }
  }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
