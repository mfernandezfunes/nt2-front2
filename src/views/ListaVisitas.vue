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
              <td class = "text-info"><v-icon class = "text-info">mdi-clock-in</v-icon>{{ formatDate(item.fechaEntrada) }}</td>
              <td class = "text-warning"><v-icon class = "text-warning">mdi-clock-out</v-icon>{{ formatDate(item.fechaSalida) }}</td>
              <td><v-icon>mdi-qrcode</v-icon> {{ item.numeroTarjeta }}</td>
              
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
    }),

    methods: {
      eliminarPersona: function (item) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
        //alert(`PERSONA A BORRAR idObjeto: ${item._id}`)
      },
      formatDate: function (date) {
        let registered = new Date(date);
        return registered.toLocaleString('es-ES');
      }
    },

    mounted() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}/visita`)
        .then(response => (this.items = response.data.visitas))
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>