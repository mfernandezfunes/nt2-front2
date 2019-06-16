<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Visitas Abiertas" text="Listado de vistas dentro de la organizacion">

          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="item in items" :key="item.title" v-bind="{ [`xs3`]: true }">
                <v-card>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu27wk3_oDOChw-qJK0jlkVDBI5mpHACLGpERvB4xQXVa1U0-a0g"
                    height="150px">
                  </v-img>
                  <v-card-title primary-title>
                    <div>{{ item.idPersona }}</div>

                    <div class="text-info">
                      <v-icon class="text-info">mdi-clock-in</v-icon> {{ formatDate( item.fechaEntrada ) }}
                    </div>
                  </v-card-title>
                  <v-card-actions>

                    <v-btn color="warning" @click="salidaVisita(item)" small>
                      <v-icon>mdi-clock-out</v-icon> SALIDA
                    </v-btn>
                    <v-btn color="warning" @click="salidaVisita(item)" disabled small>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>

                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
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
          sortable: false,
          text: 'Tarjeta/QR',
          value: 'numeroTarjeta'
        }
      ],
      items: []
    }),

    methods: {
      salidaVisita: function (item) {
        axios
          .put(`${process.env.VUE_APP_ROOT_API}/visita/${item._id}/close`)
          .then(response => {
              Swal.fire({
                type: 'success',
                title: 'Se ha registrado la Salida',
                showConfirmButton: false,
                timer: 1500
              })
              this.items.splice(this.items.indexOf(item) , 1)
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
      formatDate: function (date) {
        let registered = new Date(date);
        return registered.toLocaleString('es-ES');
      }
    },
    mounted() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}/visita/open`)
        .then(response => (this.items = response.data.visitas))
        .catch(error => {
          errored = true
          console.log(error)
        })
    }
  }
</script>