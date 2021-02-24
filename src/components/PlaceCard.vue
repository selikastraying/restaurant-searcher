<template>
  <div>
    <b-card>
      <template #header>
        <b-card-img :src="resdata.photos[0].getUrl()" alt="Image"></b-card-img>
      </template>
      <h4 class="mb-0">{{ resdata.name }}</h4>

      <b-card-body>
        <b-card-sub-title class="mb-2">
          評分:{{ resdata.rating }}
        </b-card-sub-title>
        <b-card-text>price_level:{{ resdata.price_level }}</b-card-text>
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
    }
  }
}
</script>

<style></style>
