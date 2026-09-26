<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps<{ product: any }>();

const emit = defineEmits<{
  "on-submit": [{ productId: string; stock: string }];
}>();

const isOpenDialog = ref(false);
const stock = ref(props.product.stock);
const dialogRef = ref<HTMLDialogElement | null>(null);
const triggerRef = ref<HTMLDivElement | null>(null);

function toggleDialog() {
  isOpenDialog.value = !isOpenDialog.value;
}

function onDocumentClick(event: MouseEvent) {
  if (!isOpenDialog.value) return;
  const path = event.composedPath();
  const clickedDialog = path.includes(dialogRef.value!);
  const clickedTrigger = path.includes(triggerRef.value!);

  if (!clickedDialog && !clickedTrigger) {
    isOpenDialog.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>

<template>
  <div class="trigger-dialog" ref="triggerRef">
    <slot name="trigger" v-bind="{ toggleDialog }"></slot>
  </div>

  <dialog class="product-dialog" ref="dialogRef" v-bind:open="isOpenDialog">
    <div class="heading">{{ props.product.name }}</div>
    <form v-on:submit.prevent="$emit('on-submit', { productId: props.product.id, stock: stock })">
      <div>
        <input v-model="stock" />
        <button type="submit">Save</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
.heading {
  margin-bottom: 12px;
  border-bottom: 1px solid gray;
}
.product-dialog {
  width: 300px;
  outline: none;
  border: 1px solid gainsboro;
  border-radius: 16px;
  height: 250px;
}
</style>
