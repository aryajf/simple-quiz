import moment from "moment/min/moment-with-locales"

const Mixins = {
  mounted() {
    moment.updateLocale('id', {
      relativeTime : {
        future: "%s lagi",
        past:   "%s lalu",
      }
    })
  },
  methods: {
    DateFormat(item) {
      return moment(item).locale('id').format('L, LTS')
    },
    NumberFormat(num) {
      return Number(num).toLocaleString()
    },
    countDown(expiredToken) {
      return new Date(expiredToken) - new Date()
    },
  },
}

export default Mixins