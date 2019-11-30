<template>
  <v-card :loading="loading">
    <v-card-title>
      <span class="headline">Rule</span>
      <v-divider class="mx-4" inset vertical> </v-divider>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text v-if="!loading">
      <v-text-field label="Name" v-model="rule.name"></v-text-field>
      <v-textarea label="Description" v-model="rule.description"></v-textarea>
      <v-text-field label="Target" v-model="rule.target"></v-text-field>
      <v-text-field label="Condition" v-model="rule.condition"></v-text-field>
      <v-select
        v-model="rule.effect"
        :items="items"
        item-text="text"
        item-value="value"
        label="Effect"
        dense
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="editRule">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "rule_edit",
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
    api.getRuleByID(id).then(response => {
      this.rule = response.data;
      this.loading = false;
    });
  },
  methods: {
    editRule: function() {
      console.log();
      const id = this.$route.params.id;
      api
        .putRuleById(id, this.rule)
        .then(() => {
          this.$router.push(`/rules/${id}`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
