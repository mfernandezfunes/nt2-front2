<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Personas" text="Administracion de personas">
          <v-data-table :headers="headers" :items="items" hide-actions>

            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text" />
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.dni }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.apellido }}</td>
              <td>{{ item.fechaNac }}</td>
              <td>
                <v-switch v-model="item.activo"></v-switch>
              </td>
              <td>
                <v-btn color="info" @click="ingresoVisita" small round>
                  <v-icon>mdi-clock-in</v-icon> ENTRADA
                </v-btn>
                <v-btn color="success" @click="$router.push( {
                  path: '/persona-form',
                  name: 'Editar Persona',
                  view: 'PersonaForm',
                  query: { id: item._id } })" small round>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn color="danger" @click="eliminarPersona(item)" small round>
                  <v-icon>mdi-delete</v-icon>
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
          text: 'DNI',
          value: 'dni'
        },
        {
          sortable: true,
          text: 'Nombre',
          value: 'nombre'
        },
        {
          sortable: true,
          text: 'Apellido',
          value: 'apellido'
        },
        {
          sortable: false,
          text: 'Fecha Nacimiento',
          value: 'fechaNac'
        },
        {
          sortable: false,
          text: 'Habilitada',
          value: 'activo'
        }
      ],
      items: [],
      errored: false
    }),

    methods: {
      editarPersona: function (item) {
        alert(`PERSONA A EDITAR idObjeto: ${item._id}`)
      },
      eliminarPersona: function (item) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )

        //alert(`PERSONA A BORRAR idObjeto: ${item._id}`)
      },
      ingresoVisita: function (item) {
        alert(`PERSONA A EDITAR idObjeto: ${item._id}`)
      },
    },
    mounted() {
      axios
        .get('http://localhost:3700/api/persona')
        .then(response => (this.items = response.data.personas))
        .catch(error => {
          errored = true
          console.log(error)
        })
    }
  }
</script>