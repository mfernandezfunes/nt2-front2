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
                  <v-text-field v-model="dni" label="DNI" disabled :rules="[rules.required]" />
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field v-model="nombre" label="Nombre" counter="50" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="apellido" label="Apellido" counter="50" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>

                <v-flex xs12 md4>
                  <v-select v-model="genero" :items="generos" label="Genero" required></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  cxzcz
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="fechaNac" label="Fecha de Nacimiento" type="date" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="email" label="Direccion de Email" type="email" class="purple-input"
                    :rules="[rules.required, rules.email]" />
                </v-flex>
                <v-flex xs12 md12>
                  fdsf
                </v-flex>
                <v-flex xs12 md6>
                  <v-btn class="mx-0 font-weight-light" @click="navigateBack()" color="danger">
                    Cancelar
                  </v-btn>
                </v-flex>
                <v-flex xs12 md6 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="actualizarPersona()" color="success">
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
  export default {
    data() {
      return {
        persona: null,
        visita: null,

        dni: "30303030301",
        nombre: "EMPRESA TEST S.A.",
        apellido: "PERSE",
        fechaNac: null,
        email: "test@gmail.com",
        activa: true,

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
      /*axios({
        method: "GET",
        "url": "http://localhost:3700/api/persona/5cf5b47b92c70c03cd240cc3"
      }).then(result => {
        this.persona = result.data;
      }, error => {
        console.error(error);
      });*/
      axios
        .get('http://localhost:3700/api/persona/5cf5b47b92c70c03cd240cc3')
        .then(response => (this.persona = response.data))
      axios
        .get('http://localhost:3700/api/visita')
        .then(response => (this.visita = response.data))
    },

    methods: {
      navigateBack() {
        this.router.go(-1);
      },
      actualizarPersona: function () {
        alert(`PERSONA A ACTUALIZAR idObjeto:`)
      },
      crearPersona: function () {
        alert(`PERSONA A CREAR idObjeto: `)
      }
    }
  }
</script>