<template>
    <div class="roles">
        <ul class="has-clear-fix">
            <li v-for="(role, index) in Roles" :key="index" :class="{'mafia': role.mafia}">
                <input @change="checkRoles()" type="checkbox" name="roles" :id="`role_${index+1}`" :value="roleControl(role.name, role.mafia)" v-model="selectedRoles" />
                <label :for="`role_${index+1}`">
                    <div class="inner-label">
                        <img :src="getImgUrl(role.icon)" :alt="role.alt" />
                        <strong>{{role.name}}</strong>
                    </div>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    props:{
        selectedUnits: {
            type: Object
        }
    },
    data(){
        return {
            selectedRoles: [],
        }
    },
    computed:{
        ...mapGetters([
            'Roles',
        ])
    },
    methods:{
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        roleControl(name,role){
            return {
                name : name,
                mafia : role
            }
        },
        checkRoles(){
            this.$emit('selectedRoles', this.selectedRoles); 
        }
    }
}
</script>

<style lang="scss" scoped>

.roles{margin-top:15px;}
.roles li{
    float: left;
    width:48%;
    margin:4% 0 0 4%;
    &:nth-child(2n+1){
        margin-left:0;
    }
}

.roles li label{
    position: relative;
    display: table;
    width: 100%;
    height: 140px;
    font-family: $font_mafia;
    font-size: 30px;
    color:$color_1;
    text-align: center;
    padding:5px 10px;
    cursor: pointer;
    background-color: $background_color_citizen;
    border:3px solid $black_color;
    border-radius: 2px;
    > div{
        display: table-cell;
        vertical-align: middle;
        strong{
            display: block;
            margin-top:5px;
        }
    }
}

.roles li.mafia label{background-color:$background_color_mafia;}

.roles li input{display: none;}



</style>
