<template>
  <div>
    <RulesTable :rules="rules" />
  </div>
</template>

<script>
import RulesTable from "@/components/RulesTable";
import api from "@/components/backend-api";

export default {
  name: "RulesList",
  data: () => ({
    rules: []
  }),
  components: {
    RulesTable
  },
  async mounted() {
    api.getRules().then(response => {
        this.rules = response.data
    });
    console.log(this.rules);
  }
};
</script>

<style scoped></style>
