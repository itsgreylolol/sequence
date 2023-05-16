import { Card } from './Card'
import { CardName, Suit } from '@/Enums'

export class Deck {
  Cards: Card[]

  constructor() {
    this.Cards = []

    for (let _ of [0, 1]) {
      for (let suit in Object.keys(Suit)) {
        for (let name in Object.keys(CardName)) {
          this.Cards.push(
            new Card(
              Number(CardName[name as keyof typeof CardName]),
              Number(Suit[suit as keyof typeof Suit])
            )
          )
        }
      }
    }
  }

  shuffle = () => {
    let currentIndex = this.Cards.length
    let randomIndex

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      ;[this.Cards[currentIndex], this.Cards[randomIndex]] = [
        this.Cards[randomIndex],
        this.Cards[currentIndex]
      ]
    }
  }
}
