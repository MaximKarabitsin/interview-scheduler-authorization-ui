<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">Policy set</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text v-if="!loading">
        <v-text-field label="Name" v-model="policySet.name"></v-text-field>
        <v-textarea
          label="Description"
          v-model="policySet.description"
        ></v-textarea>
        <v-text-field label="Target" v-model="policySet.target"></v-text-field>
        <v-select
          class="pt-5"
          v-model="policySet.algorithm"
          :items="items"
          item-text="text"
          item-value="value"
          label="Combine algorithm"
          dense
        ></v-select>
        <v-data-table
          class="pt-4"
          v-model="policySet.policies"
          :headers="headers"
          :items="policies"
          :options.sync="options"
          :server-items-length="totalPolicies"
          :loading="loadingPolicies"
          show-select
        >
          <template v-slot:top>
            <span class="grey--text">Policies</span>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="editPolicySet">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "policy_set_edit",
  data: () => ({
    policySet: null,
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
      }
    ],
    items: [
      { text: "Permit if all permitted", value: "PERMIT_IF_ALL_PERMITTED" },
      { text: "Permit if 2 permitted", value: "PERMIT_IF_2_PERMITTED" },
      { text: "Deny if not permitted", value: "DENY_IF_NOT_PERMITTED" }
    ],
    loading: true,
    policies: [],
    loadingPolicies: true,
    totalPolicies: 0,
    options: {}
  }),
  async mounted() {
    const id = this.$route.params.id;
    api.getPolicySetByID(id).then(response => {
      this.policySet = response.data;
      this.loading = false;
    });
  },
  watch: {
    options: {
      handler() {
        this.getPoliciesFromApi();
      },
      deep: true
    }
  },
  methods: {
    editPolicySet: function() {
      const id = this.$route.params.id;
      api
        .putPolicySetById(id, this.policySet)
        .then(() => {
          this.$router.push(`/policysets/${id}`);
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
    getPoliciesFromApi: function() {
      this.loadingPolicies = true;
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
          this.loadingPolicies = false;
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
