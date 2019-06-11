<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card :active-class="color" title="Empresas" text="Administracion de Empresas">
          <v-data-table :headers="headers" :items="items" hide-actions>

            <template v-if="errored">
              <p>We're sorry, we're not able to retrieve this information at the momento, please try again later.</p>
            </template>

            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text" />
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.cuit }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.piso }}</td>
              <td>{{ item.oficina }}</td>
              <td>
                <v-switch v-model="item.activa"></v-switch>
              </td>
              <td>
                <v-btn color="success" @click="$router.push( {
                  path: '/empresa-form',
                  name: 'Editar Empresa',
                  view: 'EmpresaForm',
                  params: { id:'{{item._id}}' } 
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
      errored: true
    }),
    methods: {
      editarEmpresa: function (item) {
        alert(`EMPRESA A EDITAR idObjeto: ${item._id}`)
      },
      eliminarEmpresa: function (item) {
        alert(`EMPRESA A BORRAR idObjeto: ${item._id}`)
      }
    },
    mounted() {
      /*axios({
        method: "GET",
        "url": "http://localhost:3700/api/empresa/listar"
      }).then(result => {
        this.items = result.data.empresas;
      }, error => {
        console.error(error);
      });*/
      axios
        .get('http://localhost:3700/api/empresa/listar')
        .then(response => (this.items = response.data.empresas))
        .catch(error => {
          errored = true
          console.log(error)
        })
    }
  }
</script>