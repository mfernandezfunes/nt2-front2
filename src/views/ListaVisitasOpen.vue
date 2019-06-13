<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Visitas Abiertas" text="Listado de vistas dentro de la organizacion">
          <v-data-table :headers="headers" :items="items" hide-actions>

            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text" />
            </template>

            <template slot="items" slot-scope="{ item }">

              <td>{{ item.idPersona }}</td>
              <td>{{ item.idEmpresa }}</td>
              <td>{{ item.fechaEntrada }}</td>
              <td>{{ item.numeroTarjeta }}</td>
              <td>
                <v-btn color="warning" @click="salidaVisita(item)" small round>
                  <v-icon>mdi-clock-out</v-icon> SALIDA
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
      },
      salidaVisita: function (item) {
        alert(`SALIO LA VISITA ${item._id}`)
      },
    },

    mounted() {
      axios
        .get('http://localhost:3700/api/visita/open')
        .then(response => (this.items = response.data.visitas))
        .catch(error => {
          errored = true
          console.log(error)
        })
    }
  }
</script>