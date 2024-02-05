<script setup>
import Dialog from "primevue/dialog";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref, watch } from 'vue';
import { useClientStore } from "../store/clientStore.js";

const addresNew = ref('');
const phoneNum = ref();
const save = ref(false)

const props = defineProps({
  id: Number,
  visible: Boolean,
  avatar: String,
  first_name: String,
  last_name: String,
  email: String,
  address: String,
  phone_num: Number,
});

const id = ref(props.id)
const isVisible = ref(props.visible);
const clientStore = useClientStore();

const saveChanges = async () => {
  const newData = {
    address: addresNew.value,
    phone_num: Number(phoneNum.value),
  };

  await clientStore.updateClientData(id.value, newData);
  save.value = true;
};

watch(() => props.visible, (newValue) => {
  isVisible.value = newValue;
});
</script>

<template>
  <Dialog :visible="isVisible" modal header="Edit Profile" :style="{ width: '25rem' }">
    <template #header>
      <div class="flex flex-col align-items-center justify-content-center gap-2">
        <Avatar :image="props.avatar" shape="circle" />
        <div class="flex flex-col">
          <span class="font-bold white-space-nowrap">Полное имя: {{props.first_name}} {{props.last_name}}</span>
          <span class="font-bold white-space-nowrap">Почта: {{props.email}}</span>
          <span class="font-bold white-space-nowrap">Адресс: {{props.address}}</span>
          <span class="font-bold white-space-nowrap">Номер телефона: {{props.phone_num}}</span>
        </div>
        <span v-if="save" class="text-green-600">Данные перезаписаны нажмите Cancel что бы выйти</span>
      </div>
    </template>
    <span class="p-text-secondary block mb-5">Обновить информацию</span>
    <div class="flex flex-col align-items-center gap-3 mb-3">
      <label for="address" class="font-semibold w-6rem">Адресс</label>
      <InputText v-model="addresNew" id="address" placeholder="Введите адресс" class="flex-auto bg-gray-300 p-1" autocomplete="off" />
    </div>
    <div class="flex flex-col align-items-center gap-3 mb-2">
      <label for="phone" class="font-semibold w-6rem">Номер теле фона</label>
      <InputText v-model="phoneNum" id="phone" placeholder="Введите номер телефона" class="flex-auto bg-gray-300 p-1" autocomplete="off" />
    </div>

    <template #footer class="flex gap-10">
      <Button class="bg-gray-400 p-2" type="button" label="Cancel" severity="secondary" @click="isVisible = false" />
      <Button class="bg-gray-400 p-2" label="Save" outlined @click="saveChanges" autofocus />
    </template>
  </Dialog>
</template>

<style scoped>

</style>