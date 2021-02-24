import axios from 'axios'

const apiClient = axios.create({
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  nearbysearch(lat, lng, radius, type) {
    return apiClient
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=AIzaSyCd6kNCPNNnVZnd45Es3WTY8xfzeYdhUQQ`
      )
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
