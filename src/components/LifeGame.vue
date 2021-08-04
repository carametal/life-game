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
      const rows: boolean[][]  = [];
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
      const randInt = Math.floor(Math.random() * this.surviveMax)
      return randInt % this.surviveMax == 0 
    },
    next() {
      this.turn++
      const newMatrix = this.matrix.map((row, i) => {
        return row.map((hasLife, j) => this.hasLifeNext(hasLife, i, j))
      })
      this.matrix = newMatrix
    },
    hasLifeNext(hasLife: boolean, rowNum: number, colNum: number): boolean {
      if(hasLife) {
        return this.surviveNext(rowNum, colNum)
      }
      return this.bornNext(rowNum, colNum)
    },
    bornNext(rowNum: number, colNum: number): boolean {
      return this.surviveMax === this.countLifeAround(rowNum, colNum)
    },
    surviveNext(rowNum: number, colNum: number) {
      const count = this.countLifeAround(rowNum, colNum)
      return this.surviveMax >= count && count >= this.surviveMin
    },
    // 今のところ使ってない。削除検討
    dieNext(rowNum: number, colNum: number): boolean {
      const count = this.countLifeAround(rowNum, colNum)
      return count > this.surviveMax || this.surviveMin > count
    },
    countLifeAround(rowNum: number, colNum: number): number{
      let count = 0
      if (this.hasLifeUpLeft(rowNum, colNum)) count++
      if (this.hasLifeUp(rowNum, colNum)) count++
      if (this.hasLifeUpRight(rowNum, colNum)) count++
      if (this.hasLifeLeft(rowNum, colNum)) count++
      if (this.hasLifeRight(rowNum, colNum)) count++
      if (this.hasLifeDownLeft(rowNum, colNum)) count++
      if (this.hasLifeDown(rowNum, colNum)) count++
      if (this.hasLifeDownRight(rowNum, colNum)) count++
      return count
    },
    hasLifeUpLeft(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum-1]?.[colNum-1]
    },
    hasLifeUp(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum-1]?.[colNum]
    },
    hasLifeUpRight(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum-1]?.[colNum+1]
    },
    hasLifeLeft(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum][colNum-1]
    },
    hasLifeRight(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum][colNum+1]
    },
    hasLifeDownRight(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum+1]?.[colNum+1]
    },
    hasLifeDown(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum+1]?.[colNum]
    },
    hasLifeDownLeft(rowNum: number, colNum: number): boolean {
      return this.matrix[rowNum+1]?.[colNum-1]
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