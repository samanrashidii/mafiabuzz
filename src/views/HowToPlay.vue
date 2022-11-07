<template>
  <div
    class="how-to-play"
  >
    <div
      class="dashboard-header has-xsmall-top-margin"
    >
      <PageBox>
        <PageTitle
          :check-route="checkRoute()"
        />
      </PageBox>
    </div>
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
import checkRoute from '@/mixins/checkRoute';
import sortedRoles from '@/mixins/sortedRoles';

export default {
  name: 'HowToPlay',
  mixins: [
    checkRoute,
    sortedRoles
  ],
  components: {
    InfoBox,
    PageTitle
  },
  computed: {
    roles () {
      return JSON.parse(JSON.stringify(this.Roles));
    }
  },
  metaInfo () {
    return {
      title: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$t('meta.howtoplay.description')}`
        },
        {
          vmid: 'title',
          property: 'og:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`
        },
        {
          vmid: 'ogdescription',
          property: 'og:description',
          content: `${this.$t('meta.howtoplay.description')}`
        },
        {
          vmid: 'ogurl',
          property: 'og:url',
          content: window.location.href
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.$t('general.name')} * ${this.$t('meta.howtoplay.title')}`
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.$t('meta.howtoplay.description')}`
        },
        {
          vmid: 'twitter:url',
          name: 'twitter:url',
          content: window.location.href
        }
      ]
    }
  }
}
</script>
