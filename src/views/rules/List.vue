<template>
  <div>
    <RulesTable :rules="rules" />
  </div>
</template>

<script>
import RulesTable from "@/components/RulesTable";
import api from "@/components/backend-api";

export default {
  name: "rules_List",
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
  }
};
</script>

<style scoped></style>
