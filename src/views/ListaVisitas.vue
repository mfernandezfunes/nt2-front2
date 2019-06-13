<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Visitas" text="Listado de visitas realizadas">
          <v-data-table :headers="headers" :items="items" hide-actions>

            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text" />
            </template>

            <template slot="items" slot-scope="{ item }">

              <td>{{ item.idPersona }}</td>
              <td>{{ item.idEmpresa }}</td>
              <td>{{ item.fechaEntrada }}</td>
              <td>{{ item.fechaSalida }}</td>
              <td>{{ item.numeroTarjeta }}</td>
              
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
          text: 'ID Persona',
          value: 'idPersona'
        },
        {
          sortable: true,
          text: 'ID Empresa',
          value: 'idEmpresa'
        },
        {
          sortable: true,
          text: 'Entrada',
          value: 'fechaEntrada'
        },
        {
          sortable: true,
          text: 'Salida',
          value: 'fechaSalida'
        },
        {
          sortable: false,
          text: 'Tarjeta/QR',
          value: 'numeroTarjeta'
        }
      ],
      items: [],
      errored: false
    }),

    methods: {
      eliminarPersona: function (item) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
        //alert(`PERSONA A BORRAR idObjeto: ${item._id}`)
      }
    },

    mounted() {
      axios
        .get('http://localhost:3700/api/visita')
        .then(response => (this.items = response.data.visitas))
        .catch(error => {
          errored = true
          console.log(error)
        })
    }
  }
</script>