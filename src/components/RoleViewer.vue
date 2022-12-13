<template>
  <div
    class="role-viewer"
  >
    <template
      v-if="roles.length > 0"
    >
      <h4>
        {{ $t('god.roleViewerText') }}
      </h4>
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
              :alt="role.info[currentLang].name"
            >
            <h1>{{ role.info[currentLang].name }}</h1>
          </div>
        </template>
      </transition>
    </template>
    <h2
      v-else
    >
      {{ $t('god.noRolesToView') }}
    </h2>
    <BaseButton
      @clicked="closeViewer()"
    >
      {{ $t('god.roleViewerButton') }}
    </BaseButton>
  </div>
</template>

<script>

export default {
  name: 'RoleViewer',
  props: {
    roles: {
      type: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      item: 0,
      interval: null
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.item < this.roles.length - 1) {
        this.item++
      } else {
        this.item = 0
      }
    }, 2000)
  },
  methods: {
    closeViewer() {
      this.gameSettings.roleViewer = false
      this.gameSettings.searchingUsed = false
      this.gameSettings.viewerItems = []
      this.SetGameSettings(this.gameSettings)
      clearInterval(this.interval)
    }
  }
}
</script>
