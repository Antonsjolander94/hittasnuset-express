<template>
  <b-row>
    <b-col cols="12" lg="4">
      <UrlList></UrlList>
    </b-col>
    <b-col cols="12" lg="8">
      <PriceList></PriceList>
    </b-col>
  </b-row>
</template>

<script>
import UrlList from "@/components/UrlList.vue";
import PriceList from "@/components/PriceList.vue";
export default {
  components: {
    UrlList,
    PriceList
  }
};
</script>

<style>
</style>