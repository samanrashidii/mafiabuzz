export default {
  methods: {
    getImg (dir, pic) {
      return require(`@/assets/images${dir}/${pic}`)
    }
  }
}
