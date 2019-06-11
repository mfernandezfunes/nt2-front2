<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card color="green" title="Editar Empresa" text="Complete los datos">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md10>
                  <v-text-field v-model="cuit" label="CUIT" disabled />
                </v-flex>

                <v-flex xs12 md12>
                  <v-text-field v-model="nombre" label="Razon Social" counter="50" class="purple-input"
                    :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="email" label="Direccion de Email" class="purple-input"
                    :rules="[rules.required, rules.email]" type="email" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="piso" label="Piso" class="purple-input" :rules="[rules.required]" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="oficina" label="Oficina" class="purple-input" :rules="[rules.required]" />
                </v-flex>

                <v-flex xs12>
                  <v-textarea class="purple-input" label="Observaciones" value="" />
                </v-flex>



                <v-flex xs12 md6>
                  <v-btn class="mx-0 font-weight-light" @click="this.$router.go(-1)" color="danger">
                    Cancelar
                  </v-btn>
                </v-flex>
                <v-flex xs12 md6 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="actualizarEmpresa()" color="success">
                    Actualizar
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


<script>
  import axios from "axios";
  export default {
    data() {
      return {

        
        cuit: "30303030301",
        nombre: "EMPRESA TEST S.A.",
        piso: 2,
        oficina: "201",
        email: "test@gmail.com",
        activo: true,

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
    methods: {
      actualizarEmpresa: function () {
        alert(`EMPRESA A ACTUALIZAR idObjeto:`)
      },
      crearEmpresa: function () {
        alert(`EMPRESA A CREAR idObjeto: `)
      }
    },
    mounted() {
      axios({
        method: "GET",
        "url": "http://localhost:3700/api/empresa/listar"
      }).then(result => {
        this.items = result.data.empresas;
      }, error => {
        console.error(error);
      });
    }

  }
</script>