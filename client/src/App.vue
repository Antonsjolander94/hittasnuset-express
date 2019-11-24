<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav class="col-2 sidebar">
          <ul>
            <li>
              <router-link to="/">Hem</router-link>
            </li>
            <li>
              <router-link to="/scrape">Hem</router-link>
            </li>
          </ul>
        </nav>
        <div class="col-10">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>



<style lang="scss" >
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