<template>
  <div>
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">Rule</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
        <v-card-actions v-if="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" class="mx-2" @click="editRule">edit</v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" @click="deleteRule">delete</v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-card-actions>
      </v-card-title>
      <v-card-text v-if="!loading">
        <v-text-field label="Name" v-model="rule.name" readonly></v-text-field>
        <v-textarea
          label="Description"
          v-model="rule.description"
          readonly
        ></v-textarea>
        <v-text-field
          label="Target"
          v-model="rule.target"
          readonly
        ></v-text-field>
        <v-text-field
          label="Condition"
          v-model="rule.condition"
          readonly
        ></v-text-field>
        <v-select
          class="pt-5"
          v-model="rule.effect"
          :items="items"
          item-text="text"
          item-value="value"
          label="Effect"
          dense
          readonly
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "rule_detail",
  data: () => ({
    items: [
      { text: "Permit", value: true },
      { text: "Deny", value: false }
    ],
    rule: null,
    loading: true
  }),
  mounted() {
    const id = this.$route.params.id;
    api
      .getRuleByID(id)
      .then(response => {
        this.rule = response.data;
        this.loading = false;
      })
      .catch(() => {
        //console.log(error);
      });
  },
  methods: {
    editRule: function() {
      this.$router.push(`/rules/${this.rule.id}/edit`);
    },
    deleteRule: function() {
      api
        .deleteRuleByID(this.rule.id)
        .then(() => {
          this.$router.push(`/rules`);
        })
        .catch(error => {
          this.$error(error);
        });
    }
  }
};
</script>

<style scoped></style>
