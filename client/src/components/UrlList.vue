<template>
  <b-card class="mb-4">
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
    <template v-slot:header>
      <h4 class="mb-0">Urler</h4>
    </template>
    <b-row>
      <b-col cols="12">
        <AddUrl></AddUrl>
      </b-col>
      <b-col cols="12" class="mb-3">
        <b-input v-model="searchInput" placeholder="Sök url.."></b-input>
      </b-col>
      <b-col cols="12" class="mb-1" v-if="searchInput.length > 0">
        Visar resultat för
        <strong>{{searchInput}}</strong>
      </b-col>
    </b-row>
    <b-list-group v-if="allUrls && allUrls.length > 0" class="url-list-wrapper">
      <b-list-group-item button v-for="item in searchUrls" :key="item._id" class="url-list-item">
        <div
          class="d-flex flex-row justify-content-between align-items-center flex-wrap"
        >{{item.url}}</div>
        <div class="url-list-item-overlay">
          <b-button @click.stop="delUrl(item._id)" variant="danger">Ta bort url</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <b-list-group-item>Hittade inga urler... 😔</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import Loading from "vue-loading-overlay";
import AddUrl from "@/components/AddUrl.vue";

export default {
  name: "UrlList",
  components: {
    Loading,
    AddUrl
  },
  data() {
    return {
      searchInput: ""
    };
  },
  async mounted() {
    await this.fetchUrls();
    console.log(this.allUrls);
  },
  methods: {
    ...mapActions(["fetchUrls", "deleteUrl"]),
    async delUrl(id) {
      if (confirm("Är du säker på att du vill ta bort den här url:en?")) {
        await this.deleteUrl(id);
        this.fetchUrls();
      }
    }
  },
  computed: {
    ...mapGetters(["allUrls", "isLoading"]),
    allUrlsLength: function() {
      return this.allUrls.length;
    },
    searchUrls: function() {
      if (this.searchInput.length > 0) {
        return this.allUrls.filter(url =>
          url.url.toLowerCase().includes(this.searchInput)
        );
      } else {
        return this.allUrls;
      }
    }
  }
};
</script>

<style lang="scss">
.url-list-wrapper {
  max-height: 344px;
  overflow-y: auto;
}
.url-list-item {
  position: relative;
  width: 100%;
  .url-list-item-overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background: rgba($color: #000000, $alpha: 0.1);
    transition: all 0.3s ease;
  }
  &:hover {
    .url-list-item-overlay {
      opacity: 1;
    }
  }
}
</style>