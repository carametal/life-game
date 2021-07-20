<template>
<div>
  <h1>{{ title }}</h1>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'life-game',
  props: {
    title: {
      type: String,
      required: true,
    }
  }
})
</script>