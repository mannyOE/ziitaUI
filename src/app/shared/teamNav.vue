<template>
  <header class="header col-xs-10 col-xs-offset-2" style="margin-bottom: 50px;">
    <div class="containerrrr">
      <div class="rows">

          <div class="col-xs-12 header-nav">
             <ul>
            
            <li :class="{'active': tab === 1}" style="margin-left: 10px; margin-right: 20px">
                <a href="#" @click.prevent="switchTab">
                <p class="header-nav-p">overview</p>
              </a>
              <div :class="{'rectangle-3-copy': tab === 1}">

              </div>
            </li>
          </ul>
          <hr style="position: relative; top: -34px; left: 0px; width: 110%;">
        </div>
      </div>
  </div>
  </header>
</template>

<script>
export default {
  data(){
      return {
          tab: 1,
      }
  }
}
</script>


<style scoped>
.header-nav ul {
  list-style-type: none;
  margin-left: 30px;
}
.header-nav ul li {
  position: relative;
  display: inline-block;
  margin-right: 20px;

}
.header-nav ul li a {
  height: 17px;
  width: 94px;
  color: #8C8989;
  /*font-family: "Montserrat";*/
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  text-decoration: none;
}
.header-nav {
  text-transform: uppercase;
	height: 38px;
	width: 80%;
  margin-bottom: 50px;
  margin-left: -80px;
}
.active {
  color: #000;
  font-weight: bolder;
}
.rectangle-3-copy {
	height: 30px;
	width: 3px;
	transform: rotate(-90deg);
	border-radius: 100px 0 0 100px;
	background: linear-gradient(180deg, #61A3EF 0%, #326ADA 100%);
  margin: 0 auto 0 auto;
}


.flynow {
  margin-bottom: 15px;
	height: 26px;
	width: 100%;
	color: #453F3F;
  text-transform: capitalize;
	font-family: "Montserrat";
	font-size: 18px;
	font-weight: bold;
	line-height: 26px;
}