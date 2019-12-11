<template>
  <!-- <div class="row">
    <div class="col-12">
      <button class="button" @click="scrapeSnusBolaget">Skrapa sidor</button>

      <ul v-if="result">
        <li v-for="(data, index) in result" :key="index">
          <pre v-html="data"></pre>
        </li>
      </ul>
    </div>
  </div>-->
  <b-container>
    <b-row>
      <b-col>
        <b-card class="vld-parent">
          <loading :active.sync="isGeneratingPrices" :can-cancel="false" :is-full-page="fullPage"></loading>

          <b-row>
            <b-col>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <h4>Generera nya Priser</h4>
                <div class="scrape-actions d-flex flex-row align-items-center">
                  <transition name="fade" mode="out-in">
                    <div
                      class="d-flex flex-row align-items-center"
                      key="2"
                      v-if="result.length > 0"
                    >
                      <b-button
                        variant="outline-danger"
                        @click="clearGeneratedPrices"
                        class="ml-3"
                      >Rensa genererade priser</b-button>
                      <b-button
                        class="ml-3"
                        variant="success"
                        @click="updateGeneratedPrices"
                      >Uppdatera priser</b-button>
                    </div>
                    <b-button
                      key="1"
                      variant="outline-primary"
                      @click="generatePrices"
                      class="ml-3"
                      v-else
                    >Generera nya priser</b-button>
                  </transition>
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-3" v-if="result.length > 0">
            <b-col cols="12">
              <b-list-group class="mt-3">
                <b-list-group-item>
                  <div class="d-flex flex-row justify-content-between align-items-center">
                    <div class="d-flex flex-row align-items-center">Info</div>
                    <div class="d-flex flex-row align-items-center align-items-center">
                      <p class="price-col dimmed-text">UnitPrice</p>
                      <p class="price-col dimmed-text">TenPrice</p>
                      <p class="price-col dimmed-text">ThirtyPrice</p>
                      <p class="price-col dimmed-text">FiftyPrice</p>
                    </div>
                  </div>
                </b-list-group-item>
                <b-list-group-item class="d-flex flex-row" v-for="(data) in result" :key="data._id">
                  <div class="d-flex flex-column">
                    <p class="dimmed-text">{{data.company}}</p>
                    <strong>{{data.title}}</strong>
                  </div>
                  <div class="d-flex flex-row align-items-center ml-auto">
                    <p class="d-flex flex-column mb-0 price-col">
                      <template v-if="data.unitPrice">{{data.unitPrice}} kr</template>
                      <template v-else>Inget pris</template>
                    </p>
                    <p class="d-flex flex-column mb-0 price-col" v-if="data.tenPrice">
                      <template v-if="data.tenPrice">{{data.tenPrice}} kr</template>
                      <template v-else>Inget pris</template>
                    </p>
                    <p class="d-flex flex-column mb-0 price-col" v-if="data.thirtyPrice">
                      <template v-if="data.thirtyPrice">{{data.thirtyPrice}} kr</template>
                      <template v-else>Inget pris</template>
                    </p>
                    <p class="d-flex flex-column mb-0 price-col">
                      <template v-if="data.fiftyPrice">{{data.fiftyPrice}} kr</template>
                      <template v-else>Inget pris</template>
                    </p>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-card>
          <b-row>
            <b-col>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <h4>Lagrade Priser</h4>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <b-input
                v-model="filterKeyWord"
                class="w-100"
                placeholder="Snuskbolaget... General Vit..."
              ></b-input>
            </b-col>
          </b-row>
          <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
          <b-list-group class="mt-3">
            <b-list-group-item>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <div class="d-flex flex-row align-items-center">Info</div>
                <div class="d-flex flex-row align-items-center align-items-center">
                  <p class="price-col dimmed-text">UnitPrice</p>
                  <p class="price-col dimmed-text">TenPrice</p>
                  <p class="price-col dimmed-text">ThirtyPrice</p>
                  <p class="price-col dimmed-text">FiftyPrice</p>
                </div>
              </div>
            </b-list-group-item>
            <b-list-group-item
              class="d-flex flex-row"
              v-for="(data) in filteredPrices"
              :key="data._id"
            >
              <div class="d-flex flex-column">
                <p class="dimmed-text">{{data.company}}</p>
                <strong>{{data.title}}</strong>
                <div class="d-flex flex-row align-items-center" v-if="data.createdAt">
                  <time>{{moment(data.createdAt).format('YYYY-MM-DD')}}</time>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center ml-auto">
                <p class="d-flex flex-column mb-0 price-col">
                  <template v-if="data.unitPrice">{{data.unitPrice}} kr</template>
                  <template v-else>Inget pris</template>
                </p>
                <p class="d-flex flex-column mb-0 price-col" v-if="data.tenPrice">
                  <template v-if="data.tenPrice">{{data.tenPrice}} kr</template>
                  <template v-else>Inget pris</template>
                </p>
                <p class="d-flex flex-column mb-0 price-col" v-if="data.thirtyPrice">
                  <template v-if="data.thirtyPrice">{{data.thirtyPrice}} kr</template>
                  <template v-else>Inget pris</template>
                </p>
                <p class="d-flex flex-column mb-0 price-col">
                  <template v-if="data.fiftyPrice">{{data.fiftyPrice}} kr</template>
                  <template v-else>Inget pris</template>
                </p>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Loading from "vue-loading-overlay";
import PriceService from "../PriceService.js";
import ScraperService from "../ScraperService.js";
import UrlService from "../UrlService.js";

export default {
  components: {
    Loading
  },
  data() {
    return {
      result: [],
      isLoading: false,
      fullPage: false,
      prices: "",
      urls: "",
      filterKeyWord: "",
      isGeneratingPrices: false
    };
  },
  created() {
    this.loadPrices();
  },
  methods: {
    clearGeneratedPrices() {
      this.result = [];
    },
    async updateGeneratedPrices() {
      if (this.result.length > 0) {
        this.isGeneratingPrices = true;
        await ScraperService.updateOrCreatePrice(this.result).then(res => {
          console.log(res);
          this.isGeneratingPrices = false;
        });

        this.loadPrices();
      }
    },
    async loadPrices() {
      this.result = [];
      try {
        this.isLoading = true;
        this.urls = await UrlService.getUrls();
        this.prices = await PriceService.getPrices();
        console.log({ priser: this.prices });
        this.isLoading = false;
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
      }
    },
    async generatePrices() {
      try {
        this.isGeneratingPrices = true;
        this.results = [];
        await ScraperService.postUrlsToScraper()
          .then(res => {
            if (res) {
              res.map(d => {
                if (d && d.response && d.response.data) {
                  let price = d.response.data;
                  this.result.push(price);
                  console.log({ generated: this.result });
                }
              });
              this.isGeneratingPrices = false;
            }
          })
          .catch(error => {
            console.log(error);
            this.isGeneratingPrices = false;
          });

        this.$bvToast.toast("Lyckades", {
          title: `Hittade ${this.result.length} nya priser 💸`,
          variant: "success"
        });
      } catch (error) {
        this.error = "Något gick fel vid generering av priser";
      }
    }
  },
  computed: {
    urlLength: function() {
      return this.urls.length;
    },
    priceLength: function() {
      return this.prices.length;
    },
    filteredPrices: function() {
      if (!this.filterKeyWord) {
        return this.prices;
      } else if (!this.prices) {
        return false;
      } else {
        let filteredPrice = this.prices.filter(
          x =>
            x.title.toLowerCase().includes(this.filterKeyWord.toLowerCase()) ||
            x.company.toLowerCase().includes(this.filterKeyWord.toLowerCase())
        );
        if (filteredPrice) {
          return filteredPrice;
        } else {
          return false;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.list-group {
  .list-group-item {
    &:hover:not(:first-child) {
      background: rgba($color: #000000, $alpha: 0.02);
      cursor: pointer;
    }
    .dimmed-text {
      opacity: 0.6;
      margin-bottom: 0px;
    }
  }
  .price-col {
    width: 120px;
    margin-bottom: 0px;

    &:last-child {
      width: 70px;
    }
  }
}
</style>