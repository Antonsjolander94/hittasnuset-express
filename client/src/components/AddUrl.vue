<template>
  <b-form inline @submit.prevent="submitUrl" class="mb-3">
    <div class="input-flex">
      <label class="sr-only" for="add-url">Ny url</label>
      <b-input
        id="add-url"
        v-model="userInput"
        type="url"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Lägg till ny url"
      ></b-input>
    </div>
    <b-button
      :disabled="userInput.length < 1"
      variant="outline-secondary"
      type="submit"
      class="ml-auto"
    >Spara</b-button>
  </b-form>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import Loading from "vue-loading-overlay";

export default {
  data() {
    return {
      userInput: ""
    };
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters(["isError"])
  },
  methods: {
    ...mapActions(["addUrl", "fetchUrls"]),
    async submitUrl() {
      await this.addUrl({ priceUrl: this.userInput });
      this.fetchUrls();
    }
  }
};
</script>

<style lang="scss">
.input-flex {
  flex-grow: 1;
  flex-basis: 200px;
  margin-right: 30px;
  input {
    width: 100% !important;
  }
}
</style>