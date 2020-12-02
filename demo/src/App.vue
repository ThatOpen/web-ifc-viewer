<template>
  <el-container>
    <el-header>IFC.js demo</el-header>
    <el-container>
      <el-aside width="300px">
        <el-menu
          :default-openeds="['1', '1-1', '1-2']"
          @select="onSelect"
          :default-active="$route.params.id"
        >
          <el-submenu index="1">
            <template #title><i class="el-icon-menu"></i>Examples</template>
            <el-menu-item-group title="Group One">
              <template #title>Buildings</template>
              <el-menu-item index="sample1"> Simple Building 1 </el-menu-item>
              <el-menu-item index="sample2">Simple Building 2</el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="1-2">
              <template #title>House Objects</template>
              <el-menu-item index="1-2-1">Chair 1</el-menu-item>
              <el-menu-item index="1-2-2">Chair 2</el-menu-item>
              <el-menu-item index="1-2-3">Window 1</el-menu-item>
              <el-menu-item index="1-2-4">Window 2</el-menu-item>
              <el-menu-item index="1-2-5">Window and door</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  methods: {
    onSelect(id) {
      console.log(id);
      this.$router.push({
        name: 'viewer',
        params: {
          id
        }
      });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .el-container {
    height: 100%;
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 1px #e6e6e6;
  }

  .el-aside {
    height: 100%;

    .el-menu {
      height: 100%;
    }
  }

  .el-main {
    padding: 0;
  }
}
</style>
