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

    .tile{
        display: block;
        padding: 15px;

    }
}

</style>