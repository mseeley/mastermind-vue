<script setup lang="ts">
import useGameStore from "../stores/game";
import ChipSequence from "./ChipSequence.vue";
import { Events, type InteractionEvent } from "./Chip.vue";

const emit = defineEmits<{
  (eventName: Events.Interaction, event: InteractionEvent): void;
}>();

const propagateEvent = (event: InteractionEvent): void => {
  emit(Events.Interaction, event);
};

const gameStore = useGameStore();
</script>

<script lang="ts">
export type { InteractionEvent } from "./Chip.vue";
export { Events } from "./Chip.vue";
export default { inheritAttrs: false };
</script>

<template>
  <ChipSequence
    :colors="gameStore.props.palette"
    @interaction="propagateEvent"
  />
</template>

<style scoped>
.palette {
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 0.5rem;
}
</style>
