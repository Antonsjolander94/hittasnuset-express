<template>
  <b-card class="mb-4">
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
    <template v-slot:header>
      <h4 class="mb-0">Produkter</h4>
    </template>
    <b-row>
      <b-col cols="12">
        <AddIdentifier></AddIdentifier>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mb-3">
        <b-input v-model="searchInput" placeholder="Sök produkt.."></b-input>
      </b-col>
      <b-col cols="12" class="mb-1" v-if="searchInput.length > 0">
        Visar resultat för
        <strong>{{searchInput}}</strong>
      </b-col>
    </b-row>
    <b-list-group class="url-list-wrapper" v-if="allIdentifiers && allIdentifiers.length > 0">
      <b-list-group-item
        v-for="identifier in sortedIdentifiers"
        :key="identifier._id"
        class="url-list-item"
      >
        <div class="d-flex flex-row align-items-center justify-content-between">
          <p class="mb-0">{{identifier.title}}</p>
          <p
            class="mb-0"
            v-if="identifier.prices && identifier.prices.length > 0"
          >{{identifier.prices.length}} priser</p>
          <div class="d-flex flex-row align-items-center">
            <b-button
              @click="openIdentifierModal(identifier)"
              variant="outline-secondary"
              type="button"
              size="sm"
            >Priser</b-button>
            <b-button
              variant="outline-danger"
              type="button"
              class="ml-2"
              @click="removeId(identifier._id)"
              size="sm"
            >Ta bort</b-button>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>

    <b-modal id="identifier-modal" :title="identifierObj.title">
      <pre v-if="identifierObj">
        {{identifierObj}}
      </pre>
    </b-modal>
  </b-card>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import Loading from "vue-loading-overlay";
import AddIdentifier from "./AddIdentifier";

export default {
  name: "UrlList",
  components: {
    Loading,
    AddIdentifier
  },
  data() {
    return {
      searchInput: "",
      isLoading: false,
      identifierObj: {}
    };
  },
  methods: {
    ...mapActions(["fetchIdentifiers", "removeIdentifier"]),
    openIdentifierModal(identifier) {
      this.identifierObj = identifier;
      this.$bvModal.show("identifier-modal");
    },
    async removeId(id) {
      this.isLoading = true;
      if (
        window.confirm(
          "Är du säker på att du vill ta bort den här identifieraren?"
        )
      ) {
        await this.removeIdentifier(id);
        await this.fetchIdentifiers();
      }
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters(["allIdentifiers"]),
    sortedIdentifiers: function() {
      if (this.searchInput.length > 0) {
        let filteredData = this.allIdentifiers.filter(item =>
          item.title.toLowerCase().includes(this.searchInput.toLowerCase())
        );
        return filteredData;
      } else {
        return this._.orderBy(
          this.allIdentifiers,
          [ident => ident.title],
          ["desc"]
        );
      }
    }
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchIdentifiers();
    this.isLoading = false;
  }
};
</script>

<style lang="scss">
.url-list-wrapper {
  max-height: 148px;
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