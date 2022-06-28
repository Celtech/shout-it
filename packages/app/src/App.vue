<script setup></script>

<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <TelegramLogin
    mode="callback"
    telegram-login="ShoutItBot"
    @callback="yourCallbackFunction" />
</template>
<script>
import TelegramLogin from './components/TelegramLogin.vue';

export default {
  components: { TelegramLogin },
  methods: {
    yourCallbackFunction(user) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user);
    },
  },
};
</script>
