<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          @click="navigate(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Container -->
    <v-main>
      <!-- App Bar -->
      <v-app-bar app>
        <v-app-bar-title>Dashboard</v-app-bar-title>
      </v-app-bar>

      <!-- Content -->
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  data() {
    return {
      menuItems: [
        { title: "Home", icon: "mdi-home", route: "/" },
        { title: "Settings", icon: "mdi-cog", route: "/settings" },
        { title: "Profile", icon: "mdi-account", route: "/profile" },
      ],
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style>
/* Optional: Customize layout or theme styles */
</style>
