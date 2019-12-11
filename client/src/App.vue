<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" class="mb-5">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
    </b-navbar>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>



<style lang="scss" >
body,
html {
  height: 100%;
}
[v-cloak] > * {
  display: none;
}
[v-cloak]::before {
  content: "loading…";
}
@media (min-width: 768px) {
  aside {
    height: 100%;
  }
}
@media (max-width: 768px) {
  body {
    padding-top: 6em;
  }
}
.scroll-to-top {
  background: rgba($color: #000000, $alpha: 0.4);
  border: none;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.sidebar {
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #eee;
  padding-left: 0;
  padding-right: 0;
  background: #333;
  height: 100vh;
}
.main-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  li {
    background: white;
    height: 50px;
    margin-right: 15px;
    a {
      display: flex;
      padding: 10px;
      align-items: center;
      justify-content: center;
      height: 100%;
      &.router-link-active {
        background: rgba($color: #000000, $alpha: 0.1);
      }
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
</style>