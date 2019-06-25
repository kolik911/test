<template>
  <div class="users-list">
    <div class="log-out">
      <button @click="logOut">LogOut</button>
      <p v-if="error">{{ error }}</p>
    </div>
    <ul>
      <li v-for="user in usersList" :key="user.id">
        <!-- <p>User name: {{ user.name }} | status: {{ user['agent.status'] | status}} | online: {{user.online}}</p>  -->
        <div class="user">
          <p>User: {{ user.name }}</p>
          <p class="online">online: {{ user.online }}</p>
          <p>{{ user['agent.status'] | status }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
    usersList() {
      return this.$store.state.usersList.info;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  filters: {
    status(str) {
      if (!str) return "Logged Out";
      return str;
    }
  },
  watch: {
    isLoggedIn(val) {
      if (!val) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    }
  },
  created() {
    this.$store.dispatch("loadUsersList");
  }
};
</script>

<style scoped>
.users-list {
  position: relative;
}
.log-out {
  position: absolute;
  right: 1px;
  top: 1px;
}
ul {
  padding: 50px 0 0 0;
}
li {
  list-style-type: none;
  margin: 0 0 10px 0;
}
.user {
  padding: 10px;
  border: solid 1px #000;
}
</style>
