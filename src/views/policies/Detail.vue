<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">Policy</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
        <v-card-actions v-if="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" class="mx-2" @click="editPolicy">edit</v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" @click="deletePolicy">delete</v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-card-actions>
      </v-card-title>
      <v-card-text v-if="!loading">
        <v-text-field
          label="Name"
          v-model="policy.name"
          readonly
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="policy.description"
          readonly
        ></v-textarea>
        <v-text-field
          label="Target"
          v-model="policy.target"
          readonly
        ></v-text-field>
        <v-select
          class="pt-5"
          v-model="policy.algorithm"
          :items="items"
          item-text="text"
          item-value="value"
          label="Combine algorithm"
          dense
          readonly
        ></v-select>
        <v-data-table class="pt-4" :headers="headers" :items="policy.rules">
          <template v-slot:top>
            <span class="grey--text">Rules</span>
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" small @click="openRule(item)"
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
  name: "policy_detail",
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
  methods: {
    editPolicy: function() {
      this.$router.push(`/policies/${this.policy.id}/edit`);
    },
    deletePolicy: function() {
      api
        .deletePolicyByID(this.policy.id)
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
    openRule: function(item) {
      this.$router.push(`/rules/${item.id}`);
    }
  }
};
</script>

<style scoped></style>
