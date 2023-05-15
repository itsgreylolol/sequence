import { v4 as uuid4 } from 'uuid'
import { Tile } from './Tile'
import BoardJson from '../Data/Board.json'

export class Board {
  Tiles: Tile[][]

  constructor() {
    this.Tiles = BoardJson
    this.Tiles.forEach((t) => {
      t.forEach((tt) => {
        tt.Id = uuid4()
        if (!tt.Occupied) {
          tt.Occupied = false
        }
      })
    })
  }
}
