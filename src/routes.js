import Auth from "./components/Auth.vue";
import UsersList from "./components/UsersList.vue";

export const routes = [
  {
    path: "/",
    component: Auth
  },
  {
    path: "/users-list",
    component: UsersList
  }
];
