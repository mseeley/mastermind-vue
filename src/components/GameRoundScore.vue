<script setup lang="ts">
import type { GameRound } from "../stores/game";

const props = defineProps<{
  round?: GameRound;
}>();
</script>

<template>
  <div class="score">
    <div
      v-for="i in props.round?.correctPositionCount"
      class="dot stroked filled"
      :key="i"
    ></div>
    <div
      v-for="i in props.round?.incorrectPositionCount"
      class="dot stroked"
      :key="i"
    ></div>
  </div>
</template>

<style scoped>
.score {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.25rem;
  height: 100%;
  width: 2rem;
  gap: 0.25rem;
}
.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: 1px solid transparent;
}
.stroked {
  border-color: var(--theme-color-primary);
}
.filled {
  background-color: var(--theme-color-primary);
}
</style>
