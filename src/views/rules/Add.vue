<template>
  <div>
    <notifications group="error" position="top right" :duration="5000" />
    <v-card>
      <v-card-title>
        <span class="headline">Rule</span>
        <v-divider class="mx-4" inset vertical> </v-divider>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            label="Name"
            v-model="rule.name"
            :error-messages="nameError"
            @blur="$v.rule.name.$touch()"
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="rule.description"
            :error-messages="descriptionError"
            @blur="$v.rule.description.$touch()"
          ></v-textarea>
          <v-text-field
            label="Target"
            v-model="rule.target"
            :error-messages="targetError"
            @blur="$v.rule.target.$touch()"
          ></v-text-field>
          <v-text-field
            label="Condition"
            v-model="rule.condition"
            :error-messages="conditionError"
            @blur="$v.rule.condition.$touch()"
          ></v-text-field>
          <v-select
            class="pt-5"
            v-model="rule.effect"
            :items="items"
            item-text="text"
            item-value="value"
            label="Effect"
            :error-messages="effectError"
            @blur="$v.rule.effect.$touch()"
            dense
          ></v-select>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addRule">Add</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/components/backend-api";
import { required } from "vuelidate/lib/validators";

export default {
  name: "rule_add",
  data: () => ({
    rule: {
      name: null,
      description: "",
      target: "",
      condition: "",
      effect: true
    },
    items: [
      { text: "Permit", value: true },
      { text: "Deny", value: false }
    ]
  }),
  computed: {
    nameError: function() {
      if (this.$v.rule.name.$dirty) {
        if (!this.$v.rule.name.required) return "Name is required";
      }
      return "";
    },
    descriptionError: function() {
      if (this.$v.rule.description.$dirty) {
        if (!this.$v.rule.description.required)
          return "Description is required";
      }
      return "";
    },
    targetError: function() {
      if (this.$v.rule.target.$dirty) {
        if (!this.$v.rule.target.required) return "Target is required";
      }
      return "";
    },
    conditionError: function() {
      if (this.$v.rule.condition.$dirty) {
        if (!this.$v.rule.condition.required) return "Condition is required";
      }
      return "";
    },
    effectError: function() {
      if (this.$v.rule.effect.$dirty) {
        if (!this.$v.rule.effect.required) return "Effect is required";
      }
      return "";
    }
  },
  validations: {
    rule: {
      name: { required },
      description: { required },
      target: { required },
      condition: { required },
      effect: { required }
    }
  },
  methods: {
    addRule: function() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      api
        .addRule(this.rule)
        .then(() => {
          this.$router.push(`/rules`);
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
