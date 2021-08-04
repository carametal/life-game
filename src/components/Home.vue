<template>
<div class="wrapper">
  <h1 style="margin: 0;">{{ title }}</h1>
  <life-game
    :cells="cells"
    :surviveMax="surviveMax"
    :surviveMin="surviveMin"
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
      cells: 50,
      surviveMax: 3,
      surviveMin: 2,
    }
  }
})
</script>

<style scoped>
div.wrapper {
  text-align: center;
}
h1 {
  margin-bottom:  10px;
}
</style>