<script setup lang="ts">
import Link from "../components/Link.vue";
import Surface from "../components/Surface.vue";
import useGameStore, { GameState } from "../stores/game";
import { GameRoute } from "../router";
import { Kind } from "../types";

const gameStore = useGameStore();
</script>

<template>
  <Surface class="welcome">
    <h1 class="title">Mastermind</h1>
    <Link :to="GameRoute" :kind="Kind.Primary">{{
      gameStore.props.state === GameState.Playing ? "Continue" : "Start"
    }}</Link>
    <Link
      v-if="gameStore.props.state === GameState.Playing"
      :to="GameRoute"
      :kind="Kind.Secondary"
      @click="gameStore.actions.reset"
      >Restart
    </Link>
  </Surface>
</template>

<style scoped>
.welcome {
  justify-content: center;
  gap: 1rem;
}
.title {
  font-size: var(--theme-font-size-surface-title);
  font-weight: var(--theme-font-weight-surface-title);
}
</style>
