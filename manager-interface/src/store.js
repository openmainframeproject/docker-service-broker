import Vue from 'vue'
import axios from 'axios'

Vue.use(axios)

export const store = {
  state: {
    programs: []
  },
  getPrograms () {
    const getUrl = 'https://148.100.99.53:80'
    axios.get(getUrl).then((response) => {
      this.state.programs = response.data
    })
  }
}
