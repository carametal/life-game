<template>
<div>
  <table>
    <tr v-for="(row, i) in matrix" :key="i">
      <life-cell
        v-for="(cell, j) in row"
        :key="j"
        :hasLife="matrix[i][j]"
      />
    </tr>
  </table>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import LifeCell from '@/components/LifeCell.vue'

export default Vue.extend({
  components: { LifeCell },
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
      matrix: [] as boolean[][]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const rows:boolean[][]  = [];
      for (let i=0; i<this.cells; i++) {
        const row: boolean[] = [];
        for (let j=0; j<this.cells; j++) {
          row.push(this.isMakeLife())
        }
        rows.push(row)
      }
      this.matrix = rows
    },
    isMakeLife() {
      const randInt = Math.floor(Math.random() * 3)
      return randInt % 3 == 0 
    }
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