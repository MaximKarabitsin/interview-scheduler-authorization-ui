<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">Policy set</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
        <v-card-actions v-if="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" class="mx-2" @click="editPolicySet"
                >edit</v-icon
              >
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" @click="deletePolicySet">delete</v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-card-actions>
      </v-card-title>
      <v-card-text v-if="!loading">
        <v-text-field
          label="Name"
          v-model="policySet.name"
          readonly
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="policySet.description"
          readonly
        ></v-textarea>
        <v-text-field
          label="Target"
          v-model="policySet.target"
          readonly
        ></v-text-field>
        <v-select
          class="pt-5"
          v-model="policySet.algorithm"
          :items="items"
          item-text="text"
          item-value="value"
          label="Combine algorithm"
          dense
          readonly
        ></v-select>
        <v-data-table
          class="pt-4"
          :headers="headers"
          :items="policySet.policies"
        >
          <template v-slot:top>
            <span class="grey--text">Policies</span>
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" small @click="openPolicy(item)"
                  >open_in_new</v-icon
                >
              </template>
              <span>Detail</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "policy_set_detail",
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
      },
      {
        text: "Action",
        value: "action",
        align: "center",
        sortable: false,
        width: 96
      }
    ],
    items: [
      { text: "Permit if all permitted", value: "PERMIT_IF_ALL_PERMITTED" },
      { text: "Permit if 2 permitted", value: "PERMIT_IF_2_PERMITTED" },
      { text: "Deny if not permitted", value: "DENY_IF_NOT_PERMITTED" }
    ],

    loading: true
  }),
  mounted() {
    const id = this.$route.params.id;
    api
      .getPolicySetByID(id)
      .then(response => {
        this.policySet = response.data;
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
  methods: {
    editPolicySet: function() {
      this.$router.push(`/policysets/${this.policySet.id}/edit`);
    },
    deletePolicySet: function() {
      api
        .deletePolicySetByID(this.policySet.id)
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
    openPolicy: function(item) {
      this.$router.push(`/policies/${item.id}`);
    }
  }
};
</script>

<style scoped></style>
