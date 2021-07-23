<template>
  <div id="app">
    <home
      title="Life Game"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from '@/components/Home.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Home,
  }
});
</script>
