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
                <v-flex xs12 md4>
                  <v-text-field v-model="form.numeroTarjeta" label="Numero de Tarjeta" class="purple-input" />
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea v-model="form.observaciones" label="Observaciones" value="">
                  </v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <h3 class="font-weight-light mb-4">EMPRESA QUE VA A VISITAR</h3>
                  <v-text-field v-model="form.idEmpresa" label="empresa" class="purple-input" />
                </v-flex>
                <v-flex xs12 md12>
                  <v-select label="Seleccione la Empresa" :items=empresasSelect v-model="empresaId" item-text="title"
                    item-value="id" return-object persistent-hint>
                  </v-select>
                </v-flex>

                <v-flex xs12 md6>
                  <v-btn class="mx-0 font-weight-light" @click="goBack" color="danger">
                    Cancelar
                  </v-btn>
                </v-flex>

                <v-flex xs12 md6 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="crearVisita(form)" color="info">
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
          id: '',
          title: ''
        },
        empresas: [],
        empresasSelect: []
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
      crearVisita: function (form) {
        let visita = {
          idPersona: this.personaId,
          idEmpresa: form.idEmpresa,
          observaciones: form.observaciones,
          numeroTarjeta: form.numeroTarjeta,
        }
        if (this.validarVisita(visita)) {
          axios
            .post(`${process.env.VUE_APP_ROOT_API}/visita`, visita)
            .then(response => {
              Swal.fire({
                type: 'success',
                title: 'Se ha ingresado la Visita',
                showConfirmButton: false,
                timer: 1500,
                footer: `${response.data.request} `
              })
              
            })
            .catch(err => {
              Swal.fire({
            type: 'warning',
            title: 'Se han omitido datos',
            showConfirmButton: false,
            timer: 1500
          })
            })

        } else {
          Swal.fire({
            type: 'warning',
            title: 'Se han omitido datos',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      validarVisita(visita) {
        return !((visita.idPersona == '') || (visita.idEmpresa == '') || (visita.id == '') || (visita.idEmpresa == ''))
      },
      generarSelect: function () {
        for (const empresa of this.empresas) {
          this.empresasSelect.push(`{id:'${empresa._id}', title:'${empresa.nombre}'}`)
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