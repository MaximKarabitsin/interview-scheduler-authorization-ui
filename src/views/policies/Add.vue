<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-card>
      <v-card-title>
        <span class="headline">Policy</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            label="Name"
            v-model="policy.name"
            :error-messages="nameError"
            @blur="$v.policy.name.$touch()"
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="policy.description"
            :error-messages="descriptionError"
            @blur="$v.policy.description.$touch()"
          ></v-textarea>
          <v-text-field
            label="Target"
            v-model="policy.target"
            :error-messages="targetError"
            @blur="$v.policy.target.$touch()"
          ></v-text-field>
          <v-select
            class="pt-4"
            v-model="policy.algorithm"
            :items="items"
            item-text="text"
            item-value="value"
            label="Combine algorithm"
            :error-messages="algorithmError"
            @blur="$v.policy.algorithm.$touch()"
            dense
          ></v-select>
          <v-data-table
            class="pt-5"
            v-model="policy.rules"
            :headers="headers"
            :items="rules"
            :options.sync="options"
            :server-items-length="totalRules"
            :loading="loadingRules"
            show-select
          >
            <template v-slot:top>
              <div class="grey--text">Rules</div>
              <div :class="{ 'error--text': rulesError }">{{ rulesError }}</div>
              <span> </span>
            </template>
          </v-data-table>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addPolicy">Add</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/components/backend-api";
import { required } from "vuelidate/lib/validators";

export default {
  name: "policy_add",
  data: () => ({
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
      { text: "Allowed if all allowed", value: "ALLOWED_IF_ALL_ALLOWED" },
      { text: "Allowed if 2 allowed", value: "ALLOWED_IF_2_ALLOWED" }
    ],
    loading: true,
    rules: [],
    loadingRules: true,
    totalRules: 0,
    options: {},
    policy: {
      name: null,
      description: "",
      target: "",
      algorithm: "",
      rules: []
    }
  }),
  computed: {
    nameError: function() {
      if (this.$v.policy.name.$dirty) {
        if (!this.$v.policy.name.required) return "Name is required";
      }
      return "";
    },
    descriptionError: function() {
      if (this.$v.policy.description.$dirty) {
        if (!this.$v.policy.description.required)
          return "Description is required";
      }
      return "";
    },

    targetError: function() {
      if (this.$v.policy.target.$dirty) {
        if (!this.$v.policy.target.required) return "Target is required";
      }
      return "";
    },
    algorithmError: function() {
      if (this.$v.policy.algorithm.$dirty) {
        if (!this.$v.policy.algorithm.required) return "Algorithm is required";
      }
      return "";
    },
    rulesError: function() {
      if (this.$v.policy.rules.$dirty) {
        if (!this.$v.policy.rules.required) return "Rules is required";
      }
      return "";
    }
  },
  validations: {
    policy: {
      name: { required },
      description: { required },
      target: { required },
      algorithm: { required },
      rules: { required }
    }
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
    addPolicy: function() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      api
        .addPolicy(this.policy)
        .then(() => {
          this.$router.push(`/policies`);
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
