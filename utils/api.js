const URL_BASE = 'https://www.uinav.com'
// banner图片请求
function getBannerImg() {
	return uni.request({
		url: URL_BASE + '/api/public/v1/home/swiperdata'
	}).then(res => {
		return res[1].data.message
	})
}

// https://www.uinav.com/api/public/v1/home/catitems
// 分类catitwms
function getCatitem() {
	return uni.request({
		url: URL_BASE + '/api/public/v1/home/catitems'
	}).then(res => {
		return res[1].data.message

	})
}

// https://www.uinav.com/api/public/v1/home/floordata
// 获取楼层
function getFloordata() {
	return uni.request({
		url: URL_BASE + '/api/public/v1/home/floordata'
	}).then(res => {
		return res[1].data.message
	})
}

// https://www.uinav.com/api/public/v1/categories
// 分类以及分类 的东西
function getCategoryes() {
	return uni.request({
		url: URL_BASE + '/api/public/v1/categories'
	}).then(res => {
		// console.log(res,'陈宫')
		return res[1].data.message
	})
}

// https://www.uinav.com/api/public/v1/goods/search
// 根据字段搜索商品
function getSearch ({url, data}) {
	return uni.request({
		data,
		url: URL_BASE + url
	}).then(res => {
		return res[1].data.message.goods
	})
}
// -----------------------------------------------------------

// 这是get公共函数
let loadingCount = 0
function myrequest({
	url,
	isLoading = true,
	data
}) {
	return new Promise((resolve, reject) => {
		// 请求开始前开启loading
		if (isLoading) {
			uni.showLoading({
				mask: true
			})
			// 每次触发显示loading时,数量+1
			loadingCount++
		}
		// 开始发请求
		uni.request({
			url: URL_BASE + url,
			data,
			success: (res) => {
				let {
					message,
					meta
				} = res.data
				if (meta.status === 200) {
					resolve(message)
				} else {
					reject(res.data)
				}
			},
			complete: () => {
				if (isLoading) {
					loadingCount--
					if (loadingCount === 0) {
						uni.hideLoading()
					}
				}
			}
		})
	})
}

export {
	getBannerImg,
	getCatitem,
	getFloordata,
	getCategoryes,
	myrequest,
	getSearch
}
