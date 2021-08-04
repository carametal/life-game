<template>
<td :style="style"></td>
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
  },
  computed: {
    style() {
      if(this.hasLife) {
        return {
          'background-color': 'black'
        }
      }
      return {}
    }
  }
})
</script>
