
const formatPrice = function (price) {
	if (!price) {
		return 0 + '元'
	}
	return Math.ceil(price / 10) / 10 + '元'
}

/**
 * 计算均摊费用（水、电、气）
 * @param {Object} options 计算参数
 * @returns {Array}
 */
export const computeEveryRoomPrice = (options)=> {
	let roomList = JSON.parse(JSON.stringify(options.rooms));
	const totalPrice = options.totalPrice * 100;
	const unitPrice = options.unitPrice * 100
	let commonTotalPrice = 0;
	let passTotalPrice = 0
	let total_people_days = 0
	roomList.forEach(room => {
		room.total_people_days = 0
		room.peoples.forEach(people => {
			people.days = parseInt(people.days);
			room.total_people_days += people.days
		})

		total_people_days += room.total_people_days
		room.passPrice = room.totalPass * unitPrice

		room.peopleDayPassPrice = room.passPrice / room.total_people_days
		room.peoples.forEach(people => {
			people.passPrice = room.peopleDayPassPrice * people.days
		})
		passTotalPrice += room.passPrice
	})
	commonTotalPrice = totalPrice - passTotalPrice
	const peopleDayCommonPrice = commonTotalPrice / total_people_days
	let resStr = ''
	resStr += '----总电费：' + totalPrice / 100 + '元----'+'<br \>'
	resStr += '空调-总电费：' + passTotalPrice / 100 + '元'+'<br \>'
	resStr += '普通-总电费：' + commonTotalPrice / 100 + '元'+'<br \>'
	resStr += '人/天-普通电费：' + peopleDayCommonPrice / 100 + '元'+'<br \>'
	resStr += '------每个房间费用------'+'<br \>'

	console.log('----总电费：' + totalPrice / 100 + '元----')
	console.log('空调-总电费：' + passTotalPrice / 100 + '元')
	console.log('普通-总电费：' + commonTotalPrice / 100 + '元')
	console.log('人/天-普通电费：' + peopleDayCommonPrice / 100 + '元')
	console.log('------每个房间费用------')
	roomList.forEach((room,index) => {
		room.commonPrice = peopleDayCommonPrice * room.total_people_days
		room.totalPrice = formatPrice(room.commonPrice + room.passPrice)
		room.passPrice = formatPrice(room.passPrice)
		room.commonPrice = formatPrice(room.commonPrice)
		resStr += room.name +'-'+(index+1)+ '：' + room.totalPrice + '（空调：' + room.passPrice + '+普电：' + room.commonPrice + '）'+'<br \>'
		console.log(room.name +'-'+(index+1)+ '：' + room.totalPrice + '（空调：' + room.passPrice + '+普电：' + room.commonPrice + '）')
		room.peoples.forEach((people,index) => {
			people.commonPrice = peopleDayCommonPrice * people.days
			people.totalPrice = people.commonPrice + people.passPrice
			resStr += people.name +'-'+(index+1)+ ' (空调:' + formatPrice(people.passPrice) + ',普电:' + formatPrice(people.commonPrice) + ')'+'<br \>'
			console.log(people.name + '-'+(index+1)+' (空调:' + formatPrice(people.passPrice) + ',普电:' + formatPrice(people.commonPrice) + ')')
		})
		console.log('<br \>')
	})
	return {rooms:roomList,resStr}
}



// const rooms = [
// 	{
// 		roomName: '主卧', //房间名
// 		peoples: [
// 			{ name: 'xuhaha1', days: 30 },
// 			{ name: 'xuhaha2', days: 30 },
// 		], //人数
// 		totalPass: 0, //空调消耗度数
// 		passPrice: 0, //空调消耗电费
// 		commonPrice: 0, //普通电费
// 		totalPrice: 0 //总电费
// 	},
// 	{
// 		roomName: '主卧隔壁次卧',
// 		peoples: [
// 			{ name: 'xuhaha3', days: 30 },
// 		], //人数
// 		totalPass: 0,
// 		passPrice: 0,
// 		commonPrice: 0,
// 		totalPrice: 0
// 	},
// 	{
// 		roomName: '我',
// 		peoples: [
// 			{ name: 'xuhaha5', days: 30 },
// 		], //人数
// 		totalPass: 0,
// 		passPrice: 0,
// 		commonPrice: 0,
// 		totalPrice: 0
// 	},
// 	{
// 		roomName: '门口',
// 		peoples: [
// 			{ name: 'xuhaha7', days: 30 },
// 		], //人数
// 		totalPass: 0,
// 		passPrice: 0,
// 		commonPrice: 0,
// 		totalPrice: 0
// 	},
// ]
// const options = {
// 	rooms: rooms, //房间数组数据
// 	totalPrice: 327, //总电费(元)
// 	unitPrice: 0.6, //电费单价
// }
// const res = computeEveryRoomPrice(options)