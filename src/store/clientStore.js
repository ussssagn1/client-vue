import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import axios from "axios";

export const useClientStore = defineStore('clientStore', () => {
    const clients = ref([])
    const nameFilter = ref('');
    const getClients = async () => {
        try {
            const { data } = await axios.get('https://reqres.in/api/users')
            clients.value = data.data.map(client => ({
                ...client,
                address: 'Не указан',
                phone_num: 0
            }))
        } catch (e) {
            console.log('Ошибка получения данных: ', e)
        }
    }

    const deleteClient = async (clientId) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${clientId}`)
            clients.value = clients.value.filter(client => client.id !== clientId)
        } catch (e) {
            console.log('Ошибка при удалении клиента:', e)
        }
    }

    const addClient = async (newClient) => {
        try {
            newClient.id = Math.floor(Math.random() * 1000);

            const { data } = await axios.post('https://reqres.in/api/users', newClient)
            const addedClient = {
                avatar: 'public/avatar.svg',
                ...data,
                phone_num: 0,
                address: ''
            }
            clients.value.push(addedClient)
            console.log(clients.value)
        } catch (e) {
            console.log('Ошибка при добавлении пользователя: ', e)
        }
    }

    const updateClientData = async (clientId, newData) => {
        try {
            const { data } = await axios.put(`https://reqres.in/api/users/${clientId}`, newData);

            clients.value = clients.value.map(client => (client.id === clientId ? { ...client, ...data } : client))
            console.log(clients.value)
        } catch (e) {
            console.log('Ошибка при добавлении новых данных клиента: ', e)
        }
    }

    const filteredClients = computed(() => {
        const filter = nameFilter.value.toLowerCase();
        return clients.value.filter(client =>
            client.first_name.toLowerCase().includes(filter) || client.last_name.toLowerCase().includes(filter)
        );
    });

    return {
        clients, getClients, deleteClient, addClient, updateClientData, filteredClients, nameFilter
    }
})
