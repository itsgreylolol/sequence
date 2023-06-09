import { v4 as uuid4 } from 'uuid'
import type { Card } from './Card'

export class Player {
  Id: string
  Hand: Card[]
  Playing: boolean = false;

  constructor() {
    this.Id = uuid4()
    this.Hand = []
  }
}
