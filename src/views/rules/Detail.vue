<template>
  <div>
    <p>Name: {{ record.name }}</p>
    <p>Description: {{ record.description }}</p>
    <p>Target: {{ record.target }}</p>
    <p>Condition: {{ record.condition }}</p>
    <p>Effect: {{ record.effect }}</p>
    <button>Edit</button>
    <button>Delete</button>
  </div>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "rule_detail",
  data: () => ({
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id;
    api.getRuleByID(id).then(response => {
      this.record = response.data;
    });
  }
};
</script>

<style scoped></style>
