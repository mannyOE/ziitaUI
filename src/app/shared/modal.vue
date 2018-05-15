<template>
	<transition mode="out-in" :class="{ 'in': show }"
		name = "modal"
		@enter= "enter"
		@before-leave= "leave">

		<div class  = "modal-mask"
			@click = "close">

			<div class = "modal-wrapper">

				<div @click.stop
					class="modal-content animated"
					:class="animation">
    <!--<div v-show="show" id="hireModal" class="modal" :class="{ 'in': show }" role="dialog">-->
        <slot/>
				</div>
			</div>
		</div>
	</transition>
</template>



<script>
export default {
    data() {
        return {
            animate: true,
            animation: '',
        }
    },
    props: [
        'show',
        'intro',
        'outro'
    ],
    watch: {
        // 'show': {
        //     handler: function (val, old) {
        //         if (val === true) {
        //             document.body.classList.add("modal-open")
        //         } else {
        //             document.body.classList.remove("modal-open")
        //         }
        //     },
        //     deep: true
        // },
    },
    computed: {
        animation_in() {
            if(this.intro === undefined) {
                return 'default';
            }
            else if(this.intro === 'none') {
                return '';
            }
            return this.intro;
        },
        animation_out() {
            if(this.outro === undefined) {
                return 'default';
            }
            else if(this.outro === 'none') {
                return '';
            }
            return this.outro;
        }
    },
    created() {
        document.addEventListener('keydown', (e) => {
            if(e.keyCode === 27) {
                this.close();
            }
        });
    },
    methods: {
        close: function() {
            this.$emit('close');
        },
        enter: function() {
            document.body.classList.add("modal-open")
            this.animation = this.animation_in;
        },
        leave: function() {
            document.body.classList.remove("modal-open")
            this.animation = this.animation_out;
        }
    }
}
</script>

<style>
</style>