export default {
  methods: {
    dice (number) {
      return Math.floor(Math.random() * number) + 1
    }
  }
}
