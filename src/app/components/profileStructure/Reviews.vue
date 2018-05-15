<template>
    <span id="skillset-block" >
    <div id="menu1s" class="tab-pane fade animated fadeInUp" :class="{'active in': routeName === 'reviews'}">
        <div class="col-md-8">
            <div class="well personal-well opned" data-toggle="collapse" data-target="#work-profile">
                <p class="person f-weight-6">Work Profile</p>
                <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
            </div>
            <div class="well work-profile collapse" id="work-profile">
                <table class="table table-hover">
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Projects</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Avarage Ratings</td>
                            <td>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>Reviews</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table><br>
                <h5>
                    <b>Client Review</b>
                </h5>
                <div class="well work_testimonial_blue">
                    <p> Working with Michael was a great experience. He’s apt and detailed. We will love to work with him again.</p>

                    <p>
                        <b>- Brian (Snapcast)</b>
                    </p>
                </div>
                <div class="well work_testimonial_white">
                    <p>Working with Michael was a great experience. He’s apt and detailed. We will love to work with him again.</p>
                    <p>
                        <b>- Daniel.</b>
                    </p>
                </div>
            </div>
        </div>

    </div>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';
// import { checkUser } from '@/utils';


// export default {
//     name: 'Reviews',
//     computed: {
//          routeName() {
//             return this.$route.name;
//         }
//     }
// }


export default {
    name: 'Reviews',
    computed: {
        routeName() {
            return this.$route.name;
        },
        // ...mapGetters('auth',[
        //   'id',
        //   'user',
        //   'userType'
        // ])
    },
    // methods: {
    //   checkUser
    // }
}
</script>

<style>

</style>
