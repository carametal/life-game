export interface LifeGameManagerOptions {
  matrix: boolean[][]
  surviveMax: number
  surviveMin: number
}

export default class LifeGameManager {
  private matrix: boolean[][]
  private surviveMax: number
  private surviveMin: number

  constructor(options: LifeGameManagerOptions) {
    this.matrix = options.matrix
    this.surviveMax = options.surviveMax
    this.surviveMin = options.surviveMin
  }

  public next() {
    const newMatrix = this.matrix.map((row, i) => {
      return row.map((hasLife, j) => this.hasLifeNext(hasLife, i, j))
    })
    return newMatrix
  }

  private hasLifeNext(hasLife: boolean, rowNum: number, colNum: number): boolean {
    if(hasLife) {
      return this.surviveNext(rowNum, colNum)
    }
    return this.bornNext(rowNum, colNum)
  }
  
  public bornNext(rowNum: number, colNum: number): boolean {
    return this.surviveMax === this.countLifeAround(rowNum, colNum)
  }

  public surviveNext(rowNum: number, colNum: number) {
    const count = this.countLifeAround(rowNum, colNum)
    return this.surviveMax >= count && count >= this.surviveMin
  }

  public dieNext(rowNum: number, colNum: number): boolean {
    const count = this.countLifeAround(rowNum, colNum)
    return count > this.surviveMax || this.surviveMin > count
  }

  public countLifeAround(rowNum: number, colNum: number): number{
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
  }

  public hasLifeUpLeft(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum-1]?.[colNum-1]
  }

  public hasLifeUp(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum-1]?.[colNum]
  }

  public hasLifeUpRight(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum-1]?.[colNum+1]
  }

  public hasLifeLeft(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum][colNum-1]
  }

  public hasLifeRight(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum][colNum+1]
  }

  public hasLifeDownRight(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum+1]?.[colNum+1]
  }

  public hasLifeDown(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum+1]?.[colNum]
  }

  public hasLifeDownLeft(rowNum: number, colNum: number): boolean {
    return this.matrix[rowNum+1]?.[colNum-1]
  }
}