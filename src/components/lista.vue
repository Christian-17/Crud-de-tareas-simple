<template>
  <div class="container card bg-light">
    <h1 class="text-center mb-4 text-success">Lista de tareas</h1>
    <div class="mb-3">
      <button
        class="btn btn-success rounded-circle"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
    <div class="table-responsive rounded">
      <!-- <div v-if="ListaTareas.length > 0"> -->
      <table class="table table-hover">
        <thead class="table-success">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th class="justify-content-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tarea in ListaTareas"
            :key="tarea.id"
            :class="{ tareaCompletada: tarea.completed }"
          >
            <td>{{ tarea._id }}</td>
            <td>{{ tarea.nombre }}</td>
            <td>{{ tarea.descripcion }}</td>
            <td class="justify-content-end">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  style="
                    width: 35px;
                    padding: 10px;
                    background-color: rgba(136, 194, 141, 0.558);
                    border: none;
                  "
                  @click="tacharTareas(tarea)"
                />
                <button
                  type="button"
                  class="btn bg-success border-0 btn-fill btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="editTareas(tarea)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  type="button"
                  class="btn bg-danger border-0 btn-fill btn-sm"
                  @click="deleteTareas(tarea)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- </div>
          <div v-else>
            <p class="text-center text-success">NO HAY TAREAS</p>
          </div> -->
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title text-success fs-5">
            {{ isEdit ? "Editar tarea" : "Nueva tarea" }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="col-form-label">Nombre</label>
              <input
                v-model="dataTareas.nombre"
                type="text"
                class="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div class="mb-3">
              <label class="col-form-label">Descripcion</label>
              <input
                v-model="dataTareas.descripcion"
                type="text"
                class="form-control"
                placeholder="Description"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="postPutTareas()"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {{ isEdit ? "Editar" : "Crear" }}
          </button>

          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/auth/tableList";

export default {
  data() {
    return {
      isEdit: false,
      ListaTareas: null,
      dataTareas: {
        nombre: "",
        descripcion: "",
      },
    };
  },
  methods: {
    async getTareas() {
      try {
        const res = await store.dispatch("getTareas");
        this.ListaTareas = res.tarea;
      } catch (error) {
        console.log(error);
      }
    },
    async postPutTareas() {
      try {
        const data = {
          id: this.dataTareas._id,
          nombre: this.dataTareas.nombre,
          descripcion: this.dataTareas.descripcion,
        };
        let res = null
        if (this.isEdit) {
          res = store.dispatch("putTareas", data);
          this.getTareas();
          this.isEdit = false;
        } else {
          res = store.dispatch("postTareas", data);
          this.getTareas();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTareas(tarea) {
      try {
        this.dataTareas = tarea;
        const data = {
          id: this.dataTareas._id,
          nombre: this.dataTareas.nombre,
        };
        this.$swal.fire({
          title: `¿Esta seguro de eliminar la tarea "${data.nombre}"?`,
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: "No",
        }).then((result) => {
          if (result.value) {
            store.dispatch("deleteTareas", data);
            this.getTareas();
          }
        })
      } catch (error) {
        console.log(error);
      }
    },
    editTareas(tarea) {
      this.dataTareas = tarea;
      this.isEdit = true;
    },
    tacharTareas(tarea) {
      try {
        tarea.completed = !tarea.completed;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getTareas();
  },
};
</script>

<style>
.container {
  padding: 20px;
  top: 40px;
}
.tareaCompletada {
  text-decoration: line-through;
}
</style>
