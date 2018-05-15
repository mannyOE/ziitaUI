<template>
    <span>
    <ul class="nav nav-module ">
        <p>Project Name</p>
        <h4 class="f-s-18"><b>{{ name }}</b></h4>
        <hr class="nav-moduules-hr">
        <!-- <li class="active"><a data-toggle="tab" href="#home">
            <small>Create Yout Project Name</small>
            <h4>Projects Details</h4>
        </a></li> -->
        <li class="active"><a href="#">
            <small>select project Type</small>
            <h4>Choose Your Project Type</h4>
        </a></li>
        <li class="module-modal-btn" ><a href="#">
              <small>select project Monoroter</small>
            <h4>Choose Your Project Manager</h4>
       <!--  </a></li>
        <li class="module-modal-btn" ><a href="#">
              <small>Reach Us</small>
            <h4>Call Or Schedule A Call</h4>
        </a></li> -->
    </ul>
	   	</span>
</template>
<script>
export default {
    name: 'project-tabs',
    props: ['name'],
    data() {
        return {
        };
    },
};

</script>
<style scoped>
.nav-module >li>a{
    background: transparent;
    border-right: 1px solid #DEE9F2;
    color: black;
    font-size: 12px;
    font-weight: 400;
}
.next-button button{
     padding: 8px 50px;
    margin-top: 2%;
    color: #6A86A5;
    font-weight: 600;
}
.nav-module>li.active>a, .nav-module>li.active>a:focus, .nav-module>li.active>a:hover{
     border-right: 3px solid #326ADA !important;
     font-weight: 500;
}
small {
    font-size: 85%;
    font-family: 'open sans';
}
h4{
    line-height: 1.5em;
    font-weight: 900;
    color: #4166b3;
    font-size: 19px;
}
.nav-module {
    position: absolute !important;
    left: 21%;
}
small {
    font-size: 10px;
    color: #3a4d75;
    font-weight: 600;
    text-transform: uppercase;
    font-family: 'open sans';
}
.f-s-18{
    font-size:18px !important;
}
.nav-moduules-hr {
    width: 17% !important;
    background: red;
    height: 2px;
    border: none;
}
</style>

