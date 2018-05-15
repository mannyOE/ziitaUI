<template>
    <span>
        <div   data-intro="Select the type of project you want to build" class="text-center">
        <!--     <BannerError v-if="
            " :exempt="true">{{ validationMessage }}</BannerError> -->
            <div class="">
              <div class="people stats-card" :class="{ 'active':  activeId == 'mobile'  }"
              >
                <div class="rectangle-11">
                  <span class="ion-android-phone-portrait"></span>
                </div>
                <div class="web">
                  Mobile
                </div>
                <div class="build-test-your-web ">
                  Develop, manage your mobile application and track your team's activities.
                </div>
                <button class="rectangle-10 btn btn-primary btn-block" @click.prevent="activeLink('mobile')">Create</button>
              </div>
              <div class="people stats-card" :class="{ 'active':  activeId == 'web'  }">
                <div class="rectangle-11">
                  <span class="ion-ios-world-outline"></span>
                </div>
                <div class="web">
                  Web
                </div>
                <div class="build-test-your-web ">
                  Build, test your web application and effectively track your team's activities.
                </div>
                <button class="rectangle-10 btn btn-primary btn-block" @click.prevent="activeLink('web')">Create</button>
              </div>
              <div class="people stats-card" :class="{ 'active':  activeId == 'other'  }">
                <div class="rectangle-11">
                  <span class="ion-ios-monitor-outline"></span>
                </div>
                <div class="web">
                  Others
                </div>
                <div class="build-test-your-web ">
                  Build and manage any other application of your choice.
                </div>
                <button class="rectangle-10 btn btn-primary btn-block" @click.prevent="activeLink('other')">Create</button>
              </div>
            </div>
        </div>
    </span>
</template>

<script>

    export default {
        name: 'choose-project-type',
        props: ['show'],
		components: {
		},
		data () {
			return {
                activeId: null,
                validationError: false,
                validationMessage: 'Please choose a project type to continue',
			}
		},
        computed: {
            getActiveType () {
                if (this.activeId === 'mobile') {
                    return {
                        id: this.$_$projectTypes.mobile.id,
                        name: this.$_$projectTypes.mobile.name,
                    }
                } else if (this.activeId === 'web') {
                    return {
                        id: this.$_$projectTypes.web.id,
                        name: this.$_$projectTypes.web.name,
                    }
                } else if (this.activeId === 'other') {
                    return {
                        id: this.$_$projectTypes.other.id,
                        name: this.$_$projectTypes.other.name,
                    }
                }
                return null
            }
        },
		methods: {
			activeLink(linkIdent) {
				this.activeId = linkIdent;
        const type = this.getActiveType
        if (type !== null) {
            this.$emit('set', type)
        }
			},
            goBack() {
                this.$emit('back')
            },
            sendType() {
                // clear validation error
                this.validationError = false

                const type = this.getActiveType
                if (type !== null) {
                    this.$emit('next', type)
                } else {
                    this.validatePage()
                }
            },
            validatePage() {
                this.$show_notification(this.validationMessage)
            }
		},
    }
</script>


<style scoped>
.rectangle-11 {
	height: 7.23%;
	width: 23.14%;
	border-radius: 10px;
	background: linear-gradient(230.58deg, #61A3EF 0%, #326ADA 100%);
  margin: 6.15% auto 0 auto;
  font-size: 35px;
  color: #fff;
  line-height: 74px;
}
.dactive:before {
    content: "\f382";
    position: absolute;
    font-family: Ionicons;
    color: green;
    top: 7%;
    right: 7%;
    border: 1px solid green;
    font-size: 20px;
    padding: 3px 6px;
    border-radius: 50%;

}
.active {
  box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
	border-radius: 1px;
  border: 1px solid #D8D8D8;
}
.people:hover {
	background: #ffffff;
	/* transform: rotate(90deg); */
	box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
	border-radius: 1px;
	/* margin-top: 27%; */
}
.people{
	background: #ffffff;
	border-radius: 5px;
	padding: 2.36%;
	padding-top: 15px;
	margin-top: 5px;
	transition: all .4s ease;
	margin-bottom: 10px;
}
.stats-card{
	height: 39.06%;
	width: 27.23%;
	border-radius: 3px;
  display: inline-block;
	background-color: #FFFFFF;
	margin-right: 10px;
	text-align: center;
  margin-top: 40px;
}
.image{
  height: 140px;
  width: 140px;
  border-radius: 100%;
}
.build-test-your-web {
	height: 5.08%;
	width: auto;
	color: #4A4A4A;
	font-family: "Avenir Next";
	font-size: 16px;
	font-weight: 500;
	letter-spacing: 0.12px;
	line-height: 22px;
	text-align: center;
  margin: 1.95% auto 0 auto;
}
.web {
	height: 26px;
	color: #4A4A4A;
	font-family: "Avenir Next";
	font-size: 18px;
	font-weight: bold;
	letter-spacing: 0.14px;
	line-height: 25px;
	text-align: center;
  margin: 2.6% auto 0 auto;
}
.rectangle-10 {
	height: 4.2%;
	width: 26.68%;
	border-radius: 3px;
	background-color: #FF346F;
	box-shadow: 0 10px 30px 0 rgba(50,106,218,0.2);
  margin: 4.1% auto auto auto;
}
</style>
