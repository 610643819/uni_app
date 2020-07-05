<template>
	<view>
		<view class="searchBox">
			<!-- input有点击事件 @focus聚焦 -->
			<input class="search" type="text" confirm-type="search" placeholder="搜索" :value="id" />
			<icon class="searchIcon" type="search" size="18" />
		</view>
	</view>
</template>

<script>
	export default {
		props:['id'],
		data() {
			return {
			}
		},
	}
</script>

<style scoped>
	.searchBox{
		height: 100rpx;
		background-color:#dfdfdf;
		display: flex;
		align-items: center;
	}
	.search {
		position: absolute;
		background-color: #F4F4F4;
		width: 95%;
		height: 60rpx;
		text-align: center;
		margin: 0 25rpx 0 25rpx;
		border-radius: 20rpx;
		color: #a8a8a8;
	}

	.searchIcon {
		position: relative;
		top: -15rpx;
		left: 50%;
		transform: translateX(-170%);
	}
</style>