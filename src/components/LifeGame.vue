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
  <button @click="next">Next</button>
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
      const randInt = Math.floor(Math.random() * 3)
      return randInt % 3 == 0 
    },
    next() {
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
      return 3 === this.countLifeAround(rowNum, colNum)
    },
    surviveNext(rowNum: number, colNum: number) {
      const count = this.countLifeAround(rowNum, colNum)
      return 3 >= count && count >= 2
    },
    // 今のところ使ってない。削除検討
    dieNext(rowNum: number, colNum: number): boolean {
      const count = this.countLifeAround(rowNum, colNum)
      return count > 3 || 2 > count
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