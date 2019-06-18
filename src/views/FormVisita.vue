<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card color="green" title="Registrar" text="Complete los datos necesarios para registrar la visita">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md8>
                  <h3>PERSONA QUE INGRESA </h3>
                </v-flex>
                <v-flex xs12 md4>
                  <h4>
                    <v-icon class="text-info">mdi-clock-in</v-icon>{{formatDate(new Date())}}
                  </h4>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field v-model="form.dni" label="DNI" class="purple-input" disabled />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="form.nombre" label="nombre" class="purple-input" disabled />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="form.apellido" label="Apellido" class="purple-input" disabled />
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea solo name="input-7-4" label="Observaciones" value="">
                  </v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <h3 class="font-weight-light mb-4">EMPRESA QUE VISITA</h3>
                </v-flex>
                <v-flex xs12 md12>
                  <v-select label="Empresa" :items=empresasSelect :hint="`${empresaId.title}, ${empresaId.value}`"
                    v-model="empresaId" item-text="title" item-value="value" persistent-hint return-object single-line>
                  </v-select>
                </v-flex>

                <v-flex xs12 md6>
                  <v-btn class="mx-0 font-weight-light" @click="goBack" color="danger">
                    Cancelar
                  </v-btn>
                </v-flex>

                <v-flex xs12 md6 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="registrarVisita(form)" color="info">
                    REGISTRAR INGRESO
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
        persona: null,
        form: {},
        personaId: null,
        empresaId: {
          title: '',
          value: ''
        },

        empresas: [],
        empresasSelect: [],

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
            console.log(this.form)
            axios
              .get(`${process.env.VUE_APP_ROOT_API}/empresa/listar`)
              .then(response => {
                this.empresas = response.data.empresas
                this.generarSelect()
              })
              .catch(error => {
                console.log(error)
              })
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
      actualizarPersona: function (persona) {
        axios
          .put(`${process.env.VUE_APP_ROOT_API}/persona/${this.personaId}`, persona)
          .then(response => {
            Swal.fire({
              type: 'success',
              title: 'Se ha actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            goBack()
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
      crearPersona: function () {
        alert(`PERSONA A CREAR idObjeto: ${this.personaId}`)
      },
      generarSelect: function () {
        for (const empresa of this.empresas) {
          this.empresasSelect.push(`{title:'${empresa.nombre}',value:'${empresa._id}'}`)
        }
      },
      formatDate(date) {
        let registered = new Date(date);
        return registered.toLocaleString('es-ES');
      },
      registrarVisita: function () {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Esta funcionalidad no esta disponible!',
          footer: 'PROXIMAMENTE'
        })
      }
    }
  }
</script>