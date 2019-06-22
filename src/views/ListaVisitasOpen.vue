<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Visitas Abiertas" text="Listado de vistas dentro de la organizacion">

          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="item in items" :key="item.title" v-bind="{ [`xs3`]: true }">
                <v-card>
                  <v-img src="http://localhost:3700/static/YWRFVinKY2bdkHU2894LJ2Il.jpg" height="150px">
                    <div class="fill-height bottom-gradient"></div>
              
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
            this.items.splice(this.items.indexOf(item), 1)
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
      },
      getFoto: function (idPersona) {
        axios
        .get(`${process.env.VUE_APP_ROOT_API}/persona/${this.personaId}`)
          .then(response => {
             return this.img = `${process.env.VUE_APP_ROOT_PICS}/response.data.persona.image}`
          })
          .catch(error => alert(error))
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

<style>
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
</style>