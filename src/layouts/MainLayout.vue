<template>
  <div>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          v-bind:to="item.url"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">
          Service
        </router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      {
        title: "Rules",
        url: "/rules"
      },
      {
        title: "Policies",
        url: "/policies"
      },
      {
        title: "Policy Set",
        url: "/policysets"
      }
    ]
  })
};
</script>
