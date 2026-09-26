<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
const props = defineProps<{ product: any , updateStatus: any}>();

const emit = defineEmits<{
  "submit-produt": [{ productId: string; stock: string }];
  "close-dialog": [];
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


watch(()=>props.updateStatus, (s)=> {
 console.log(s)
});

watch(isOpenDialog, (open) => {
  if (!open) {
    emit("close-dialog");
  }
});

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
  if (isOpenDialog.value) {
    emit("close-dialog");
  }
});
</script>

<template>
  <div class="trigger-dialog" ref="triggerRef">
    <slot name="trigger" v-bind="{ toggleDialog }"></slot>
  </div>

  <dialog class="product-dialog" ref="dialogRef" v-bind:open="isOpenDialog">
    <div class="heading">{{ props.product.name }}</div>
    <form v-on:submit.prevent="$emit('submit-produt', { productId: props.product.id, stock: stock })">
      <div class="dialog-controls">
        <input v-model="stock" />
        <button type="submit">Save</button>
      </div>
    </form>

    Update status:
    <div>
       <div v-if="updateStatus === 'success'" :style="{ color: 'green' }">Продукт успіщно оновленно</div>
       <div v-if="updateStatus === 'error'" :style="{ color: 'red' }">Щось пійшло не так</div>
    </div>
  </dialog>
</template>

<style scoped>
.dialog-controls {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
}
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
