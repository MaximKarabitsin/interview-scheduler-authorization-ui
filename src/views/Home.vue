<template>
  <div class="home">
    <button class="" @click="callRestService()">
      TEST
    </button>

    <h3>{{ response }}</h3>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      response: [],
      errors: []
    };
  },
  methods: {
    callRestService() {
      axios
        .get(`/api/rule`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.response = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
