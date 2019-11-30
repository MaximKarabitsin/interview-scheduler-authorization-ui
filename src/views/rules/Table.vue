<template>
  <div>
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
          <v-divider class="mx-4" inset vertical> </v-divider>
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
            <v-icon v-on="on" small class="mx-2" @click="editRule(item)">edit</v-icon>
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
          this.loading = false;
        })
        .catch(error => {
          this.$error(error);
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
        .catch(error => {
          this.$error(error);
        });
    }
  }
};
</script>

<style scoped></style>
