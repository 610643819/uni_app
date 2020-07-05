<template>
	<view>
		<!-- 搜索栏 -->
		<SearchLink></SearchLink>
		<!-- main -->
		<view class="main" v-if="categoryList">
			<!-- leftList -->
			<view class="left">
				<view class="" v-for="(item, index) in categoryList">
					<view class="leftItem" :class="{clickleft:leftStyleIndex===index}" @click="styleIndex(index)">
						{{item.cat_name}}
					</view>
				</view>
			</view>
			<!-- rightmain -->
			<view class="right">
				<view class="rightBox" v-for="(item,index) in categoryList[leftStyleIndex].children" :key="index">
					<view class="itemhearde">
						{{item.cat_name}}
					</view>
					<view class="rightItem">
						<view class="rightItemSon" v-for="(item, index) in item.children">
							<navigator :url="`../searchList/searchList?id=${item.cat_name}`">
								<image :src="item.cat_icon" mode=""></image>
								<text style="display: block;">{{item.cat_name}}</text>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCategoryes
	} from '../../utils/api.js'
	import SearchLink from '../../components/SearchLink.vue';
	export default {
		data() {
			return {
				categoryList: false,
				leftStyleIndex: 0
			}
		},
		methods: {
			styleIndex(index) {
				this.leftStyleIndex = index
			}
		},
		mounted() {
			getCategoryes().then(res => {
				this.categoryList = res
			}).catch(err => {
				console.log(err)
			})
			console.log(123)
		},
		components: {
			SearchLink
		},
	}
</script>

<style scoped>
	.main {
		position: absolute;
		left: 0;
		bottom: 0;
		top: 100rpx;
		right: 0;
		display: flex;
	}

	.rightBox {}

	.itemhearde {
		height: 110rpx;
		text-align: center;
		line-height: 110rpx;
		background-color: #F4F4F4;
	}

	.right {
		overflow: auto;
		flex: 1;
	}

	.rightItem {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.rightItemSon {
		display: flex;
		flex-direction: column;
		text-align: center;
		margin: 10rpx 20rpx 30rpx 20rpx;
	}

	.rightItem image {
		width: 120rpx;
		height: 120rpx;
	}

	.left {
		width: 190rpx;
		overflow: auto;
	}

	.leftItem {
		height: 100rpx;
		color: #333333;
		text-align: center;
		line-height: 100rpx;
		border-bottom: 1rpx solid #eeeeee;
		background-color: #ccc;
	}

	.clickleft {
		background-color: #4b4450;
		color: #f4d68e;
		position: relative;
	}

	.clickleft::after {
		position: absolute;
		left: 0;
		top: 20rpx;
		content: "";
		display: inline-block;
		height: 60rpx;
		width: 10rpx;
		background-color: skyblue;
		z-index: 90;
	}
</style>
