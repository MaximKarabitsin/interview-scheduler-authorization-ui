<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">Policy</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text v-if="!loading">
        <v-text-field label="Name" v-model="policy.name"></v-text-field>
        <v-textarea
          label="Description"
          v-model="policy.description"
        ></v-textarea>
        <v-text-field label="Target" v-model="policy.target"></v-text-field>
        <v-select
          class="pt-5"
          v-model="policy.algorithm"
          :items="items"
          item-text="text"
          item-value="value"
          label="Combine algorithm"
          dense
        ></v-select>
        <v-data-table
          class="pt-4"
          v-model="policy.rules"
          :headers="headers"
          :items="rules"
          :options.sync="options"
          :server-items-length="totalRules"
          :loading="loadingRules"
          show-select
        >
          <template v-slot:top>
            <span class="grey--text">Rules</span>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="editPolicy">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "policy_edit",
  data: () => ({
    policy: null,
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
        text: "Condition",
        value: "condition"
      },
      {
        text: "Effect",
        value: "effect"
      }
    ],
    items: [
      { text: "Permit if all permitted", value: "PERMIT_IF_ALL_PERMITTED" },
      { text: "Permit if 2 permitted", value: "PERMIT_IF_2_PERMITTED" },
      { text: "Deny if not permitted", value: "DENY_IF_NOT_PERMITTED" }
    ],
    loading: true,
    rules: [],
    loadingRules: true,
    totalRules: 0,
    options: {}
  }),
  async mounted() {
    const id = this.$route.params.id;
    api
      .getPolicyByID(id)
      .then(response => {
        this.policy = response.data;
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
  watch: {
    options: {
      handler() {
        this.getRulesFromApi();
      },
      deep: true
    }
  },
  methods: {
    editPolicy: function() {
      const id = this.$route.params.id;
      api
        .putPolicyById(id, this.policy)
        .then(() => {
          this.$router.push(`/policies/${id}`);
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
    getRulesFromApi: function() {
      this.loadingRules = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      let promise;
      if (itemsPerPage > 0) {
        if (sortDesc[0] === undefined) sortDesc[0] = "";
        promise = api.getRulesByPageAndSort(
          page,
          itemsPerPage,
          sortBy[0] || "",
          sortDesc[0]
        );
      } else {
        promise = api.getAllRules();
      }
      promise
        .then(response => {
          this.rules = response.data.list;
          this.totalRules = response.data.total;
          this.loadingRules = false;
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
