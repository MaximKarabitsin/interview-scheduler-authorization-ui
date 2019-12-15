<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-card>
      <v-card-title>
        <span class="headline">Policy sets</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            label="Name"
            v-model="policySet.name"
            :error-messages="nameError"
            @blur="$v.policySet.name.$touch()"
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="policySet.description"
            :error-messages="descriptionError"
            @blur="$v.policySet.description.$touch()"
          ></v-textarea>
          <v-text-field
            label="Target"
            v-model="policySet.target"
            :error-messages="targetError"
            @blur="$v.policySet.target.$touch()"
          ></v-text-field>
          <v-select
            class="pt-4"
            v-model="policySet.algorithm"
            :items="items"
            item-text="text"
            item-value="value"
            label="Combine algorithm"
            :error-messages="algorithmError"
            @blur="$v.policySet.algorithm.$touch()"
            dense
          ></v-select>
          <v-data-table
            class="pt-5"
            v-model="policySet.policies"
            :headers="headers"
            :items="policies"
            :options.sync="options"
            :server-items-length="totalPolicies"
            :loading="loadingPolicies"
            show-select
          >
            <template v-slot:top>
              <div class="grey--text">Policies</div>
              <div :class="{ 'error--text': policiesError }">
                {{ policiesError }}
              </div>
              <span> </span>
            </template>
          </v-data-table>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addPolicySet">Add</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/components/backend-api";
import { required } from "vuelidate/lib/validators";

export default {
  name: "policy_set_add",
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
    options: {},
    policySet: {
      name: null,
      description: "",
      target: "",
      algorithm: "",
      policies: []
    }
  }),
  computed: {
    nameError: function() {
      if (this.$v.policySet.name.$dirty) {
        if (!this.$v.policySet.name.required) return "Name is required";
      }
      return "";
    },
    descriptionError: function() {
      if (this.$v.policySet.description.$dirty) {
        if (!this.$v.policySet.description.required)
          return "Description is required";
      }
      return "";
    },
    targetError: function() {
      if (this.$v.policySet.target.$dirty) {
        if (!this.$v.policySet.target.required) return "Target is required";
      }
      return "";
    },
    algorithmError: function() {
      if (this.$v.policySet.algorithm.$dirty) {
        if (!this.$v.policySet.algorithm.required)
          return "Algorithm is required";
      }
      return "";
    },
    policiesError: function() {
      if (this.$v.policySet.policies.$dirty) {
        if (!this.$v.policySet.policies.required) return "Policies is required";
      }
      return "";
    }
  },
  validations: {
    policySet: {
      name: { required },
      description: { required },
      target: { required },
      algorithm: { required },
      policies: { required }
    }
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
    addPolicySet: function() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      api
        .addPolicySet(this.policySet)
        .then(() => {
          this.$router.push(`/policysets`);
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
