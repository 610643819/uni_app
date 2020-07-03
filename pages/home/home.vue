<template>
	<view>
		<!-- 搜索朗 -->
		<view class="searchBox">
			<!-- input有点击事件 @focus聚焦 -->
			<input class="search" type="text" confirm-type="search" value="搜索" />
			<icon class="searchIcon" type="search" size="18" />
		</view>
		<!-- banner -->
		<view class="banner">
			<swiper :indicator-dots="true" circular="true" :interval="3000" :autoplay="true" :duration="300">
				<swiper-item v-for="(item, index) in bannerImg">
					<view class="swiper-item">
						<image :src="item.image_src" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="section">
			<view v-for="(item,index) in catitem" :key="index">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floorData">
			<!-- 加跳转 -->
			<view v-for="(item,index) in floordata" :key="index">
				<view class="floortitle">
					<image :src="item.floor_title.image_src" mode=""></image>
				</view>
				<view class="floorMian">
					<!-- 第一个大图 -->
					<navigator :url="item.product_list[0].naviator_url">
						<view class="floorHeight">
							<image :src="item.product_list[0].image_src" mode=""></image>
						</view>
					</navigator>
					<!-- 大图边上的小图 -->
					<view class="floorFor" v-for="(items, indexs) in item.product_list.length-1">
						<navigator :url="item.product_list[indexs+1].naviator_url">
							<image :src="item.product_list[indexs+1].image_src" mode=""></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<!-- 去到顶部 -->
		
	</view>
</template>

<script>
	import {
		getBannerImg,
		getCatitem,
		getFloordata
	} from '../../utils/http.js'
	export default {
		data() {
			return {
				bannerImg: [],
				catitem: [],
				floordata: {}
			}
		},
		methods: {

		},
		mounted() {
			// 获取banner图
			getBannerImg().then(res => {
				this.bannerImg = res
			})
			// 获取分类
			getCatitem().then(res => {
				this.catitem = res
			})
			getFloordata().then(res => {
				this.floordata = res
			})
		}
	}
</script>

<style scoped>
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

	.banner {
		margin-top: 20rpx;
		border-top: 2rpx ridge #C8C7CC;
		width: 100%;
	}

	.swiper-item image {
		width: 100%;
		height: 340rpx;
	}

	.section {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
	}

	.section image {
		width: 128rpx;
		height: 140rpx;
	}

	.floortitle {
		background-color: #F4F4F4;
		margin-top: 40rpx;
		height: 88rpx;
	}

	.floortitle image {
		position: relative;
		top: 30rpx;
		left: 10rpx;
		height: 65%;
	}
	.floorHeight image{
		float: left;
		height: 474rpx;
	}
	.floorMian {
		margin: 20rpx 17rpx 0 17rpx;
		overflow: hidden;
	}
	.floorMian  image {
		width: 232rpx;
	}

	.floorFor image{
		float: left;
		height: 232rpx;
		margin: 0 0 10rpx 10rpx;
	}
</style>
