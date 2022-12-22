<script setup lang="ts">
import type { RouteRecordName } from "vue-router";
import { RouterLink } from "vue-router";
import { Kind } from "../types";

const props = withDefaults(
  defineProps<{
    to: RouteRecordName;
    disabled?: boolean;
    kind?: Kind;
  }>(),
  {
    disabled: false,
    kind: Kind.Secondary,
  }
);
</script>

<template>
  <RouterLink
    class="button"
    :to="{ name: props.to, params: {} }"
    :class="{
      primary: props.kind == Kind.Primary,
      secondary: props.kind == Kind.Secondary,
    }"
    ><slot
  /></RouterLink>
</template>

<style scoped>
.button {
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.primary {
  background-color: var(--theme-background-primary);
  background-blend-mode: soft-light, screen;
  color: var(--theme-color-button-primary);
}

.secondary {
  background-color: var(--theme-background-secondary);
  color: var(--theme-color-button-secondary);
}
</style>
