<template>
  <div class="navigation">
    <nav>
      <router-link :to="{name: 'creator'}">
        <span>
          <img src="@/assets/images/creator.png" alt="Creator Icon" />
          <strong>Creator</strong>
        </span>
      </router-link>
      <router-link :to="{name: 'player'}">
        <span>
          <img src="@/assets/images/player.png" alt="Player Icon" />
          <strong>Player</strong>
        </span>
      </router-link>
      <router-link :to="{name: 'howtoplay'}">
        <span>
          <img src="@/assets/images/howtoplay.png" alt="How to Play Icon" />
          <strong>How to play?</strong>
        </span>
      </router-link>
      <router-link :to="{name: 'about'}">
        <span>
          <img src="@/assets/images/logo.png" alt="Mafia Wars Logo" />
          <strong>About us</strong>
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  
};
</script>
