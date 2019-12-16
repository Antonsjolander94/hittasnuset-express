<template>
  <b-row>
    <b-col cols="12" lg="6">
      <UrlList></UrlList>
    </b-col>
    <b-col cols="12" lg="6">
      <IdentifiersList></IdentifiersList>
    </b-col>
    <b-col cols="12">
      <PriceList></PriceList>
    </b-col>
  </b-row>
</template>

<script>
import UrlList from "@/components/UrlList.vue";
import PriceList from "@/components/PriceList.vue";
import IdentifiersList from "@/components/IdentifiersList.vue";
export default {
  components: {
    UrlList,
    PriceList,
    IdentifiersList
  }
};
</script>

<style>
</style>