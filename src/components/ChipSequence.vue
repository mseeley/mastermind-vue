<script setup lang="ts">
import type { Color } from "../types";
import Chip, { Events, type InteractionEvent } from "./Chip.vue";

const props = defineProps<{
  colors?: Color[];
  maxColors?: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (eventName: Events.Interaction, event: InteractionEvent): void;
}>();

function propagateEvent(event: InteractionEvent): void {
  emit(Events.Interaction, event);
}
</script>

<script lang="ts">
export type { InteractionEvent } from "./Chip.vue";
export { Events } from "./Chip.vue";
export default { inheritAttrs: false };
</script>

<template>
  <Chip
    v-for="i in Math.max(props.colors?.length ?? 0, props.maxColors ?? 0)"
    :key="i"
    :disabled="props.disabled"
    :color="props.colors?.[i - 1]"
    @interaction="propagateEvent"
  />
</template>
