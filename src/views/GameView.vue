<script setup lang="ts">
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import GameRound from "../components/GameRound.vue";
import GamePalette, {
  type InteractionEvent,
} from "../components/GamePalette.vue";
import Surface, { Direction } from "../components/Surface.vue";
import useGameStore, { GameState } from "../stores/game";
import { ResultRoute } from "../router";

const router = useRouter();
const gameStore = useGameStore();
const handlePaletteInteraction = (event: InteractionEvent) => {
  gameStore.actions.guess(event.color);
};

watchEffect(() => {
  const isFinished = gameStore.props.state === GameState.Finished;
  const isPlaying = gameStore.props.state === GameState.Playing;

  if (isFinished) {
    router.push({ name: ResultRoute });
  } else if (!isPlaying) {
    gameStore.actions.start();
  }
});
</script>

<template>
  <Surface class="gameboard" :direction="Direction.Horizontal">
    <main class="rounds">
      <GameRound
        v-for="i in gameStore.props.maxRounds"
        :round="gameStore.props.rounds[i - 1]"
        :key="i"
      />
    </main>
    <aside class="palette">
      <GamePalette @interaction="handlePaletteInteraction" />
    </aside>
  </Surface>
</template>

<style scoped>
.gameboard {
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
}
.rounds {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.palette {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
