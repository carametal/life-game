export default class LifeCell {
  private row: number
  private col: number

  public hasLife: boolean

  public constructor(row: number, col: number, hasLife = false) {
    this.row = row
    this.col = col
    this.hasLife = hasLife
  }

  static make(row: number, col: number, func: () => boolean): LifeCell {
    return new LifeCell(row, col, func()) 
  }
}