<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style>

    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }

    .el-transfer-panel {
        width: 300px;
        height:400px;
        font-size:5px;
    }

    .el-transfer-panel__list.is-filterable {
        height: 284px;
        padding-top: 0;
        overflow-y: scroll;
    }

    .el-transfer-panel__header{
        text-align: left;
    }

    .el-transfer-panel__body {
        text-align: left;
        height:400px;
    }

    body {
        margin:0px;
    }

</style>
