<template>
<div>
  <table>
    <tr v-for="(row, i) in matrix" :key="i">
      <td v-for="(cell) in row" :key="cell.col">
        <span v-if="cell.hasLife">●</span>
      </td>
    </tr>
  </table>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import LifeCell from '@/types/LifeCell'

export default Vue.extend({
  props: {
    cells: {
      type: Number,
      required: true,
      validator: (value) => {
        return 0 < value && value < 30
      }
    }
  },
  data() {
    return {
      matrix: [] as Array<Array<LifeCell>>
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const rows = [];
      for (let i=0; i<this.cells; i++) {
        const row: LifeCell[] = [];
        for (let j=0; j<this.cells; j++) {
          row.push(LifeCell.makeRandom(i, j))
        }
        rows.push(row)
      }
      this.matrix = rows
    },
  }
})
</script>

<style>
table {
  border-collapse: collapse;
  margin: auto;
}

td {
  width: 50px;
  height: 50px;
  border: solid 1px;
  font-size: 2em;
}

</style>