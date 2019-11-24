<template>
  <div class="row">
    <transition mode="out-in" name="fade">
      <div key="1" class="col-12" v-if="prices.length > 0">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Företag</th>
                <th scope="col">Titel</th>
                <th scope="col">Styckpris</th>
                <th scope="col">Tiopack</th>
                <th scope="col">Trettiopack</th>
                <th scope="col">Femtiopack</th>
                <th scope="col">Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(price, index) in prices" :key="price._id">
                <td>{{price.company}}</td>
                <td>{{price.title}}</td>
                <td>{{price.unitPrice}}</td>
                <td>{{price.tenPrice}}</td>
                <td>{{price.thirtyPrice}}</td>
                <td>{{price.fiftyPrice}}</td>
                <td>
                  <button @click="deletePost(index, price._id)">Ta bort</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div key="2" class="col-12 mb-5" v-else-if="error">
        <b-alert variant="danger" show>{{error}}</b-alert>
      </div>
      <div key="3" class="col-12" v-else>
        <p>Laddar...</p>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import PriceService from "../PriceService.js";
export default {
  name: "PriceComponent",
  data() {
    return {
      prices: [],
      error: ""
    };
  },
  async created() {
    try {
      this.prices = await PriceService.getPrices();
      console.log(this.prices);
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async deletePost(index, id) {
      PriceService.deletePrice(id)
        .then(() => {
          this.prices.splice(index, 1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    sortedPrices: function() {
      return this._.orderBy(
        this.prices,
        [price => price.title.toLowerCase()],
        ["asc"]
      );
    }
  }
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>