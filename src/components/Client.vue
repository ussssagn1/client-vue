<script setup>
import FullProfile from "./fullProfile.vue";
import {ref} from "vue";

defineProps({
  id: Number,
  email: String,
  first_name: String,
  last_name: String,
  avatar: String,
  address: String,
  phone_num: Number
})

const isVisible = ref(false)

const toggleModal = () => {
  isVisible.value = !isVisible.value;
};

const emit = defineEmits(
  ['clickOnRemove']
)
</script>

<template>
  <li class="card">
    <div class="card__name">
      <img class="card__name-img" :src="avatar" alt="avatar">
      <div class="card__name-text" @click="toggleModal">
        {{first_name}} {{last_name}}
      </div>
    </div>
    <div class="card__info">
      <div class="card__info-text">
        <span class="card__info-desc">Email: </span>
        <div>{{ email }}</div>
      </div>
    </div>
    <button class="delete" @click="emit('clickOnRemove')">
      <img width="30px" src="/public/delete.svg" alt="">
    </button>
    <FullProfile
        :id="id"
        :visible="isVisible"
        :avatar="avatar"
        :first_name="first_name"
        :last_name="last_name"
        :email="email"
        :address="address"
        :phone_num="phone_num"
    />
  </li>
</template>

<style scoped>
  .card {
    position: relative;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #939393;
    padding: 20px;
    border-radius: 6px;

    box-shadow: 1px 1px 7px -6px rgba(71,71,71,1);
    -webkit-box-shadow: 1px 1px 7px -6px rgba(71,71,71,1);
    -moz-box-shadow: 1px 1px 7px -6px rgba(71,71,71,1);
  }
  .delete {
    cursor: pointer;
    position: absolute;
    background-color: transparent;
    border: none;
    top: 10px;
    right: 10px;
  }
  .card__name {
    display: flex;
    gap: 30px;
    align-items: center;
  }
  .card__name-img {
    border-radius: 10px;
    width: 100px;
    height: 100px;
  }
  .card__name-text {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 31px;
    color: #595959;
  }
  .card__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .card__info-text {
    padding: 4px  ;
    background-color: #dadada;
    border-radius: 5px;
  }
  .card__info-desc {
    color: #8a8a8a;
    font-size: 15px;
  }
</style>