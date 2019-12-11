<template>
  <b-card class="mb-3 vld-parent">
    <loading :active.sync="loading" :can-cancel="false" :is-full-page="true"></loading>
    <template v-slot:header>
      <h4 class="mb-0">Lagrade priser</h4>
    </template>
    <b-row class="mb-3">
      <b-col>
        <div class="d-flex flex-row align-items-center">
          <b-button
            @click="scrapeAllUrls"
            variant="outline-secondary"
            class="pull-right"
          >Generera nya priser</b-button>
          <b-button
            class="ml-3"
            @click="removePrices"
            variant="outline-danger"
            v-if="allPrices && allPrices.length > 0"
          >Ta bort alla lagrade priser</b-button>
        </div>
      </b-col>
    </b-row>

    <div class="table-responsive" v-if="allPrices && allPrices.length > 0">
      <table class="table">
        <thead class="thead">
          <tr>
            <th scope="col">Företag</th>
            <th scope="col">Produkt</th>
            <th scope="col">Styckpris</th>
            <th scope="col">10-pack</th>
            <th scope="col">30-pack</th>
            <th scope="col">50-pack</th>
            <th scope="col">Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="price in sortedPrices" :key="price._id">
            <td>{{price.company}}</td>
            <td>{{price.title}}</td>
            <td>{{price.unitPrice ? price.unitPrice + ' kr' : '-'}}</td>
            <td>{{price.tenPrice ? price.tenPrice + ' kr' : '-'}}</td>
            <td>{{price.thirtyPrice ? price.thirtyPrice + ' kr' : '-'}}</td>
            <td>{{price.fiftyPrice ? price.fiftyPrice + ' kr' : '-'}}</td>
            <td>
              <b-button size="sm" variant="outline-danger" @click="removePrice(price._id)">Ta bort</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-list-group v-else>
      <b-list-group-item>Hittade inga priser... 😔💸</b-list-group-item>
    </b-list-group>

    <b-modal size="lg" ref="my-modal" hide-footer title="Genererade priser">
      <div class="table-responsive" v-if="allScrapeData && allScrapeData.length > 0">
        <table class="table">
          <thead class="thead">
            <tr>
              <th scope="col">Företag</th>
              <th scope="col">Produkt</th>
              <th scope="col">Styckpris</th>
              <th scope="col">10-pack</th>
              <th scope="col">30-pack</th>
              <th scope="col">50-pack</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="price in allScrapeData" :key="price._id">
              <td>{{price.scraped.company}}</td>
              <td>{{price.scraped.title}}</td>
              <td>{{price.scraped.unitPrice}} kr</td>
              <td>{{price.scraped.tenPrice}} kr</td>
              <td>{{price.scraped.thirtyPrice}} kr</td>
              <td>{{price.scraped.fiftyPrice}} kr</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex flex-row align-items-center mt-5">
        <b-button variant="primary" @click="saveGeneratedPrices">Spara priser</b-button>
        <b-button class="ml-auto" variant="outline-secondary" @click="hideModal">Avbryt</b-button>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PriceService from "../services/PriceService";
import Loading from "vue-loading-overlay";
export default {
  data() {
    return {
      loading: false
    };
  },
  components: { Loading },
  computed: {
    ...mapGetters(["allUrls", "allPrices", "isLoading", "allScrapeData"]),
    sortedPrices: function() {
      return this._.orderBy(
        this.allPrices,
        [price => price.company.toLowerCase()],
        ["desc"]
      );
    }
  },
  async mounted() {
    this.fetchPrices();
  },
  methods: {
    ...mapActions([
      "scrapeUrls",
      "fetchPrices",
      "deletePrice",
      "removeScrapedData"
    ]),
    async scrapeAllUrls() {
      if (this.allUrls) {
        this.loading = true;
        await this.scrapeUrls(this.allUrls);
        if (this.allScrapeData.length > 0) {
          console.log({ scrapeData: this.allScrapeData });
          this.loading = false;
          this.$refs["my-modal"].show();
        }
      }
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      this.removeScrapedData();
    },
    async removePrice(id) {
      if (
        window.confirm("Är du säker på att du vill ta bort det här priset?")
      ) {
        this.loading = true;
        await PriceService.deletePrice(id);
        this.fetchPrices();
        this.loading = false;
      }
    },
    async saveGeneratedPrices() {
      if (this.allScrapeData && this.allScrapeData.length > 0) {
        this.loading = true;
        let response = await PriceService.insertPrice(this.allScrapeData);
        if (response) {
          console.log({ saveGeneratedPrices: response });
          this.fetchPrices();
        }

        this.loading = false;
        this.$refs["my-modal"].hide();
      }
    },
    async removePrices() {
      if (window.confirm("Ta borta alla lagrade priser?")) {
        this.loading = true;
        await PriceService.deleteAllPrices();
        this.fetchPrices();
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
.grey-bg {
  background: rgba($color: #000000, $alpha: 0.02);
}
.dimmed-text {
  opacity: 0.6;
}
</style>