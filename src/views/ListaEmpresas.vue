<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card title="Empresas" text="Administracion de Empresas">

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

          <v-data-table :headers="headers" :items="items" :search="search" rows-per-page-text="Registros por página:"
            no-results-text="No se han encontrado registros coincidentes">

            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text" />
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.cuit }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.piso }}</td>
              <td>{{ item.oficina }}</td>
              <td>
                <v-switch v-model="item.activa" @change="cambiarEstado(item)"></v-switch>
              </td>
              <td>
                <v-btn color="success" @click="$router.push( {
                  path: '/empresa-form',
                  name: 'Editar Empresa',
                  view: 'EmpresaForm',
                  query: { id: item._id } 
                })" small round>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn color="danger" @click="eliminarEmpresa(item)" small round>
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
          text: 'CUIT',
          value: 'cuit'
        },
        {
          sortable: true,
          text: 'Razon Social',
          value: 'nombre'
        },
        {
          sortable: false,
          text: 'Piso',
          value: 'piso'
        },
        {
          sortable: false,
          text: 'Oficina',
          value: 'oficina'
        },
        {
          sortable: false,
          text: 'Habilitada',
          value: 'activa'
        },
        {
          sortable: false,
          text: 'Acciones',
          value: ''
        }
      ],
      items: [],
      search: '',
    }),

    computed: {

    },
    methods: {
      editarEmpresa: function (item) {
        Swal.fire({
          type: 'info',
          title: 'Oops...',
          text: 'Esta funcionalidad es disponible solo para administradores',
          footer: 'USUARIO NO ADMINISTRADOR'
        })
      },
      cambiarEstado(item) {
        console.log(item.cuit + item.activa + item._id)
        axios
          .put(`${process.env.VUE_APP_ROOT_API}/empresa/${item._id}`, {
            "activa": item.activa
          })
          .then(response => {
            Swal.fire({
              type: 'success',
              title: `Se ha cambiado el estado de ${item.cuit} `,
              showConfirmButton: true
            })
          })
          .catch(err => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Algo salio mal!',
              footer: err
            })
          })
      },
      eliminarEmpresa: function (item) {
        Swal.fire({
          type: 'info',
          title: 'Oops...',
          text: 'Esta funcionalidad es disponible solo para administradores',
          footer: 'USUARIO NO ADMINISTRADOR'
        })
      }
    },
    mounted() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}/empresa/listar`)
        .then(response => (this.items = response.data.empresas))
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>