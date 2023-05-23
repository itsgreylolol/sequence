import { Card } from './Card'
import { CardName, Suit } from '@/Enums'

export class Deck {
  Cards: Card[]

  constructor() {
    this.Cards = []

    for (let _ of [0, 1]) {
      for (let suit in Object.keys(Suit)) {
        for (let name in Object.keys(CardName)) {
          const card = new Card(
            CardName[name as keyof typeof CardName],
            Suit[suit as keyof typeof Suit]
          )
          if (card && card.Name && card.Suit) {
            this.Cards.push(card)
          }
        }
      }
    }

    this.shuffle()
  }

  shuffle = () => {
    let currentIndex = this.Cards.length - 1
    let randomIndex

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      const temp = this.Cards[currentIndex]
      this.Cards[currentIndex] = this.Cards[randomIndex]
      this.Cards[randomIndex] = temp

      currentIndex--
    }
  }
}
