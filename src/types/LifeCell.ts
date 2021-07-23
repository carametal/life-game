export default class LifeCell {
  private row: number
  private col: number

  public hasLife: boolean

  public constructor(row: number, col: number, hasLife = false) {
    this.row = row
    this.col = col
    this.hasLife = hasLife
  }

  static makeRandom(row: number, col: number): LifeCell {
    const randInt = Math.floor(Math.random() * 3)
    return new LifeCell(row, col, randInt % 3 == 0) 
  }
}