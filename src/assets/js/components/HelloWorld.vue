<template lang="html">
	<div>{{text}}</div>
</template>

<script>
export default {
	data() {
		return {
			text: 'Hello World!',
		};
	},
};
</script>

<style lang="scss" scoped>
	div {
		text-align: center;
		margin: 100px auto;
		width: 500px;
		font-size: 30px;
		font-weight: bold;
	}
</style>
