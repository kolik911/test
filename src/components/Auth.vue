<template>
  <div>
    <div v-if="isError">
      <p>{{ error }}</p>
    </div>
    <form>
      <input type="text" name v-model="username">
      <br>
      <br>
      <input type="password" name v-model="password">
      <br>
      <br>
      <button @click="auth">login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "auth",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    error() {
      return `Authorization error: ${this.$store.getters.authError}`;
    },
    isError() {
      return !!this.$store.getters.authError;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    isLoggedIn(val) {
      if (!val) return;
      this.$router.push("/users-list");
    }
  },
  methods: {
    async auth(e) {
      e.preventDefault();
      const { username, password } = this;
      const data = { username, password };
      this.$store.dispatch("auth", data);
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push("/users-list");
    }
  }
};
</script>

<style>
</style>
