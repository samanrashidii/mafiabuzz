<template>
  <div
    class="how-to-play"
  >
    <!-- How to Play Header -->
    <div
      class="dashboard-header has-xsmall-top-margin"
    >
      <PageBox>
        <PageTitle />
      </PageBox>
    </div>
    <!-- How to Play Steps -->
    <PageBox
      v-for="(step, index) in $t('pages.howtoplay.steps')"
      :key="index"
    >
      <img
        class="normal-size"
        :src="getImg('/howtoplay', step.icon)"
        alt="How to Play Step Icon"
      >
      <h3
        v-html="step.titl1"
      />
      <p
        v-html="step.desc1"
      />
      <!-- How to Play with Characters -->
      <div
        v-if="step.roles"
      >
        <InfoBox
          class="static"
          v-for="(role, index) in getRoles"
          :key="index"
          :role="role"
        />
      </div>
    </PageBox>
    <!-- Back to Top component because of large page -->
    <BackToTop
      bottom="20px"
      right="20px"
      visibleoffset="600"
    />
  </div>
</template>

<script>
import InfoBox from '@/components/InfoBox.vue';
import PageTitle from '@/components/PageTitle.vue';

export default {
  name: 'HowToPlay',
  components: {
    PageTitle,
    InfoBox
  },
  computed: {
    getRoles() {
      const roles = JSON.parse(JSON.stringify(this.Roles))
      const sortedRoles = []
      roles.forEach((role) => {
        if (role.mafia) {
          sortedRoles.push(role)
        }
      })
      roles.forEach((role) => {
        if (!role.mafia && !role.solo) {
          sortedRoles.push(role)
        }
      })
      roles.forEach((role) => {
        if (!role.mafia && role.solo) {
          sortedRoles.push(role)
        }
      })
      return sortedRoles
    }
  },
  metaInfo () {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`,
      meta: [
      {
          hid: 'description',
          name: 'description',
          content: `${this.$t('meta.howtoplay.description') + this.$t('meta.howtoplay.description')}`
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `${this.$t('meta.howtoplay.description') + this.$t('meta.howtoplay.description')}`
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: 'https://mafiabuzz.app/how-to-play'
        },
        {
          hid: 'twitter-url',
          property: 'twitter:url',
          content: 'https://mafiabuzz.app/how-to-play'
        },
        {
          hid: 'twitter-title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`
        },
        {
          hid: 'twitter-description',
          name: 'twitter:description',
          content: `${this.$t('meta.howtoplay.description') + this.$t('meta.howtoplay.description')}`
        }
      ]
    }
  }
}
</script>
