<script setup lang="ts">
import { Color, Size } from "../types";

const props = withDefaults(
  defineProps<{
    color?: Color;
    disabled?: boolean;
    size?: Size;
  }>(),
  {
    disabled: false,
    size: Size.Medium,
  }
);

const emit = defineEmits<{
  (eventName: Events.Interaction, event: InteractionEvent): void;
}>();

function emitInteraction() {
  if (props.color !== undefined) {
    emit(Events.Interaction, { color: props.color, type: "press" });
  }
}

function handleTouch(event: TouchEvent) {
  if (event.touches.length === 1) {
    emitInteraction();
  }
}
</script>

<script lang="ts">
export enum Events {
  Interaction = "interaction",
}
export interface InteractionEvent {
  color: Color;
  type: string;
}
</script>

<template>
  <button
    :disabled="props.disabled"
    class="chip"
    :class="{
      'color-a': props.color === Color.A,
      'color-b': props.color === Color.B,
      'color-c': props.color === Color.C,
      'color-d': props.color === Color.D,
      'color-e': props.color === Color.E,
      'color-f': props.color === Color.F,
      'size-small': props.size === Size.Small,
      'size-medium': props.size === Size.Medium,
      'size-large': props.size === Size.Large,
    }"
    @mouseup.left.exact="emitInteraction"
    @keyup.space.exact="emitInteraction"
    @keyup.enter.exact="emitInteraction"
    @touch.prevent.passive="handleTouch"
  ></button>
</template>

<style scoped>
.chip {
  background-color: var(--theme-color-chip-placeholder);
}
.color-a {
  background-color: var(--theme-color-chip-a);
}

.color-b {
  background-color: var(--theme-color-chip-b);
}

.color-c {
  background-color: var(--theme-color-chip-c);
}

.color-d {
  background-color: var(--theme-color-chip-d);
}

.color-e {
  background-color: var(--theme-color-chip-e);
}

.color-f {
  background-color: var(--theme-color-chip-f);
}

.size-small {
  height: 1rem;
  width: 1rem;
}

.size-medium {
  height: 2rem;
  width: 2rem;
}

.size-large {
  height: 4rem;
  width: 4rem;
}
</style>
