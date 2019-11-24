<template>
  <div id="app">
    <back-to-top bottom="50px" right="50px">
      <button type="button" class="scroll-to-top">
        <arrow-up-icon size="1.5x" class="custom-class"></arrow-up-icon>
      </button>
    </back-to-top>

    <div class="container-fluid">
      <div class="row">
        <aside class="col-12 col-md-2 p-0 bg-dark fixed-top">
          <nav>
            <ul>
              <li>
                <router-link to="/">Hem</router-link>
              </li>
              <li>
                <router-link to="/scrape">Hämta priser</router-link>
              </li>
              <li>
                <router-link to="/createurl">Urler</router-link>
              </li>
            </ul>
          </nav>
        </aside>

        <main id="main" class="col offset-md-2 bg-faded py-3">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import BackToTop from "vue-backtotop";
import { ArrowUpIcon } from "vue-feather-icons";

export default {
  name: "app",
  components: { BackToTop, ArrowUpIcon }
};
</script>



<style lang="scss" >
body,
html {
  height: 100%;
  padding-top: 1em;
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