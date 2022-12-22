<script setup lang="ts">
import useGameStore from "../stores/game";
import { WelcomeRoute, GameRoute, ResultRoute } from "../router";
import ChipSequence from "./ChipSequence.vue";
import Link from "./Link.vue";

const gameStore = useGameStore();
</script>

<template>
  <div class="debug flex-row">
    <Link :to="WelcomeRoute">Welcome</Link>
    <Link :to="GameRoute">Game</Link>
    <Link :to="ResultRoute">Result</Link>
    <div class="flex-row code">
      <ChipSequence :colors="gameStore.props.code" />
    </div>
  </div>
</template>

<style scoped>
.debug {
  position: absolute;
  border: 0.1rem dashed orange;
  padding: 0.5rem;
  bottom: 1rem;
  gap: 0.5rem;
}
.flex-row {
  display: flex;
  align-items: center;
}
.code {
  gap: 0.25rem;
}
</style>
