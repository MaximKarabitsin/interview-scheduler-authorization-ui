<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-data-table
      :headers="headers"
      :items="rules"
      :options.sync="options"
      :server-items-length="totalRules"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Rules</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/rules/add">New rule</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="openRule(item)">open_in_new</v-icon>
          </template>
          <span>Detail</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small class="mx-2" @click="editRule(item)"
              >edit
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="deleteRule(item)">delete</v-icon>
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
  name: "rules_table",
  data: () => ({
    rules: [],
    totalRules: 0,
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
        text: "Condition",
        value: "condition"
      },
      {
        text: "Effect",
        value: "effect"
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
        this.getRulesFromApi();
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    getRulesFromApi: function() {
      this.loading = true;
      let { page, itemsPerPage } = this.options;
      let sortBy =
        this.options.sortBy[0] === undefined ? "" : this.options.sortBy[0];
      let sortDesc = "ASC";
      if (this.options.sortDesc[0]) sortDesc = "DESC";
      let promise;
      promise = api.getRulesByPageAndSort(page, itemsPerPage, sortBy, sortDesc);
      promise
        .then(response => {
          this.rules = response.data.list;
          this.totalRules = response.data.total;
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
    openRule: function(item) {
      this.$router.push(`/rules/${item.id}`);
    },
    editRule: function(item) {
      this.$router.push(`/rules/${item.id}/edit`);
    },
    deleteRule: function(item) {
      api
        .deleteRuleByID(item.id)
        .then(() => {
          this.getRulesFromApi();
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
