<template>
    <span id="nav-links-holder homepaged">
        <header>
            <div class="hero-section">
                <div class="box">
                    <div class="hero">
                        <h1 class="text-center f-fam-r" style="font-family: inherit !important;">Engineering Teams On Steroids</h1>
                        <h4 class="text-center f-fam-r" style="font-family: inherit !important;">Save 80% of time lost and cost in product development</h4><br>
                             <p class="text-center"><router-link :to="{ name: 'signup' }"><span class="btn-main">Get Started</span></router-link></p>
                    </div>
                </div>
            </div>
        </header>
        <div class="container wow bounceInUp" data-wow-duration="3s" >
            <div class="row" style="position: relative;">
                <div class="col-md-7 col-sm-4 col-xs-12 expl-section">
                <h5>Software Development With Ease And Accuracy</h5>
                <hr class="expl-hr">
                   <h4>Product Development in a <b>Box</b>
                     </h4>
                    <p class="f-fam-r "> Zeedas is an advanced product management tool that allows you
                        manage and track the speed and accuracy of developers from anywhere in the world to meet your
                        software needs. </p>
                </div>
                <div class="col-md-5 col-sm-6 col-xs-12 expl-imgs">
                    <img :src="require('@/assets/img/nerd.png')">
                </div>
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-4"></div>
            </div>
        </div>

        <div class="container wow bounceInUp" data-wow-duration="2s">
            <div class="row">
                <div class="col-md-7 col-sm-4 col-xs-12 expl-section">
                <h5></h5>
                <hr class="expl-hr">
                   <h4>Features
                        <b class="emphs-txt"></b>
                     </h4>
                    <p class="f-fam-r ">
                        <img :src="require('@/assets/img/screen1.png')">
                    </p>
                </div>
                <div class="col-md-5 col-sm-6 col-xs-12 expl-imgs">
                    <!--<img :src="require('@/assets/img/nerd.png')">-->
                </div>
            </div>
        </div>

        <div class="container wow bounceInUp" data-wow-duration="2s">
            <div class="row">
                <div class="col-md-5 col-sm-5 col-xs-12 expl-img">
                    <img class="img" :src="require('@/assets/img/Group 786.png')" style="height: 257px; width: auto"  alt="">
                </div>
                <div class="col-md-7 col-sm-7 col-xs-12 expl-section">
                     <h5>Product Owner</h5>
                        <hr class="expl-hr">
                       <h4 class="emphs-txt">Visibility & Forecasting</h4>
                        <p class="f-fam-r">
                            Zeedas can predict when your project will be completed using dependencies that              measure the duration of each task in the project, against the developers speed, accuracy,and the number                 of developers working on the project.

                        </p>
                </div>
            </div>
        </div>

        <div class="container wow bounceInUp" data-wow-duration="2s">
            <div class="row">
                <div class="col-md-7 col-sm-7 col-xs-12 expl-section">
                    <h5>Project Manager</h5>
                        <hr class="expl-hr">
                       <h4 class="emphs-txt">Decentralization</h4>
                        <p class="f-fam-r">

                            Zeedas focuses on decentralized product development. We allow you break your             project into smaller chunks and assign them to different developers around the world. Each developer               works on their tasks independently, and when they deploy, their code is seamlessly pieced together to                make your software.
                        </p>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-12 expl-img">
                     <img class="img" :src="require('@/assets/img/Group 804.png')" alt="">
                </div>
            </div>
        </div>

         <div class="container wow bounceInUp" data-wow-duration="2s">
            <div class="row">
                <div class="col-md-5 col-sm-5 col-xs-12 expl-img-cmplx">
                    <img class="img" :src="require('@/assets/img/img2.png')" alt="">
                </div>
                <div class="col-md-7 col-sm-7 col-xs-12 expl-section">
                     <h5>Company</h5>
                        <hr class="expl-hr">
                       <h4 class="emphs-txt">IP Protection</h4>
                        <p class="f-fam-r"> Zeedas is equipped with an IP control module that ensures no developer has the                project source code on a personal system.</p>
                </div>
            </div>
        </div>


        <div class="container wow bounceInUp" data-wow-duration="2s">
            <div class="row">
                <div class="col-md-7 col-sm-7 col-xs-12 expl-section">
                    <h5>Developers</h5>
                    <hr class="expl-hr">
                    <h4 class="emphs-txt">Code Reusability</h4>
                    <p class="f-fam-r">We automate the process of reusing code that already exists. After creating a task,                Zeedas can automatically identify bits of code that already exist in your project repository, there by saving time and money that could be spent, writing the same code.</b>
                    </p>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-12 expl-img">
                    <img class="img" :src="require('@/assets/img/img1.png')" alt="">
                </div>
            </div>
        </div>

        <div class="approach-sect ">
            <div class="container wow bounceInUp" data-wow-duration="2s">
                <div class="text-center">
                    <h5>Your first Approach</h5>
                    <hr>
                    <h4 class="f-fam-r" style="font-family: inherit !important;">Tailor-made for every
                        <b>Stakeholder</b> on your project
                    </h4>
                       <p class="text-center"><a class="btn btn-default"><router-link :to="{ name: 'signup' }">Get Started</router-link></a></p>
                </div>
            </div>
        </div>
        <div class="container wow bounceInUp" data-wow-duration="2s">
            <div class="row">
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <div class="elipse">
                        <h1>50+</h1>
                        <h6>Engineers</h6>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-12 ">
                    <div class="elipse">
                        <h1>90+</h1>
                        <h6>Designers</h6>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <div class="elipse">
                        <h1>70+</h1>
                        <h6>Project Managers</h6>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <div class="elipse">
                        <h1>250 +</h1>
                        <h6>Happy Clients</h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="container wow bounceInUp" data-wow-duration="2s">
                <div class="center-box">
                        <img  :src="require('@/assets/img/partners.png')" alt="partners" />
                </div>
        </div>
        <div class="container text-center contact">
            <p class="">&copy; 2017 Zeedas Powered by <em>Natterbase</em></p>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="background: #fff;">
            <div class="modal-dialog" role="document">
                <div class="modal-content modal-content-r">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="text-center" id="myModalLabel">Sign Up</h4>
                        <h6 class="text-center">Zeedas helps you stay on top of your projects. Effectively Manage Developers </h6>
                    </div>

                </div>
            </div>
        </div>
    </span>
</template>

<script>
require("@/assets/js/jquery.min.js");
require("@/assets/js/bootstrap.min.js");
var WOW = require("wowjs");

export default {
  name: "Index",
  data() {
    return {
   };
  },
    mounted(){

    new WOW.WOW().init();
}
};
</script>

<style>

</style>

<style scoped>
    .wow .img{
        box-shadow: 1px 0px 14px 4px #d0c1ec;
        border-radius: 5px;
    }
    .center-xs {
        -ms-flex-pack: center;
        -webkit-box-pack: center;
        justify-content: center;
        text-align: center;
    }

    .stats {
        padding: 2rem 0;
        position: relative;
    }
    .stats-wrapper {
        padding: 1rem 0;
    }

    .ellipse h1 {
        font-size: 1.675rem;
        font-weight: bold;
    }

    .ellipse h6 {
        text-transform: uppercase;
        font-size: .6rem;
        line-height: 1rem;
    }

    .stats .ellipse {
        height: 8rem;
        width: 8rem;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #e1e1e1;
        padding-top: 2.5rem;
        text-align: center;
        transition: all .5s ease-in-out;
        cursor: pointer;
    }

    .stats .ellipse:hover {
        background: #326ADA;
        border: none;
        color: #C3E4FF;
        transform: scale(1.2, 1.2);
    }
    .circle {
        background: #e2e2e2;
        opacity: 0;
        border-radius: 50%;
        position: absolute;
        animation: 3s linear bubble infinite;
    }

    .circle-1{
        height: 50px;
        width: 50px;
        top: 45%;
        left: 45%;
    }

    .circle-2 {
        height: 40px;
        width: 40px;
        top: 46.5%;
        left: 45.3%;
        animation-delay: 1s;
    }

    .circle-3 {
        height: 30px;
        width: 30px;
        top: 48.4%;
        left: 45.6%;
        animation-delay: 2s;
    }

    .circle-4 {
        height: 20px;
        width: 20px;
        top: 50%;
        left: 45.9%;
        animation-delay: 3s;
    }

    @keyframes bubble{
        from { opacity: 0.15 }
        to { opacity: 0; transform: scale(15)}
    }

    /*@import url('https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500');*/
/* .hero-section {
  background-image: url("assets/imgs/home_illustration.svg");
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  padding-bottom: 3rem;
  padding-top: 1rem;
} */
/* .hero-section{

} */

.hero-section h1 {
  font-size: 50px;
  -webkit-font-smoothing: antialiased;
  color: #000;
  font-weight: 300;
}
.hero-section h4 {
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
  color: #000;
  font-weight: 200;
  margin-bottom: 1%;
}
hr.expl-hr {
  background: #266fe8;
  border: 0px solid white;
  height: 2px;
  width: 19%;
  margin-left: 0%;
  text-align: left !important;
}
.emphs-txt {
  color: #266fe8;
  font-weight: 900;

}
.expl-section h4 {
  color: #266fe9;
  font-size: 35px;
  width: 80%;

}
.expl-section p {
  color: #000;
  font-weight: 400;
    font-family: Montserrat, sans-serif !important;
}
.expl-section h5 {
  color: #000;
  font-weight: bold;
  margin-bottom: -1%;
    font-family: Montserrat, sans-serif !important;

}
.expl-img img {
  width: 70%;
  margin-left: 10%;
  margin-top: -6%;
}
.expl-img-cmplx img {
  width: 84%;
}
.expl-section {
  margin-bottom: 16%;
}
.approach-sect {
  background-image: linear-gradient(-226deg, #326ada 0%, #121738 100%);
  background-size: contain;
  width: 100%;
  margin-top: 0%;
  padding-top: 5% !important;
  height: 300px;
  margin-bottom: 4%;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: 3rem;
}
.approach-sect h4 {
  color: white;
  margin-bottom: 1%;
}

.approach-sect hr {
  height: 2px;
  background: white;
  width: 8%;
  border: none;
}

.approach-sect h5 {
  color: white;
  font-weight: 900;
}
.approach-sect a {
  border-radius: 50px;
  padding: 9px 40px;
  margin-top: 1%;
  font-size: 11px;
}
.elipse h1 {
  color: #000;
  font-size: 2.675rem;
  font-weight: 900;
}
.elipse {
  border: 1px solid #dcdbdb !important;
  text-align: center;
  border-radius: 50%;
  background: #fff;
  padding: 45px 20px;
  transition: all 0.4s ease;
  width: 62%;
  margin-left: 17%;
  cursor: pointer;
}


.elipse h1 {
  color: #000;
  font-size: 2.675rem;
  font-weight: 900;
  margin-bottom: -9%;
}
.elipse h6 {
  font-size: 11px;
  font-weight: 900;
  color: #777;
}
.elipse:before {
  border-top: 1px solid #dcdbdb;
  content: "";
  position: absolute;
  top: 53%;
  z-index: -1000;
  left: 1%;
  height: 30%;
  width: 100%;
}
.elipse:hover {
  /*transform: scale(1.2);*/
  z-index: 99999;
  color: #fff !important;
    background: #326ADA ;
    border: none;
    /*color: #C3E4FF;*/
    transform: scale(1.2, 1.2);
}

.elipse h1, .elipse h6{
    color: inherit !important;
}

.elipse:hover :before {
  /*z-index: -1 !important;*/
}
.center-box {
  display: block;
  vertical-align: middle;
  text-align: -webkit-center;
  margin-top: 8%;
  margin-bottom: 5%;
}
.container.text-center.contact button {
  padding: 10px 50px;
  border-radius: 50px;
}
.container.text-center.contact {
  margin-bottom: 5%;
  margin-top: 1%;
}
@media (max-width: 929px) {
  .mini-header .navbar-nav > li > a {
    display: none !important;
  }
  .expl-img img {
    display: none;
  }
  .center-box {
    display: none;
  }
  .hero-section h1 {
    font-size: 36px;
    -webkit-font-smoothing: antialiased;
    color: #000;
  }
  .hero-section h4 {
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    color: #000;
    margin-bottom: 1%;
  }
  .btn-main {
    padding: 13px 21px !important;
  }
  .expl-imgs {
    display: none;
  }
  .hero-section {
    margin-bottom: -30%;
  }
  .elipse {
    border: 1px solid #dcdbdb !important;
    text-align: center;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    padding: 43px 48px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    width: 100%;
    margin-left: 0%;
    height: 157px;
    margin-bottom: 10%;
    cursor: pointer;
  }
  .elipse h1 {
    color: #000;
    font-size: 2.675rem;
    font-weight: 900;
    margin-bottom: -3%;
  }
}
@media (max-width: 568px) {
  .expl-img img {
    display: none;
  }
  .center-box {
    display: none;
  }
  .hero-section h1 {
    font-size: 36px;
    -webkit-font-smoothing: antialiased;
    color: #000;
  }
  .hero-section h4 {
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    color: #000;
    margin-bottom: 1%;
  }
  .btn-main {
    padding: 13px 21px !important;
  }
  .expl-imgs {
    display: none;
  }
  .hero-section {
    margin-bottom: -30%;
  }
 .elipse {
    border: 1px solid #dcdbdb !important;
    text-align: center;
    text-align: center;
    border-radius: 100%;
    background: #fff;
    padding: 25px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    width: 150px;
    margin-left: 0%;
    height: 150px;
    margin-bottom: 10%;
    cursor: pointer;
    margin: 10px auto;
}
  .elipse h1 {
    color: #000;
    font-size: 2.675rem;
    font-weight: 900;
    margin-bottom: -3%;
  }
  .mini-header .navbar-nav > li > a {
    display: none !important;
  }
}
.homepaged h1,h2,h3,h4,h5,h6,p,b,div,section,nav,a,button,input{
  font-family: Raleway ;
}
</style>
