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
		console.log(res)
		return res[1].data.message
	})
}


export {
	getBannerImg,
	getCatitem,
	getFloordata,
	getCategoryes
}
