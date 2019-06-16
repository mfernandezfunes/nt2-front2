<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Personas" text="Administracion de personas">
          <v-container fill-height>
            <v-flex md8></v-flex>
            <v-flex md4>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" hide-details>
              </v-text-field>
            </v-flex>
          </v-container>

          <v-data-table :headers="headers" :items="items" rows-per-page-text="Registros por pagina:"
            prev-icon="mdi-menu-left" next-icon="mdi-menu-right" sort-icon="mdi-menu-down">

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
                <v-btn color="success" @click="$router.push( {
                  path: '/persona-form',
                  name: 'Editar Persona',
                  view: 'PersonaForm',
                  query: { id: item._id } })" small round>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn color="danger" @click="eliminarPersona(item)" small round>
                  <v-icon>mdi-delete</v-icon>
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
      search: '',
      filter: {},

      errored: false
    }),

    methods: {
      editarPersona: function (item) {
        alert(`PERSONA A EDITAR idObjeto: ${item._id}`)
      },
      eliminarPersona: function (item) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )

        //alert(`PERSONA A BORRAR idObjeto: ${item._id}`)
      },
      ingresoVisita: function (item) {
        alert(`PERSONA A EDITAR idObjeto: ${item._id}`)
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