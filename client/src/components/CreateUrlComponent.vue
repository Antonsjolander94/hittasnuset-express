<template>
  <b-row>
    <b-container>
      <b-row>
        <b-col>
          <b-card title="Lägg till ny url">
            <b-card-text>
              <b-form class="vld-parent" @submit="onSubmit">
                <loading
                  :active.sync="isRequestLoading"
                  :can-cancel="false"
                  :is-full-page="fullPage"
                ></loading>
                <b-input
                  v-model="form.priceUrl"
                  type="url"
                  id="text-url"
                  aria-describedby="url-help-block"
                ></b-input>
                <b-form-text id="url-help-block">Url:en måste leda till en produktsida.</b-form-text>
                <b-button
                  :disabled="!form.priceUrl"
                  class="mt-3"
                  type="submit"
                  variant="outline-primary"
                >Spara</b-button>
              </b-form>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <b-card no-body class="moreurls vld-parent">
            <loading
              :active.sync="isMultipleRequestLoading"
              :can-cancel="false"
              :is-full-page="fullPage"
            ></loading>
            <b-card-body
              class="c-pointer d-flex justify-content-between flex-row"
              v-b-toggle.accordion-1
            >
              <h4 class="mb-0">Lägg till flera urler</h4>
              <ChevronDownIcon></ChevronDownIcon>
            </b-card-body>

            <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <label for="textarea">
                  Lägg till urler, avsluta varje url med kommatecken.
                  <a
                    target="_blank"
                    href="https://delim.co/"
                  >Dela lista i kommatecken här</a>
                </label>
                <pre class="example-block-pre"><strong>Exempel:<br /></strong><code>https://www.snus2.se/snus/lossnus/general-classic-los.html<strong>,</strong>https://www.snus2.se/snus/lossnus/kronan-original-lossnus.html</code></pre>

                <form @submit.prevent="onSubmitSeveral">
                  <b-form-textarea
                    id="textarea"
                    v-model="tag"
                    placeholder="Klistra in flera urler..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>

                  <b-button
                    :disabled="!tag.length"
                    class="mt-3"
                    type="submit"
                    variant="outline-primary"
                  >Spara</b-button>
                </form>
                <pre v-if="previewMultipleTag" class="mt-3 example-block-pre pre-preview">{{previewMultipleTag}}</pre>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <b-card title="Lagrade urler" class="vld-parent">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>

            <div class="form-inline mb-3">
              <b-input v-model="filterKeyWord" class="mr-3" placeholder="Sök url" type="text"></b-input>
              <b-button
                class="d-flex flex-row align-items-center"
                variant="outline-danger"
                :disabled="!this.results.length > 0"
                @click="deleteAllTheUrls"
              >
                <AlertCircleIcon class="mr-2"></AlertCircleIcon>Ta bort alla urler.
              </b-button>
            </div>

            <div class="list-group" v-if="filteredUrls.length > 0">
              <div
                class="list-group-item d-flex flex-row justify-content-between align-items-center"
                v-for="(url, index) in filteredUrls"
                :key="url._id"
              >
                {{url.url}}
                <b-button size="sm" @click="deletePost(index, url._id)" variant="outline-danger">
                  <trash-2-icon size="1.5x"></trash-2-icon>
                </b-button>
              </div>
            </div>
            <div v-else>
              <p class="mb-0">Hittade inga urler... 😔</p>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </b-row>
</template>

<script>
import UrlService from "../UrlService.js";
import Loading from "vue-loading-overlay";
import {
  Trash2Icon,
  ChevronDownIcon,
  AlertCircleIcon
} from "vue-feather-icons";

export default {
  components: {
    Loading,
    Trash2Icon,
    ChevronDownIcon,
    AlertCircleIcon
  },
  data() {
    return {
      form: {
        priceUrl: ""
      },
      tag: "",
      tags: [],
      results: [],
      filterKeyWord: "",
      response: "",
      error: "",
      isLoading: false,
      isRequestLoading: false,
      isMultipleRequestLoading: false,
      fullPage: true
    };
  },
  computed: {
    filteredUrls: function() {
      if (!this.filterKeyWord) {
        return this.results;
      } else if (!this.results) {
        return false;
      } else {
        let filteredUrls = this.results.filter(x =>
          x.url.toLowerCase().includes(this.filterKeyWord.toLowerCase())
        );
        return filteredUrls;
      }
    },
    previewMultipleTag: function() {
      if (this.tag.length > 0) {
        var temp = new Array();
        temp = this.tag.split(",");
        return temp;
      } else {
        return false;
      }
    }
  },
  methods: {
    async onSubmitSeveral(evt) {
      evt.preventDefault();

      var temp = new Array();
      temp = this.tag.split(",");
      if (temp.length > 1) {
        const results = temp.map(async url => {
          this.isMultipleRequestLoading = true;
          let formData = {
            priceUrl: url
          };
          await UrlService.insertUrl(formData)
            .then(res => {
              this.response = res;
              this.$bvToast.toast(url, {
                title: `Ny url tillagd 👍`,
                variant: "success"
              });
              return true;
            })
            .catch(err => {
              this.error = err;
              this.$bvToast.toast(err, {
                title: "Fel 😡",
                variant: "danger"
              });
            });
        });

        Promise.all(results).then(() => {
          console.log("Done!");
          this.isMultipleRequestLoading = false;
          this.getAllUrls();
        });
      }

      console.log(temp);
    },
    async onSubmit(evt) {
      evt.preventDefault();
      this.isRequestLoading = true;
      this.response = "";
      this.error = "";
      await UrlService.insertUrl(this.form)
        .then(res => {
          this.response = res;

          this.$bvToast.toast(this.form.priceUrl, {
            title: `Ny url tillagd 👍`,
            variant: "success"
          });
          this.getAllUrls();
          this.isRequestLoading = false;
        })
        .catch(err => {
          this.error = err;
          this.isRequestLoading = false;
          this.$bvToast.toast(err, {
            title: "Fel 😡",
            variant: "danger"
          });
        });
    },
    async deletePost(index, id) {
      await UrlService.deleteUrl(id);
      this.results.splice(index, 1);
      this.$bvToast.toast("Url borttagen.", {
        title: "Info ✨",
        variant: "info"
      });
    },
    async deleteAllTheUrls() {
      if (window.confirm("Vill du verkligen ta bort alla urler?")) {
        this.isLoading = true;
        await UrlService.deleteAllUrls();
        this.results = await UrlService.getUrls();
        this.isLoading = false;
      }
    },
    async getAllUrls() {
      try {
        this.isLoading = true;
        this.results = await UrlService.getUrls();
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
        console.log(error);
      }
    }
  },
  async created() {
    try {
      this.isLoading = true;
      this.results = await UrlService.getUrls();
      this.isLoading = false;
    } catch (error) {
      this.error = error;
      this.isLoading = false;
      console.log(error);
    }
  }
};
</script>

<style lang="scss">
.c-pointer {
  cursor: pointer;
}
.example-block-pre {
  border: 1px solid #e5e5e5;
  padding: 10px;
  background: #eee;

  &.pre-preview {
    max-height: 100px;
    overflow: hidden;
    overflow-y: auto;
  }
}
.card {
  &.moreurls {
    .card-body {
      transition: all 0.3s ease;
      border-bottom: 1px solid #e5e5e5;
      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.02);
      }
      &.collapsed {
        border-bottom: 1px solid transparent;
        .feather {
          transform: rotate(0deg);
          transform-origin: center center;
        }
      }
      .feather {
        transform: rotate(180deg);
        transform-origin: center center;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>