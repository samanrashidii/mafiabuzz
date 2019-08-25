export default {
  methods: {
    checkGameMode() {
      const mode = {
        name: this.$route.name,
        status: false,
      };
      if (this.$route.params.id == 'single-device') {
        mode.status = true;
      }
      return mode;
    },
  },
};
