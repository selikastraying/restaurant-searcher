<template>
  <div>
    <b-list-group-item href="#" @click="closeDetail">
      Back to list
    </b-list-group-item>
    <b-card>
      <template #header>
        <b-card-img :src="resdata.photos[0].getUrl()" alt="Image"></b-card-img>
      </template>
      <h4 class="mb-0">{{ resdata.name }}</h4>

      <b-card-body>
        <b-card-sub-title class="mb-2">
          評分:{{ resdata.rating }}
        </b-card-sub-title>
        <b-card-text> price_level:{{ resdata.price_level }} </b-card-text>
        <b-card-text v-if="resdata.opening_hours.isOpen()">營業中</b-card-text>
        <b-card-text v-if="!resdata.opening_hours.isOpen()">休息中</b-card-text>
        <b-card-text> 地址:{{ detail.formatted_address }} </b-card-text>
        <b-card-text> 電話:{{ detail.formatted_phone_number }} </b-card-text>
        <b-card-text>
          網站:<b-link :href="detail.website">{{ detail.website }}</b-link>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    resdata: {
      type: Object,
      required: true
    },
    detail: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeDetail() {
      this.$emit('update')
    }
  }
}
</script>

<style></style>
