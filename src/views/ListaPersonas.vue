<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Personas" text="Administracion de personas">

          <v-btn  color="pink" @click="nuevaPersona()" dark absolute top right fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-card>
            <v-card-title>
              <v-layout justify-center wrap>
                <v-flex md5>
                </v-flex>
                <v-flex md12>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Filtrar" single-line hide-details>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
          <v-data-table :headers="headers" :items="items" :search="search" rows-per-page-text="Registros por pagina:">

            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="mdi-warning">
                Los sentimos, no se han encontrado registros :(
              </v-alert>
            </template>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text" />
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.dni }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.apellido }}</td>
              <td>{{ formatDate(item.fechaNac) }}</td>
              <td>
                <v-switch v-model="item.activo"></v-switch>
              </td>
              <td>
                <v-btn color="info" @click="ingresoVisita(item)" small round>
                  <v-icon>mdi-clock-in</v-icon> ENTRADA
                </v-btn>
                <v-btn color="success" @click="editarPersona(item)" small round>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="danger" @click="eliminarPersona(item)" small round disabled>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn color="info" @click="tomarFoto(item)" small round>
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>

        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from "axios";
  import Swal from 'sweetalert2';
  export default {
    data: () => ({
      headers: [{
          sortable: false,
          text: 'DNI',
          value: 'dni'
        },
        {
          sortable: true,
          text: 'Nombre',
          value: 'nombre'
        },
        {
          sortable: true,
          text: 'Apellido',
          value: 'apellido'
        },
        {
          sortable: false,
          text: 'Fecha Nacimiento',
          value: 'fechaNac'
        },
        {
          sortable: false,
          text: 'Habilitada',
          value: 'activo'
        }
      ],
      items: [],
      search: ''
    }),
    methods: {
      nuevaPersona: function () {
        this.$router.push({
          path: '/persona-new',
          name: 'Crear Persona',
          view: 'FormPersonaNew',
          /*query: {
            action: 'new'
          }*/
        })
      },
      editarPersona: function (item) {
        this.$router.push({
          path: '/persona-form',
          name: 'Editar Persona',
          view: 'FormPersona',
          query: {
            id: item._id
          }
        })
      },
      eliminarPersona: function (item) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      },
      tomarFoto: function (persona) {
        this.$router.push({
          path: '/webbam',
          name: 'Tomar Foto',
          view: 'WebCam',
          query: {
            id: persona._id
          }
        })
      },
      ingresoVisita: function (item) {
        this.$router.push({
          path: '/visita-form',
          name: 'Registrar Visita',
          view: 'FormVisita',
          query: {
            id: item._id
          }
        })
      },
      formatDate(date) {
        let registered = new Date(date);
        return registered.toLocaleString('es-ES');
      }
    },
    mounted() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}/persona`)
        .then(response => (this.items = response.data.personas))
        .catch(error => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${error}`,
          })
        })
    }
  }
</script>