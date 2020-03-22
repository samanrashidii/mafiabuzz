export default {
  methods: {
    dice(number) {
      const diceValue = Math.floor(Math.random() * number) + 1;
      return diceValue;
    },
  },
};
