<template>
  <div id="app">
    <life-game
      title="Life Game"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LifeGame from '@/components/LifeGame.vue'

export default Vue.extend({
  name: 'App',
  components: {
    LifeGame,
  }
});
</script>
