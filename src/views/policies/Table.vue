<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="policies"
      :options.sync="options"
      :server-items-length="totalPolicies"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Policies</v-toolbar-title>
          <v-divider class="mx-4" inset vertical> </v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/policies/add">New policy</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="openPolicy(item)">open_in_new</v-icon>
          </template>
          <span>Detail</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small class="mx-2" @click="editPolicy(item)">edit</v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="deletePolicy(item)">delete</v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "policies_table",
  data: () => ({
    policies: [],
    totalPolicies: 0,
    loading: true,
    options: {},
    headers: [
      {
        text: "Name",
        value: "name"
      },
      {
        text: "Description",
        value: "description"
      },
      {
        text: "Target",
        value: "target"
      },
      {
        text: "Combine algorithm",
        value: "algorithm"
      },
      {
        text: "Action",
        value: "action",
        align: "center",
        sortable: false,
        width: 96
      }
    ]
  }),
  watch: {
    options: {
      handler() {
        this.getPoliciesFromApi();
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    getPoliciesFromApi: function() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      let promise;
      if (itemsPerPage > 0) {
        if (sortDesc[0] === undefined) sortDesc[0] = "";
        promise = api.getPoliciesByPageAndSort(
          page,
          itemsPerPage,
          sortBy[0] || "",
          sortDesc[0]
        );
      } else {
        promise = api.getAllPolicies();
      }
      promise
        .then(response => {
          this.policies = response.data.list;
          this.totalPolicies = response.data.total;
          this.loading = false;
        })
        .catch(error => {
          this.$error(error);
        });
    },
    openPolicy: function(item) {
      this.$router.push(`/policies/${item.id}`);
    },
    editPolicy: function(item) {
      this.$router.push(`/policies/${item.id}/edit`);
    },
    deletePolicy: function(item) {
      api
        .deletePolicyByID(item.id)
        .then(() => {
          this.getPoliciesFromApi();
        })
        .catch(error => {
          this.$error(error);
        });
    }
  }
};
</script>

<style scoped></style>
