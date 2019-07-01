<template>
    <div class="roles">
        <ul class="has-clear-fix">
            <li v-for="(role, index) in Roles" :key="index" :class="{'mafia': role.mafia}">
                <input @change="checkRoles(role.name)" type="checkbox" name="roles" :id="`role_${index+1}`" :value="roleControl(role.name, role.mafia)" v-model="selectedRoles" />
                <label :for="`role_${index+1}`">
                    <div class="inner-label">
                        <img :src="getImgUrl(role.icon)" :alt="role.alt" />
                        <strong>{{role.name}} <span v-if="checkNumbers(role.name)">x <i>{{role.name == 'Mafia' ? normalMafia : normalCitizen}}</i></span></strong>
                    </div>
                </label>
                <div class="number-control" v-if="checkNumbers(role.name)">
                    <span @click="decrNumber(role.name, role.mafia)">-</span>
                    <span @click="incrNumber(role.name, role.mafia)">+</span>
                </div>
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
            normalMafia: 0,
            normalCitizen: 0
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
        checkRoles(role){
            if(role == 'Mafia' && this.normalMafia == 0){
                this.normalMafia = 1;
            } else if(role == 'Mafia' && this.normalMafia == 1){
                this.normalMafia = 0;
            } else if(role == 'Citizen' && this.normalCitizen == 0){
                this.normalCitizen = 1;
            } else if(role == 'Citizen' && this.normalCitizen == 1){
                this.normalCitizen = 0;
            }
            this.$emit('selectedRoles', this.selectedRoles); 
        },
        checkNumbers(role){
            if(this.normalMafia > 0 && role == 'Mafia'){
                return true;
            } else if(this.normalCitizen > 0 && role == 'Citizen'){
                return true;
            } else {
                return false;
            }
        },
        incrNumber(role, mafia){
            if(role == 'Mafia'){
                this.normalMafia++;
            } else if(role == 'Citizen'){
                this.normalCitizen++;
            }
            this.selectedRoles.push(this.roleControl(role, mafia));
        },
        decrNumber(role, mafia){
            let $roles = this.selectedRoles;
            if(this.normalCitizen > 1 && role == 'Citizen'){
                for(let el of $roles) {
                    if(el.name == role){
                        $roles.splice($roles.indexOf(el),1);
                        break;
                    }
                }
                this.normalCitizen--;
            }
            if(this.normalMafia > 1 && role == 'Mafia'){
                for(let el of $roles) {
                    if(el.name == role){
                        $roles.splice($roles.indexOf(el),1);
                        break;
                    }
                }
                this.normalMafia--;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.roles{margin-top:15px;}
.roles li{
    position: relative;
    float: left;
    width:48%;
    margin:4% 0 0 4%;
    &:nth-child(2n+1){
        margin-left:0;
    }
}

.roles li label{
    display: table;
    width: 100%;
    height: 140px;
    font-family: $font_mafia;
    font-size: $font_size_big;
    color:$color_1;
    text-align: center;
    padding:5px 7px;
    cursor: pointer;
    background-color: $background_color_citizen;
    border:3px solid $black_color;
    border-radius: 2px;
    transition:all .3s ease-in-out;
    > div{
        display: table-cell;
        vertical-align: middle;
        strong{
            display: block;
            margin-top:5px;
            span{
                font-size: $font_size_8;
                color:$color_2;
                margin-left: 5px;
                transition:all .3s ease-in-out;
                i{font-size: $font_size_big;}
            }
        }
    }
}

.roles li input:checked + label strong span{color:$color_1;}

.roles li.mafia label{background-color:$background_color_mafia;}

.roles li input{display: none;}

.number-control span{
    position:absolute;
    top:50%;
    left:-12px;
    display: block;
    width:30px;
    height: 30px;
    line-height: 26px;
    font-family: $font_normal;
    font-size: $font_size_9;
    color:$color_1;
    text-align: center;
    margin-top:-15px;
    cursor: pointer;
    background-color: $black_color;
    border-radius: 50%;
    z-index: 99;
    &:active{
        color:$red_color;
    }
    &:last-child{
        left:auto;
        right:-12px;
        &:active{
            color:$green_color;
        }
    }
    
}

</style>
