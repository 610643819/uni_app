<template>
	<view>
		<!-- 搜索栏 -->
		<SearchLink :id="id"></SearchLink>
		<!-- 内容 -->
		<view class="main" v-if="searchList">
			<!-- 头部 -->
			<view class="header">
				<text :class="{headerRed:headerListIndex === index}" v-for="(item, index) in headerList" @click="headerRed(index)">
					{{item}}
				</text>
			</view>
			<!-- list -->
			<view class="list" v-for="(item, index) in searchList">
				<!-- 图面  kuang 200-220px-->
				<view class="img">
					<image @error="imageError" :src="item.goods_small_logo" mode="widthFix"></image>
				</view>
				<!-- 内容 -->
				<view class="center">
					<text>{{item.goods_name}}</text>
					<text class="text2">￥{{item.goods_price}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getSearch
	} from '../../utils/api.js'
	import SearchLink from '../../components/SearchLink.vue'
	export default {
		data() {
			return {
				pagenum: 1,
				id: '',
				headerList: ['综合', '销量', '价格'],
				headerListIndex: 0,
				searchList: false,
				onReachOff: true
			}
		},
		methods: {
			headerRed(index) {
				this.headerListIndex = index
			},
			imageError(e) {
				console.log(e)
				console.log(111)
			},
			// 数据请求
			getSearchList() {
				// 显式提示框
				uni.showLoading({
					title: '加载中'
				})
				getSearch({
					url: '/api/public/v1/goods/search',
					data: {
						query: this.id,
						pagenum: this.pagenum,
						pagesize: 15
					},
				}).then(res => {
					this.searchList = res
					console.log(this.searchList)
					// 关闭加载提示框
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			// 下来刷新
			onPullDownRefresh() {
				this.pagenum = 0
				this.getSearchList()
			},
			// 上拉加载
			onReachBottom() {
				if (!this.onReachOff) return
				this.onReachOff = false
				++this.pagenum
				uni.showLoading({
					title: '加载更多'
				})
				getSearch({
					url: '/api/public/v1/goods/search',
					data: {
						query: this.id,
						pagenum: this.pagenum,
						pagesize: 8
					},
				}).then(res => {
					// 没有数据了
					if(res.length <= 1) {
						uni.showToast({
						    title: '没有更多东西了哦',
						    duration: 2000
						});
						return
					}
					uni.hideLoading()
					console.log(res)
					this.onReachOff = true
					this.searchList = [...this.searchList, ...res]
				})
				console.log(111)
			}
		},
		onLoad: function(options) {
			this.id = options.id
			this.getSearchList()
		},
		components: {
			SearchLink
		}
	}
</script>

<style lang="less" scoped>
	.main {
		.header {
			display: flex;
			justify-content: space-around;
			height: 100rpx;
			width: 100%;
			border-bottom: 1rpx solid black;

			text {
				font-size: 36rpx;
				line-height: 100rpx;
			}

			.headerRed {
				color: red;
			}
		}

		.list {
			display: flex;
			flex-direction: row;
			width: 100%;
			margin: 0 10rpx;
			padding: 0 10rpx;

			.img {
				image {
					width: 240rpx;
				}
			}

			.center {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				padding-top: 30rpx;
				padding-left: 20rpx;

				.text2 {
					margin-top: 90rpx;
					font-size: 45rpx;
					color: red;
				}

				text {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 36rpx;
					top: 30rpx;
				}
			}
		}
	}
</style>
