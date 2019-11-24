<template>
  <div class="row">
    <div class="col-12">
      <button class="button" @click="scrapeSnusBolaget">Skrapa sidor</button>

      <ul v-if="result">
        <li v-for="(data, index) in result" :key="index">
          <pre v-html="data"></pre>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      urls: [
        "https://www.snusbolaget.se/snus/general-one-white-portionssnus",
        "https://www.snusbolaget.se/snus/goteborgs-rape-xrange-white-portionssnus"
      ],
      result: []
    };
  },
  methods: {
    async scrapeSnusBolaget() {
      try {
        await axios
          .get("http://localhost:5000/api/prices/scrapeWebsites")
          .then(res => {
            if (res.data && res.data.length > 0) {
              res.data.map(r => {
                this.result.push(r);
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>