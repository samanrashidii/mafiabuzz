<template>
  <div class="role-viewer">
    <h4>{{ $t('god.viewerText') }}</h4>
    <transition
      name="slide"
      mode="out-in"
    >
      <template v-for="(role, index) in roles">
        <div
          class="role-view"
          :key="index"
          v-if="index === item"
        >
          <img
            :src="getImg('/roles', role.icon)"
            :alt="$t(role.alt)"
          >
          <h1>{{ $t(role.name) }}</h1>
        </div>
      </template>
    </transition>
    <AppButton @click.native="closeViewer()">
      {{ $t('god.viewerButton') }}
    </AppButton>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      item: 0,
    };
  },
  computed: {
    ...mapGetters({
      GameSettings: 'gameStatus/GameSettings',
    }),
    gameSettings() {
      return JSON.parse(JSON.stringify(this.GameSettings));
    },
  },
  mounted() {
    if (this.show && this.roles.length > 1) {
      setInterval(() => {
        if (this.item < this.roles.length - 1) {
          this.item++;
        } else {
          this.item = 0;
        }
      }, 2000);
    }
  },
  methods: {
    ...mapActions({
      SetGameSettings: 'gameStatus/SetGameSettings',
    }),
    closeViewer() {
      this.gameSettings.roleViewer = false;
      this.gameSettings.viewerItems = [];
      this.SetGameSettings(this.gameSettings);
    },
  },
};
</script>
