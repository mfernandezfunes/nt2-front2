<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Listado de Visitantes" text="Personas actualmente en el edificio">
          <v-data-table :headers="headers" :items="items" hide-actions>

            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text" />
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.address.street }}</td>
              <td>{{ item.address.suite }}</td>
              <td>{{ item.address.city }}</td>
              <td>{{ item.phone }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex md12>
        <material-card color="green" flat full-width title="Table on Plain Background"
          text="Here is a subtitle for this table">
          <v-data-table :headers="headers" :items="items.slice(0, 7)" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.address.street }}</td>
              <td>{{ item.address.suite }}</td>
              <td>{{ item.address.city }}</td>
              <td>{{ item.phone }}</td>
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
          text: 'Nombre',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Email',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Direccion',
          value: 'address'
        },
        {
          sortable: false,
          text: 'Depto',
          value: 'suite'
        },
        {
          sortable: false,
          text: 'Ciudad',
          value: 'city'
        },
        {
          sortable: false,
          text: 'Telefono',
          value: 'phone'
        }
      ],
      items: []
    }),
    mounted() {
      axios({
        method: "GET",
        "url": "https://jsonplaceholder.typicode.com/users"
      }).then(result => {
        this.items = result.data;
      }, error => {
        console.error(error);
      });
    }
  }
</script>