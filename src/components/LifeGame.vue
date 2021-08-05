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
    <div>
      <input type="radio" value="manual" v-model="playType" />
      <label>Manual</label>
      <input type="radio" value="auto" v-model="playType" />
      <label>Auto</label>
    </div>
  </div>
  <div>
    <button
      @click="prev"
      :disabled="disablePrevButton"
    >Prev</button>{{' '}}
    <button
      @click="next"
      :disabled="autoPlaying"
    >Next</button>{{' '}}
    <button
      @click="init"
      :disabled="autoPlaying"
    >Reset</button>{{' '}}
    <span v-show="playType === 'auto'">
      <button
        @click="autoPlayStart"
        v-if="!autoPlaying"
      >Auto Play</button>
      <button
        @click="autoPlayStop"
        v-else
        v-show="playType"
      >Stop</button>{{' '}}
    </span>
    <div v-show="playType === 'auto'">
      <label>Auto Play Ineterval</label>{{' '}}
      <input
        v-model="autoPlayInterval"
        :disabled="autoPlaying"
      />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import LifeCell from '@/components/LifeCell.vue'
import LifeGameManager, { LifeGameManagerOptions } from '@/types/LifeGameManager'

type PlayTime = 'manual' | 'auto'

export default Vue.extend({
  components: { LifeCell },
  props: {
    cells: {
      type: Number,
      required: true,
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
      intervalId: -1,
      turn: 1,
      history: [] as boolean[][][],
      autoPlayInterval: 1000,
      playType: 'auto' as PlayTime,
    }
  },
  computed: {
    autoPlaying(): boolean {
      return this.intervalId >= 0
    },
    disablePrevButton(): boolean {
      return this.history.length <= 1
        || this.autoPlaying
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.turn = 1
      this.history = []
      this.matrix = Array(this.cells)
        .fill(false)
        .map(() => {
          return Array(this.cells)
            .fill(false)
            .map(() => this.isMakeLife());
        })
      this.history.push(this.matrix)
    },
    isMakeLife() {
      const randInt = Math.floor(Math.random() * this.surviveMax)
      return randInt % this.surviveMax == 0 
    },
    prev() {
      this.turn--
      this.history.pop()
      this.matrix = this.history[this.history.length-1]
    },
    next() {
      this.turn++
      const options: LifeGameManagerOptions = {
        matrix: this.matrix,
        surviveMax: this.surviveMax,
        surviveMin: this.surviveMin
      }
      this.matrix = new LifeGameManager(options).next()
      this.history.push(this.matrix)
    },
    autoPlayStart(): void {
      this.intervalId = setInterval(() => {
        this.next()
      }, this.autoPlayInterval)
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
  width: 8px;
  height: 8px;
  border: solid 1px;
}

</style>