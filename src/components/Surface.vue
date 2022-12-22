<script lang="ts">
export enum Direction {
  Vertical,
  Horizontal,
}
export interface Props {
  direction?: Direction;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  direction: Direction.Vertical,
});
</script>

<template>
  <main
    class="surface"
    :class="{
      vertical: props.direction === Direction.Vertical,
      horizontal: props.direction === Direction.Horizontal,
    }"
  >
    <slot></slot>
  </main>
</template>

<style scoped>
.surface {
  background-color: var(--theme-background-surface);
  min-height: 50vh;
  min-width: 50vh;
  display: flex;
  place-items: center;
}
.vertical {
  flex-direction: column;
}
.horizontal {
  flex-direction: row;
}
</style>
