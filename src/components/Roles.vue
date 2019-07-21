<template>
    <div class="roles">
        <info-box :info="info"></info-box>
        <ul class="has-clear-fix">
            <li v-for="(role, index) in Roles" :key="index" :class="{'mafia': role.mafia}">
                <input @change="checkRoles(role.id), emitRoles()" type="checkbox" name="roles" :id="`role_${index+1}`" :class="{'active': role.selected}" :value="role" v-model="selectedRoles" />
                <label :for="`role_${index+1}`">
                    <div class="inner-label">
                        <img :src="getImgUrl(role.icon)" :alt="role.alt" />
                        <strong>{{role.name}} <span v-if="checkNumbers(role.id)">x <i>{{role.id == 1 ? normalMafia : normalCitizen}}</i></span></strong>
                    </div>
                </label>
                <div class="number-control" v-if="checkNumbers(role.id)">
                    <span @click="decrNumber(role)">-</span>
                    <span @click="incrNumber(role)">+</span>
                </div>
                <a @click="showInfo(role)" class="info" href="javascript:void(0)"></a>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import InfoBox from '@/components/InfoBox.vue';
export default {
    data(){
        return {
            normalMafia: 0,
            normalCitizen: 0,
            info: {
                show: false,
                name: "Loading",
                description: "...",
                icon: "loader.svg",
                mafia: false
            },
            selectedRoles: [],
        }
    },
    computed:{
        ...mapGetters([
            'Roles',
            'SelectedRoles'
        ]),
    },
    created(){
        this.cacheRoles();
    },
    methods:{
        cacheRoles(){
            if(this.SelectedRoles.length > 0){
                this.selectedRoles = this.SelectedRoles;
                let normalMafia = 0;
                let normalCitizen = 0;
                this.selectedRoles.forEach(element => {
                    if(element.id == 1){
                        normalMafia++
                    } else if(element.id == 8){
                        normalCitizen++
                    }
                });
                this.normalMafia = normalMafia;
                this.normalCitizen = normalCitizen;
                this.emitRoles();
            }
        },
        checkNumbers(role){
            if(this.normalMafia > 0 && role == 1){
                return true;
            } else if(this.normalCitizen > 0 && role == 8){
                return true;
            } else {
                return false;
            }
        },
        checkRoles(id){
            this.Roles.forEach(element => {
                if(element.id == id){
                    element.selected == false ? element.selected = true : element.selected = false;
                }
            });
            if(id == 1 && this.normalMafia == 0){
                this.normalMafia = 1;
            } else if(id == 1 && this.normalMafia >= 1){
                this.normalMafia = 0;
                this.selectedRoles = this.selectedRoles.filter(value => value.id != id);
            } else if(id == 8 && this.normalCitizen == 0){
                this.normalCitizen = 1;
            } else if(id == 8 && this.normalCitizen >= 1){
                this.normalCitizen = 0;
                this.selectedRoles = this.selectedRoles.filter(value => value.id != id);
            }
        },
        decrNumber(role){
            let $roles = this.selectedRoles;
            if(this.normalCitizen > 1 && role.id == 8){
                for(let el of $roles) {
                    if(el.id == role.id){
                        $roles.splice($roles.indexOf(el),1);
                        break;
                    }
                }
                this.normalCitizen--;
            }
            if(this.normalMafia > 1 && role.id == 1){
                for(let el of $roles) {
                    if(el.id == role.id){
                        $roles.splice($roles.indexOf(el),1);
                        break;
                    }
                }
                this.normalMafia--;
            }
        },
        emitRoles(){
            this.$emit('selectedRoles', this.selectedRoles);
        },
        getImgUrl(pic) {
            return require(`@/assets/images/roles/${pic}`);
        },
        incrNumber(role){
            let targetRole;
            if(role.id == 1){
                if(this.normalMafia < 10){
                    this.normalMafia++;
                    targetRole = JSON.parse(JSON.stringify(role));
                    this.selectedRoles.push(targetRole);
                }
            } else if(role.id == 8){
                if(this.normalCitizen < 20){
                    this.normalCitizen++;
                    targetRole = JSON.parse(JSON.stringify(role));
                    this.selectedRoles.push(targetRole);
                }
            }
        },
        showInfo(role){
            this.info.name = role.name;
            this.info.icon = role.icon;
            this.info.description = role.description;
            this.info.mafia = role.mafia;
            this.info.show == false ? this.info.show = true : this.info.show = false;
        }
    },
    components: {
        infoBox: InfoBox,
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
    @media #{$breakpoint_tablet} {
        width:31%;
        margin:3.5% 0 0 3.5% !important;
        &:nth-child(3n+1){
            margin-left:0 !important;
        }
    }
}

.roles li label{
    display: table;
    width: 100%;
    height: 144px;
    font-family: $font_mafia;
    font-size: $font_size_big;
    color:$color_1;
    text-align: center;
    padding:5px 7px;
    cursor: pointer;
    background-color: $background_color_citizen;
    border:3px solid $black_color;
    border-radius: 5px;
    transition:all .3s ease-in-out;
    > div{
        display: table-cell;
        vertical-align: middle;
        strong{
            display: block;
            margin-top:5px;
            span{
                display: block;
                font-family: $font_normal;
                font-size: $font_size_6;
                color:$color_1;
                transition:all .3s ease-in-out;
                i{font-size: $font_size_8;}
            }
        }
    }
}

.roles li.mafia label{background-color:$background_color_mafia;}

.roles li input{display: none;}

.number-control span{
    position:absolute;
    bottom:-3px;
    left:-3px;
    display: block;
    width:28px;
    height: 28px;
    line-height: 24px;
    font-family: $font_normal;
    font-size: 24px;
    color:$black_color;
    text-align: center;
    cursor: pointer;
    background-color: $color_1;
    border-radius: 50%;
    transition:all .2s ease-in-out;
    z-index: 99;
    &:active{
        transform: scale(.6,.6);
        border-color:$black_color;
    }
    &:last-child{
        left:auto;
        right:-3px;
    }
    
}


</style>
