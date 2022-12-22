<script setup lang="ts">
import Surface from "../components/Surface.vue";
import Link from "../components/Link.vue";
import ChipSequence from "../components/ChipSequence.vue";
import useGameStore, { GameState } from "../stores/game";
import { WelcomeRoute, GameRoute } from "../router";
import { Kind } from "../types";

const gameStore = useGameStore();
const isFinished = gameStore.props.state === GameState.Finished;
const isSuccess =
  gameStore.props.round?.correctPositionCount ===
  gameStore.props.maxColorsPerRound;
</script>

<template>
  <Surface v-if="!isFinished" class="result">
    <Link :to="WelcomeRoute" :kind="Kind.Primary">Are you Lost?</Link>
  </Surface>

  <Surface v-if="isFinished" class="result">
    <h1 class="title">{{ isSuccess ? "Excellent!" : "Don't give up!" }}</h1>
    <p>
      Attempt(s) {{ gameStore.props.rounds.length }} out of
      {{ gameStore.props.maxRounds }}.
    </p>
    <div class="code">
      <ChipSequence :colors="gameStore.props.code" />
    </div>
    <Link :to="GameRoute" :kind="Kind.Primary" @click="gameStore.actions.reset"
      >Restart
    </Link>
    <Link
      :to="WelcomeRoute"
      :kind="Kind.Secondary"
      @click="gameStore.actions.reset"
      >Exit
    </Link>
  </Surface>
</template>

<style scoped>
.result {
  justify-content: center;
  align-content: center;
  gap: 1rem;
}
.title {
  font-size: var(--theme-font-size-surface-title);
  font-weight: var(--theme-font-weight-surface-title);
}
.code {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
}
</style>
