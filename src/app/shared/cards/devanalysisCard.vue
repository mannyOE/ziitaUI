<template>
    <span>
    <div class="row">
            <div class="col-md-5">
                <div class="dev-img">
                    <img :src="imageLink(member)" class="img-responsive">
                </div>
            </div>
             <div class="col-md-7">
                <div class="dev-analysis">
                    <h3>{{ member.first_name }} {{ member.last_name }}</h3>
                    <h5>{{ $_$getUserTypeName(member.type) }}</h5>
                    <i class="ion-eye see-dev-stats" @click="openDevDetail"></i>
                </div>
            </div>
        </div>
    <DeveloperModal @reloadStore="reloadStore" 
        :member="member" 
        :devAnalysis="true" 
        :project="true" 
        :projectId="projectId" 
        :show.sync="showDevModal" 
        @close="closeDev"/>
  
    </span>
</template>

<script>
import NoMember from "@/app/shared/NoMember";
import DeveloperModal from "@/app/shared/modals/developerDetail";
import {API} from "@/config";

export default {
    name: "devStats",
    props: ['member', 'projectId'],
    components: {
      NoMember,
      DeveloperModal,
    },
    data() {
        return {
          showDevModal: false,
          api: API
        }
    },
    computed: {
    },
    methods: {
        openDevDetail() {
          this.showDevModal = true;
        },
        closeDev() {
            this.showDevModal = false;
        },
        reloadStore(type, id) {
            this.$emit('reloadStore', type, id)
        },
        imageLink(member){
            if(!member.profile_thumbnail){
                return require('@/assets/img/1.jpeg');
            }
            return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
        },
    }
 
};
</script>
<style scoped>
.dev-img img{
    border: 2px solid #ddd;
    border-radius: 50%;
}

.dev-analysis h3 {
    color: #728eaa;
    font-size: 15px;
}


.see-dev-stats {
    background-color: #3369da;
    color: #fff;
    padding: 4px 6px;
    cursor: pointer;
    border-radius: 50%;
}
</style>
