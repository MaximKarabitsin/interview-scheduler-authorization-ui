<template>
  <div>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Target</th>
        <th>Condition</th>
        <th>Effect</th>
        <th>Open</th>
      </tr>
      <tr v-for="rule of rules" :key="rule.id">
          <td>{{rule.name}}</td>
          <td>{{rule.description}}</td>
          <td>{{rule.target}}</td>
          <td>{{rule.condition}}</td>
          <td>{{rule.effect}}</td>
          <td>
              <button @click="$router.push('/rules/' + rule.id)">+</button>
          </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "RulesTable",
  props: {
    rules: {
      required: true,
      type: Array
    }
  }
};
</script>

<style scoped></style>
