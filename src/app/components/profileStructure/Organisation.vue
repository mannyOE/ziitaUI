<template>

    <div id="menu1" class="tab-pane fade animated fadeInUp" :class="{'active in': routeName === 'organisation'}">
        <div class="col-md-8">
            <div class="well personal-well opned" data-toggle="collapse" data-target="#work-profile">
                <p class="person f-weight-6">Organisation</p>
                <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
            </div>
            <div class="well client-personal-details collapse" id="work-profile">

                    <div class="row">
                        <label for="">NAME</label>
                        <input type="text" class="form-control" placeholder="Snapcast.co" v-model="organisation.name">
                        <label for="">DISCRIPTION</label>
                        <textarea type="text" class="form-control" ></textarea>
                        <label for="">ADDRESS</label>
                        <textarea type="text" class="form-control" v-model="organisation.address"></textarea>
                        <label for="">EMAIL</label>
                        <input type="text" class="form-control" placeholder="Youremai@gmail.com" v-model="organisation.email">
                        <label for="">CONTACT NUMBER</label>
                        <input type="text" class="form-control" placeholder="+234-80-7655-454" v-model="organisation.phone">
                        <p class="text-right"><button class="btn btn-default">Save</button></p>
                    </div>


            </div>
        </div>

    </div>

</template>

<script>
import { mapGetters } from 'vuex';
// import { checkUser } from '@/utils';


export default {
    name: 'organisation',
    data(){
        return {
            organisation: {
                name: 'Natterbase Limited',
                address: 'No 70, Alagomeji Yaba Lagos',
                email:'natterbase@gmail.com',
                phone:'08082323423'
            }
        }
    },
    computed: {
         routeName() {
            return this.$route.name;
        },

    },

    }

</script>
<style scoped>

    .client-personal-details input {
    margin-bottom: 12px;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.client-personal-details textarea {
    max-width: 100%;
    margin-bottom: 3%;
    height: 115px;
    resize: none;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.client-personal-details button {
    padding: 8px 50px;
    margin-top: 2%;
    float: right;
    color: #6A86A5;
    font-weight: 600;
}
.client-personal-details {
    background: white;
    padding: 60px;
    margin-top: -2%;
    z-index: -1;
    border: 0px solid white;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10) !important;
}
</style>
