<script setup lang="ts">
import ChipSequence from "./ChipSequence.vue";
import GameRoundScore from "./GameRoundScore.vue";
import useGameStore, { type GameRound } from "../stores/game";

const props = defineProps<{
  round?: GameRound;
}>();

const gameStore = useGameStore();
</script>

<template>
  <div class="round">
    <ChipSequence
      :maxColors="gameStore.props.maxColorsPerRound"
      :colors="props.round?.code"
    />
    <GameRoundScore :round="props.round" />
  </div>
</template>

<style scoped>
.round {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}
</style>
