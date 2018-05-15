<template>
    <div class="tab-pane" :class="{ active: show, fade: !show }">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'tabpane',
        props: ['show'],
		components: {
		},
		data () {
			return {
			}
		},
		methods: {
		},
    }
</script>

<style>
</style>