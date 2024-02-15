<template>
  <div class="body container-fluid">
    <div class="container col-md-5 p-5 mt-5 col-xl-4">
        <form @submit.prevent="auth()">
          <div class="mb-2">
            <label class="mb-2 ms-2">Usuario</label>
            <input
              v-model="username"
              type="text"
              placeholder="User"
              required
              autofocus
              class="form-control rounded-pill border-0 shadow-sm px-4"
            />
          </div>
          <div class="form-group mb-4">
            <label class="mb-2 ms-2">Contraseña</label>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              class="form-control rounded-pill border-0 shadow-sm px-4 text-success"
            />
          </div>
          <button
            type="submit"
            class="col-12 btn btn-success btn-block mb-2 rounded-pill shadow-sm"
          >
            <!-- <span class="spinner-grow spinner-grow-sm text-success"></span> -->
            <span class="text-nowrap">Ingresar</span>
          </button>
        </form>
      </div>
  </div>
</template>

<script>
import store from "../store/auth";
export default {
  data() {
    return {
      loading: false,
      username: "Christian",
      password: "12345678",
    };
  },
  methods: {
    async auth() {
      try {
        const data = {
          username: this.username,
          password: this.password,
        };

        await store.dispatch("auth", data);
        this.$router.push({ name: "ListaTareas" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.body {
  background: #7c7a7a;
  padding: 118px;
}

.container {
  background: #cbcbcb;
  border-radius: 8px;
  box-shadow: 0px 10px 20px #a8a8a8;
}
</style>
