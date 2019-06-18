<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md9>
        <material-card color="green" title="Nueva Persona" text="Complete los datos">
          <v-form>
            <v-container py-0>
              <v-layout wrap>

                <v-flex xs12 md3>
                  <v-avatar slot="offset" class="mx-auto d-block" size="100">

                    <img data-original="persona.image" v-bind:src="img" class="lazy" alt="">

                  </v-avatar>
                </v-flex>
                <v-flex xs12 md9>
                  <v-text-field v-model="persona.dni" label="DNI" :rules="[rules.required]" />
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field v-model="persona.nombre" label="Nombre" counter="50" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="persona.apellido" label="Apellido" counter="50" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>

                <v-flex xs12 md4>
                  <v-select v-model="persona.genero" :items="generos" label="Genero" item-text="name" required
                    single-line></v-select>
                </v-flex>
                <v-flex xs12 md4>


                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="persona.fechaNac" label="Fecha de Nacimiento" type="date" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="persona.email" label="Direccion de Email" type="email" class="purple-input"
                    :rules="[rules.required, rules.email]" />
                </v-flex>
                <v-flex xs12 md12>

                </v-flex>
                <v-flex xs12 md6>
                  <v-btn class="mx-0 font-weight-light" @click="goBack" color="danger">
                    Cancelar
                  </v-btn>
                </v-flex>
                <v-flex xs12 md6 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="crearPersona(persona)" color="success">
                    Crear
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>

</template>


<style>
  .mapouter {
    text-align: right;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 100%;
    width: 100%;
  }
</style>

<script>
  import axios from "axios";
  import Swal from 'sweetalert2';
  export default {
    data() {
      return {
        persona: {
          dni: "",
          nombre: "",
          apellido: "",
          email: "",
          genero: "",
          fechaNac: "",
          activo: true
        },
        img: require('../../public/img/persona.png'),
        generos: [{
            name: "MASCULINO",
            code: "MASCULINO",
          },
          {
            name: "FEMENINO",
            code: "FEMENINO",
          },
          {
            name: "OTRO",
            code: "OTRO",
          }
        ],
        rules: {
          required: value => !!value || 'Este campo es Requerido.',
          counter: value => value.length <= 50 || 'Maximo 50 caracteres',
          email: value => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Direccion de email invalida.'
          }
        },
      }
    },
    mounted() {

    },

    methods: {
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      },
      validarPersona() {
        return !((this.persona.dni == '') || ( this.persona.nombre == '') || ( this.persona.apellido == '') || ( this.persona.fechaNac ==
          '') || (this.persona.email == ''))
      },
      selectedOption(option) {
        if (this.value) {
          return option.code === this.value.code;
        }
        return false;
      },
      crearPersona: function (persona) {

        if (this.validarPersona()) {
          axios
            .post(`${process.env.VUE_APP_ROOT_API}/persona`, persona)
            .then(response => {
              Swal.fire({
                type: 'success',
                title: 'Se ha ingresado la Persona',
                showConfirmButton: false,
                timer: 1500,
                footer: `${response.data.persona._id}`
              })
            })
            .catch(err => {
              
              console.log(err.response.data)
              
            })
          console.log(persona)
        } else {
          Swal.fire({
            type: 'warning',
            title: 'Se han omitido datos',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    }
  }
</script>