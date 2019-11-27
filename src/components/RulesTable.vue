<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="rules"
      :options.sync="options"
      :server-items-length="totalRules"
      :loading="loading"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "RulesTable",
  props: {
    rules: {
      required: true,
      type: Array
    },
    totalRules: {
      required: true
    },
    loading: {
      required: true
    }
  },
  data: () => ({
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
      }
    ]
  }),
  watch: {
    options: {
      handler() {
        this.$emit("getRules", this.options);
      },
      deep: true
    }
  }
};
</script>

<style scoped></style>
