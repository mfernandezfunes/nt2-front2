<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Visitas" text="Listado de visitas realizadas">


          <!--desde aca
          <v-flex xs3>
              <v-text-field  label="Filter" single-line hide-details @input="filterSearch">
              </v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-select :items="authors" label="Author" @change="filterAuthor"></v-select>
            </v-flex>
  
            <v-flex xs3>
  
              <v-menu ref="show_start_date" :close-on-content-click="false" v-model="show_start_date" :nudge-right="40"
                :return-value.sync="start_date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="start_date" label="From" prepend-icon="event" readonly>
                </v-text-field>
                <v-date-picker v-model="start_date" @input="filterStartDate"></v-date-picker>
  
              </v-menu>
  
            </v-flex>
  
            <v-flex xs3>
              <v-menu ref="show_end_date" :close-on-content-click="false" v-model="show_end_date" :nudge-right="40"
                :return-value.sync="end_date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="end_date" label="To" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="end_date" @input="filterEndDate"></v-date-picker>
  
              </v-menu>
            </v-flex>
  
            HASTA ACA-->

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