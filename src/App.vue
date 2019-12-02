<template>
  <v-app>
    <component :is="layout">
      <router-view />
      <notifications group="error" position="bottom left" :speed="500" />
    </component>
  </v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "-layout";
    }
  },
  components: {
    MainLayout
  }
};
</script>

<style lang="scss">
@import "assets/index.css";
</style>
