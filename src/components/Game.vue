<script lang="ts">
import { defineComponent} from 'vue';
import { Deck, Player, Board, Tile, Card } from '@/Classes';
import { CardName, Suit } from '@/Enums';

export default defineComponent({
    data(){
        return {
            deck: new Deck(),
            board: new Board(),
            player1: new Player(),
            player2: new Player(),
            message: ''
        }
    },
    methods: {
        draw(player: Player){
            const card = this.deck.Cards.pop()
            if (card){
                player.Hand.push(card)
            }
        },
        updateHand(player: Player, tile: Tile, card: Card){
            const index = player.Hand.findIndex(c => c === card);
            player.Hand.value = player.Hand.splice(index, 1);
            this.draw(player);
            this.player1.Playing = !this.player1.Playing
            this.player2.Playing = !this.player2.Playing

            const liveTile = this.board.Tiles.find(r => {
                    return  r.find(t => {
                    return t.Id == tile.Id
                    })
                })?.find(t => t.Id == tile.Id)
            if (liveTile){
                liveTile.Occupied = !liveTile.Occupied;
                liveTile.OccupiedBy = liveTile.Occupied? player.Id : undefined;
            }
        },
        play(tile: Tile){
            this.message = ''
            const player = this.player1.Playing ? this.player1 : this.player2;
            if (tile.Occupied){
                if (tile.OccupiedBy == player.Id){
                    this.message = 'Cannot play on your own tile'
                } else {
                    // TODO: jack matching is broken
                    const removal = player.Hand.find(c => c.Name == 13 && (c.Suit == 0 || c.Suit == 1));
                    if (!removal){
                        this.message = 'Cannot remove opponent tile without a removal Jack';
                    } else {
                        this.updateHand(player, tile, removal);
                    }
                }
            } else {
                // TODO: match 10 + named cards
                const suitLetter = tile.Card?.charAt(tile.Card.length - 1)
                const cardNumber =  parseInt([...tile.Card ?? ""].filter(c => c !== suitLetter).toString());
                const suit = Object.keys(Suit).find(s => s.startsWith(suitLetter))
                const handCard = player.Hand.find(c => CardName[c.Name as keyof typeof CardName] === cardNumber && c.Suit === suit);

                if(!handCard){
                    // TODO: jack matching is broken
                    const wild = player.Hand.find(c => c.Name == 13 && (c.Suit == 2 || c.Suit == 3));
                    if (!wild){
                        this.message = 'You cannot play that card, you do not have it in your hand'
                    } else {
                        this.updateHand(player, tile, wild);
                    }
                    
                } else {
                    this.updateHand(player, tile, handCard);
                }
            }
        }
    },
    mounted() {
        Array.from(Array(7)).map(_ => {
            this.draw(this.player1);
            this.draw(this.player2);
        })

        if (Math.random() >= 0.5){
            this.player1.Playing = true;
        } else{
            this.player2.Playing = true;
        }
    }
})
</script>

<template>
    <div class="game-wrapper">
        <div class="player-wrapper">
            <div class="player-inner" :class="{'playing': player1.Playing }">
                <div v-for="card in player1.Hand">{{ card.Name }} of {{ card.Suit }}</div>
            </div>
            <div>
                <p v-text="message"></p>
            </div>
            <div class="player-inner" :class="{'playing': player2.Playing }">
                <div v-for="card in player2.Hand">{{ card.Name }} of {{ card.Suit }}</div>
            </div>
        </div>
        <div class="board-wrapper">
            <div class="board-inner">
                <div v-for="row in board" class="tile-row">
                    <div v-for="tiles in row">
                        <div v-for="tile in tiles" 
                            class="tile-wrapper" 
                            :key="tile.Id" >
                            <a v-text="tile.Card" 
                                class="tile" 
                                @click="play(tile)"
                                :class="{'player1-occupied': tile.OccupiedBy == player1.Id, 
                                        'player2-occupied': tile.OccupiedBy == player2.Id, 
                                        'wild': tile.Card === 'Wild'}"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="deck-wrapper">
            <span>{{ deck.Cards.length }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .game-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;

        .player-wrapper{
            flex: 0 0 20%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            height: 100vh;

            .player-inner{
                padding: 1rem;

                &.playing{
                    border: 1px solid white;
                    border-radius: .5rem;
                }
            }
            
        }

        .board-wrapper{
            flex: 0 0 70%;

            .board-inner{
                width: 100%;
                height: 100%;
            }

            .tile-row{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-content: space-between;

                .tile-wrapper{
                    display:flex;
                    align-items: center;
                    width:100%;
                }

                .tile{
                    width: 100%;
                    display: block;
                    padding: 1rem;
                    border: 1px solid white;
                    border-radius: .25rem;
                    margin: .25rem;
                    text-align: center;

                    &.wild{
                        background-color: red;
                    }

                    &.player1-occupied{
                        background-color: blue;
                    }

                    &.player2-occupied{
                        background-color: green;
                    }
                }
            }
        }

        .deck-wrapper{
            display: flex;
            flex: 0 0 10%;
            justify-content: center;
            align-items: center;
        }
    }
</style>