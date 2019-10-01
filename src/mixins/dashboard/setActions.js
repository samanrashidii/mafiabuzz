export default {
  methods: {
    setActionsByPriority() {
      const actions = [];
      this.gameSettings.selectedRoles.forEach((x) => {
        if (x.status.hasAction && !x.actionStatus && !x.status.dead && !x.ability.reviver) {
          actions.push(x);
        }
        if (x.status.hasAction && !x.actionStatus && !x.status.dead && x.ability.reviver && this.gameSettings.deadPeople !== 0) {
          actions.push(x);
        }
      });
      const sorted = [...actions.slice().sort((a, b) => ((a.priority > b.priority) ? 1 : -1))];
      this.dashboard.actionBox = sorted;
    },
  },
};
