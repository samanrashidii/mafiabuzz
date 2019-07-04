<template>
    <div class="about">
        <app-navigation />
        <div class="title">
            <h2>Dash<span>board</span></h2>
            <p>Now let's handle the game ;)</p>
            <div class="step-box">
                <span class="step-number">1</span>
                <label for="quantity">Please write the name of each person:</label>
                <template v-for="(roleInput, index) in SelectedRoles">
                    <input type="text" class="has-xsmall-bottom-margin" :key="index" :placeholder="`Player ${index+1}`" v-model="players[index]" />
                </template>
                <app-button>Assign Roles</app-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data(){
      return {
          players : []
      }
  },
  computed:{
    ...mapGetters([
        'SelectedRoles'
    ]),
  }
}
</script>

<style lang="scss" scoped>

.title h2 span{color:$creator_color;}

</style>
