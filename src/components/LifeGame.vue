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
  <div style="text-align: center;">
    <span>Turn {{turn}}</span>
  </div>
  <div>
    <button @click="next">Next</button>{{' '}}
    <button @click="init">Reset</button>{{' '}}
    <button @click="autoPlayStart" v-if="0 > intervalId">Auto Play</button>
    <button @click="autoPlayStop" v-else>Stop</button>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import LifeCell from '@/components/LifeCell.vue'
import LifeGameManager, { LifeGameManagerOptions } from '@/types/LifeGameManager'

export default Vue.extend({
  components: { LifeCell },
  props: {
    cells: {
      type: Number,
      required: true,
      validator: (value) => {
        return 0 < value && value < 30
      }
    },
    surviveMax: {
      type: Number,
      required: true,
    },
    surviveMin: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      matrix: [] as boolean[][],
      autoPlaying: false,
      intervalId: -1,
      turn: 1,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.turn = 1
      const rows: boolean[][] = Array(this.cells)
        .fill(false)
        .map(() => {
          return Array(this.cells)
            .fill(false)
            .map(() => this.isMakeLife());
        })
      this.matrix = rows
    },
    isMakeLife() {
      const randInt = Math.floor(Math.random() * this.surviveMax)
      return randInt % this.surviveMax == 0 
    },
    next() {
      this.turn++
      const options: LifeGameManagerOptions = {
        matrix: this.matrix,
        surviveMax: this.surviveMax,
        surviveMin: this.surviveMin
      }
      this.matrix = new LifeGameManager(options).next()
    },
    autoPlayStart(): void {
      this.intervalId = setInterval(() => {
        this.next()
      }, 1000)
    },
    autoPlayStop(): void {
      clearInterval(this.intervalId)
      this.intervalId = -1
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
  width: 30px;
  height: 30px;
  border: solid 1px;
  font-size: 1em;
}

</style>