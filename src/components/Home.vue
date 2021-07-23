<template>
<div class="wrapper">
  <h1>{{ title }}</h1>
  <life-game
    :cells="cells"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import LifeGame from '@/components/LifeGame.vue'

export default Vue.extend({
  name: 'home',
  components: {
    LifeGame,
  },
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      cells: 7,
    }
  }
})
</script>

<style scoped>
div.wrapper {
  text-align: center;
}
</style>