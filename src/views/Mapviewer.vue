<template>
  <div>
    <b-list-group-item
      class="w-100 d-md-none"
      data-toggle="collapse"
      href="#resdata"
      role="button"
      aria-expanded="false"
      aria-controls="resdata"
    >
      <span>
        Restaurant Info
      </span>
    </b-list-group-item>
    <b-list-group-item class="w-100 d-none d-md-block">
      <span>
        Restaurant Info
      </span>
    </b-list-group-item>
    <div class="d-flex">
      <div class="flex-fill" id="map"></div>
      <div
        class="info overflow-auto noscrollbar collapse show"
        id="resdata"
        v-if="!detail"
      >
        <b-list-group-item>
          <b-dropdown
            id="dropdown-1"
            :text="'sorted by:' + sorttype"
            class="m-md-2"
          >
            <b-dropdown-item @click="sorttype = 'rating'">
              rating
            </b-dropdown-item>
            <!-- <b-dropdown-item @click="sorttype = 'distance'">
              distance
            </b-dropdown-item> -->
            <b-dropdown-item @click="sorttype = 'price'">
              price
            </b-dropdown-item>
            <b-dropdown-item @click="sorttype = 'name'">
              name
            </b-dropdown-item>
          </b-dropdown>
        </b-list-group-item>
        <div v-for="resdata in resdatagroup" :key="resdata.name">
          <b-list-group-item href="#" @click="getDetail(resdata)">
            <PlaceCard :resdata="resdata" />
          </b-list-group-item>
        </div>
      </div>
      <div class="info overflow-auto noscrollbar" id="detail" v-if="detail">
        <PlaceDetail
          :resdata="openedresdata"
          :detail="detail"
          @update="closeDetail"
        />
        <b-list-group-item href="#">
          路徑規劃
        </b-list-group-item>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceCard from '@/components/PlaceCard.vue'
import PlaceDetail from '@/components/PlaceDetail.vue'

export default {
  data() {
    return {
      map: null,
      position: { lat: 25.0325917, lng: 121.5624999 },
      sorttype: 'rating',
      resdatagroup: [],
      markergroup: [],
      openedresdata: null,
      detail: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: this.position.lat, lng: this.position.lng },
        zoom: 15,
        maxZoom: 20,
        minZoom: 10,
        streetViewControl: false,
        mapTypeControl: false
      })
      window.google.maps.event.addListener(this.map, 'idle', this.resized)
    },
    resized() {
      var request = {
        bounds: this.map.getBounds(),
        type: ['restaurant']
      }

      var service = new window.google.maps.places.PlacesService(this.map)

      service.nearbySearch(request, this.resDataChanged)
    },
    resDataChanged(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.resdatagroup = results
        this.deleteMakers()
        console.log(results)
        this.resdatagroup.forEach(resdata => {
          this.createMakers(resdata.geometry.location)
        })
        console.log(this.markergroup)
      }
    },
    createMakers(location) {
      var marker = new window.google.maps.Marker({
        position: location,
        map: this.map
      })
      this.markergroup.push(marker)
    },
    deleteMakers() {
      this.markergroup.forEach(marker => {
        marker.setMap(null)
        marker = null
      })
      this.markergroup = []
    },
    getDetail(resdata) {
      var request = {
        placeId: resdata.place_id,
        fields: [
          'formatted_address',
          'type',
          'url',
          'formatted_phone_number',
          'website',
          'review',
          'user_ratings_total'
        ]
      }
      var service = new window.google.maps.places.PlacesService(this.map)
      service.getDetails(request, this.setDetail)
      this.openedresdata = resdata
    },
    setDetail(place, status) {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        this.detail = place
      }
    },
    closeDetail() {
      this.openedresdata = null
      this.detail = null
    }
  },
  components: {
    PlaceCard,
    PlaceDetail
  },
  watch: {
    sorttype: function() {
      if (this.sorttype == 'price')
        this.resdatagroup.sort((a, b) =>
          a.price_level > b.price_level ? 1 : -1
        )
      else if (this.sorttype == 'name')
        this.resdatagroup.sort((a, b) => (a.name > b.name ? 1 : -1))
      else if (this.sorttype == 'rating')
        this.resdatagroup.sort((a, b) => (a.rating < b.rating ? 1 : -1))
    }
  }
}
</script>

<style scoped>
#map {
  height: 100vh;
}

#resdata {
  max-height: 100vh;
}

#detail {
  height: 100vh;
}

.info {
  width: 100%;
}

@media (min-width: 768px) {
  .info {
    width: 25%;
  }
}
</style>
