<script lang="ts">
import { defineComponent } from 'vue';
import { Board } from '@/Classes/Board';

export default defineComponent({
    data(){
        return{
            board: new Board()
        }
    }
})
</script>

<template>
    <div v-for="row in board" class="tile-row">
        <div v-for="tiles in row">
            <div v-for="tile in tiles" class="tile-wrapper">
                <span v-text="tile.Card" class="tile"></span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    }
}

</style>