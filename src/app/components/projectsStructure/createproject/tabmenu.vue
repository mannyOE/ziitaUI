<template>
    <li :class="{ active: active }">
        <a @click.stop="$emit('clicked')">
            <h6 class="tab-title">{{ title }}</h6>
            <span class="tab-title-sub">{{ subtitle1 }} 
                <br>{{ subtitle2 }} 
            </span>
        </a>
    </li>
</template>

<script>
    export default {
        name: 'reach-out',
        props: ['title', 'subtitle1', 'subtitle2', 'active'],
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