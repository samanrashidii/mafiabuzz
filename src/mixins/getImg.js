export default {
  methods: {
    getImgUrl(dir, pic) {
      return require(`@/assets/images/${dir}/${pic}`);
    },
  },
};
