<template>
  <div
    class="patch-notes"
  >
    <div
      class="dashboard-header"
    >
      <BaseButton
        class="patch-bttn awesome3"
        @clicked="togglePatchNotes(true)"
      >
        <span>
          {{ $t('general.patchButton') }}
        </span>
      </BaseButton>
    </div>
    <Overlay
      :class="{
        'active': patchNotes
      }"
    >
      <template>
        <img
          class="app-logo"
          src="@/assets/images/logo.png"
          :alt="$t('general.alt')"
        >
        <h2
          class="app-version"
        >
          {{ 'v' + appVersion }}
        </h2>
        <span
          class="patch-date"
        >
          {{ $t('general.lastUpdate') }}
        </span>
        <ListItem
          :items="$t('patchNotes')"
        />
        <BaseButton
          class="close-bttn secondary has-top-margin"
          @clicked="togglePatchNotes(false)"
        >
          <span>
            {{ $t('common.closeButton') }}
          </span>
        </BaseButton>
      </template>
    </Overlay>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import ListItem from '@/components/ListItem.vue';

export default {
  components: {
    ListItem,
    PageTitle,
  },
  data () {
    return {
      patchNotes: false
    }
  },
  computed: {
    appVersion () {
      return process.env.VUE_APP_VERSION
    }
  },
  methods: {
    togglePatchNotes (value) {
      this.patchNotes = value
    }
  }
}
</script>
