<script setup>
import {useClientStore} from "./store/clientStore.js";
import {ref, watch} from "vue";
import {onMounted} from "vue";
import Client from "./components/Client.vue";
import {required,email} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";


import Sidebar from 'primevue/sidebar';
import InputText from "primevue/inputtext";

const clientStore = useClientStore()
const clients = ref([])
const isVisibleSidebar = ref(false)

const defaultClient = {
  first_name: '',
  last_name: '',
  email: ''
  // Добавьте другие поля по необходимости
};
const newClient = ref({ ...defaultClient });
const rule = {
  first_name: { required },
  last_name: { required },
  email: { required, email }
  // Добавьте валидации для других полей по необходимости
};
const v$ = useVuelidate(rule, newClient);

const addClient = async () => {
  v$.value.$touch();
  if (v$.value.$pending || v$.value.$error) {
    // Валидация не прошла
    return;
  }
  try {
    await clientStore.addClient({
      first_name: newClient.value.first_name,
      last_name: newClient.value.last_name,
      email: newClient.value.email
    });
    // Обновление списка клиентов
    isVisibleSidebar.value = false;
    newClient.value = {
      first_name: null,
      last_name: null,
      email: null
      // Очистка данных нового клиента
    };
  } catch (error) {
    console.error('Ошибка при добавлении клиента:', error);
  }
}
const removeClient = async (id) => {
  await clientStore.deleteClient(id)
  clients.value = clientStore.clients
}

onMounted(async () => {
  await clientStore.getClients()
  clients.value = clientStore.clients
  console.log('clients', clients)
})

watch(() => clientStore.clients, (newClients) => {
  clients.value = newClients;
});
</script>

<template>
  <div class="container">
    <main class="main">
      <Sidebar v-model:visible="isVisibleSidebar" header="Sidebar" position="right">
        <form @submit.prevent="addClient" class="sidebar">
          <div class="p-field">
            <label for="name">Имя</label>
            <InputText v-model.trim="newClient.first_name" type="text" id="name" name="name" :class="{ 'p-invalid': !v$.first_name.required && v$.first_name.$pending }" />
            <span v-if="!v$.first_name.required">Введите имя.</span>
          </div>
          <div class="p-field">
            <label for="last_name">Фамилия</label>
            <InputText v-model.trim="newClient.last_name" type="text" id="last_name" name="last_name" :class="{ 'p-invalid': !v$.last_name.required && v$.last_name.$pending, 'p-dirty': v$.last_name.$model }" />
            <span v-if="!v$.last_name.required">Введите фамилию.</span>
          </div>
          <div class="p-field">
            <label for="email">Почта</label>
            <InputText v-model.trim="newClient.email" type="text" id="email" name="email" :class="{ 'p-invalid': (!v$.email.required || !v$.email.email) && v$.email.$pending, 'p-dirty': v$.email.$model }" />
            <span v-if="!v$.email.required">Введите email.</span>
            <span v-else-if="!v$.email.email">Введите корректный email.</span>
          </div>
          <button type="submit" :disabled="v$.$pending">Добавить клиента</button>
        </form>
      </Sidebar>
      <button class="sidebar-btn" @click="isVisibleSidebar = true">Click</button>
      <label for="nameFilter">Фильтр по имени:</label>
      <input v-model.trim="clientStore.nameFilter" type="text" id="nameFilter" />
      <ul class="cards">
        <Client
            v-for="client in clientStore.filteredClients"
            :key="client.id"
            :id="client.id"
            :email="client.email"
            :first_name="client.first_name"
            :last_name="client.last_name"
            :avatar="client.avatar"
            :address="client.address"
            :phone_num="client.phone_num"
            @click-on-remove="removeClient(client.id)"
        />
      </ul>
    </main>
  </div>
</template>

<style scoped>
  .main {
    position: relative;
  }
 .cards {
   padding-top: 10px;
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 30px;
 }
 .sidebar-btn {
   position: absolute;
   top: 20px;
   right: 30px;
 }
 .sidebar {
   display: flex;
   flex-direction: column;
   gap: 15px;
 }
</style>
