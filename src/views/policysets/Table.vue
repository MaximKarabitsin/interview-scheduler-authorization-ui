<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-data-table
      :headers="headers"
      :items="policySets"
      :options.sync="options"
      :server-items-length="totalPolicySets"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Policy sets</v-toolbar-title>
          <v-divider class="mx-4" inset vertical> </v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/policysets/add">New policy set</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="openPolicySet(item)"
              >open_in_new</v-icon
            >
          </template>
          <span>Detail</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small class="mx-2" @click="editPolicySet(item)"
              >edit</v-icon
            >
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="deletePolicySet(item)"
              >delete</v-icon
            >
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
  name: "policy_sets_table",
  data: () => ({
    policySets: [],
    totalPolicySets: 0,
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
        this.getPolicySetsFromApi();
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    getPolicySetsFromApi: function() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      let promise;
      if (itemsPerPage > 0) {
        if (sortDesc[0] === undefined) sortDesc[0] = "";
        promise = api.getPolicySetsByPageAndSort(
          page,
          itemsPerPage,
          sortBy[0] || "",
          sortDesc[0]
        );
      } else {
        promise = api.getAllPolicySets();
      }
      promise
        .then(response => {
          this.policySets = response.data.list;
          this.totalPolicySets = response.data.total;
          this.loading = false;
        })
        .catch(text => {
          this.$notify({
            group: "error",
            type: "error",
            title: "Error",
            text
          });
        });
    },
    openPolicySet: function(item) {
      this.$router.push(`/policysets/${item.id}`);
    },
    editPolicySet: function(item) {
      this.$router.push(`/policysets/${item.id}/edit`);
    },
    deletePolicySet: function(item) {
      api
        .deletePolicySetByID(item.id)
        .then(() => {
          this.getPolicySetsFromApi();
        })
        .catch(text => {
          this.$notify({
            group: "error",
            type: "error",
            title: "Error",
            text
          });
        });
    }
  }
};
</script>

<style scoped></style>
