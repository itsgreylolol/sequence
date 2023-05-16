import type { CardName, Suit } from '@/Enums'

export class Card {
  Name: CardName
  Suit: Suit

  constructor(cardName: CardName, suit: Suit) {
    this.Name = cardName
    this.Suit = suit
  }
}
