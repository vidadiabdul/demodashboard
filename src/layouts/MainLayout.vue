<template>
  <div class="layout-container">
    <Sidebar />
    <div class="right-container" :style="{ backgroundColor: '#F6F6F6' }">
      <AppBar />
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import AppBar from "@/components/AppBar.vue";

export default {
  name: "MainLayout",
  components: {
    Sidebar,
    AppBar,
  },
};
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
}
.right-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;

}
</style>
