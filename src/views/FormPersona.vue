<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md9>
        <material-card color="green" title="Editar Persona" text="Complete los datos">
          <v-form>
            <v-container py-0>
              <v-layout wrap>

                <v-flex xs12 md3>
                  <v-avatar slot="offset" class="mx-auto d-block" size="100">
                    <img src="../../public/img/99999999.jpg">
                  </v-avatar>
                </v-flex>
                <v-flex xs12 md9>
                  <v-text-field v-model="form.dni" label="DNI" disabled :rules="[rules.required]" />
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field v-model="form.nombre" label="Nombre" counter="50" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="form.apellido" label="Apellido" counter="50" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>

                <v-flex xs12 md4>
                  <v-select v-model="form.genero" :items="generos" label="Genero" required></v-select>
                </v-flex>
                <v-flex xs12 md4>

                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="form.fechaNac" label="Fecha de Nacimiento" type="date" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="form.email" label="Direccion de Email" type="email" class="purple-input"
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
                  <v-btn class="mx-0 font-weight-light" @click="actualizarPersona(form)" color="success">
                    Actualizar
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>

      <v-flex xs12 md3>
        <material-card color="green" title="Ubicacion">
          <iframe id="gmap_canvas" width="100%" height="500"
            src="https://maps.google.com/maps?q=google&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="1"
            scrolling="no" marginheight="5" marginwidth="5" />
        </material-card>
      </v-flex>


      <!--v-flex md12>
        <material-card color="green" flat full-width title="Table on Plain Background"
          text="Here is a subtitle for this table">
          <v-data-table :headers="headers" :items="items.slice(0, 7)" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>
            <template slot="visitas" slot-scope="{ visita }">
              <td>{{ visita.idEmpresa }}</td>
              <td>{{ visita.idPersona }}</td>
              <td>{{ visita.fechaEntrada }}</td>
              <td>{{ visita.fechaSalida }}</td>
              <td>{{ visita.numeroTarjeta }}</td>
              <td>{{ visita.observaciones }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex-->

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
  export default {
    data() {
      return {
        persona: null,

        form: {
          dni: "",
          nombre: "",
          apellido: "",
          genero:"",
          fechaNac: "",
          oficina: "",
          observaciones: "",
          activo: ""
        },

        personaId: null,

        generos: [
          'MASCULINO',
          'FEMENINO',
          'OTRO'
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
      this.personaId = this.$route.query.id
      console.log(this.$route.query.id)
      if (this.personaId != null) {
        axios
          .get(`${process.env.VUE_APP_ROOT_API}/persona/${this.personaId}`)
          .then(response => {
            this.form = response.data.persona
            console.log(this.persona)
          })
          .catch(error => alert(error))
      }
    },

    methods: {
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      },
      actualizarPersona: function () {
        alert(`PERSONA A ACTUALIZAR idObjeto: ${this.personaId}`)
      },
      crearPersona: function () {
        alert(`PERSONA A CREAR idObjeto: ${this.personaId}`)
      }
    }
  }
</script>