<template>
<td>
  <span v-if="hasLife">●</span>
</td>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'life-cell',
  props: {
    hasLife: {
      type: Boolean,
      required: true,
    },
  }
})
</script>
