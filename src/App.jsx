import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Room from './components/Room'
import {computeEveryRoomPrice} from './utils'
function App() {
	const [totalCosts,setTotalCosts] = useState()
	const [unitPrice,setUnitPrice] = useState()
	const [days,setDays] = useState()
	const [rooms, setRooms] = useState([])
	const [result,setResult] = useState(null)

	let local_options = localStorage.getItem('options')
	try {
		local_options = JSON.parse(local_options)
	} catch (error) {
		
	}
	const handleUseLast = ()=>{
		console.log(local_options)
		setRooms(local_options.rooms)
		setUnitPrice(local_options.unitPrice)
		setTotalCosts(local_options.totalPrice)
		setDays(local_options.days)
	}

	const addRoom = () => {
		setRooms(
			[...rooms, { name: '房间', peoples: [{name:'室友',days:days}], totalPass:0 }]
		)
	}
	const onComputed = () => {
		console.log('jisuan', rooms)
		const data = {
			rooms: rooms, //房间数组数据
			totalPrice: parseFloat(totalCosts), //总电费(元)
			unitPrice: parseFloat(unitPrice), //电费单价
		}
		if(!data.totalPrice){
			alert('请输入总电费')
			return
		}
		if(rooms.length==0){
			alert('请添加房间数据')
			return
		}
		if(!data.unitPrice){
			alert('请输入电费单价')
			return
		}
		localStorage.setItem('options',JSON.stringify({...data,days:days}))
		setResult(computeEveryRoomPrice(data))
	}
	const handleChange = (data, i) => {
		setRooms(
			() => rooms.map(
				(item, index) => {
					if (index == i) {
						return data
					} else {
						return item
					}
				}
			)
		)
		console.log('99999', data, i)
	}
	const handleDeleteRoom = (i)=>{
		setRooms(()=>rooms.filter((item,index)=> i!==index))
	}
	const onClear = ()=>{
		setRooms([])
		setUnitPrice('')
		setTotalCosts('')
		setDays('')
		setResult(null)
	}
	return (
		<div className='App'>
			<div className='head'>合租计算水/电/气费</div>
			 {local_options?<button onClick={handleUseLast}>使用上次数据</button>:''}
			<div className='totalCosts'>
				<span>总费用：</span>
				<input onChange={(e)=>setTotalCosts(e.target.value)} type="text" value={totalCosts} />元
			</div>
			<div className='totalCosts'>
				<span>电费单价：</span>
				<input onChange={(e)=>setUnitPrice(e.target.value)} type="text" value={unitPrice} />元
			</div>
			<div className='totalCosts'>
				<span>天数：</span>
				<input onChange={(e)=>setDays(e.target.value)} type="telephone" value={days} />天
			</div>
			<div className='rooms'>
				{rooms.map((room, index) => <Room onChange={handleChange} onDeleteRoom={handleDeleteRoom} data={{ room }} days={days} i={index} key={index} />)}
				<button onClick={() => addRoom()}>
					+添加房间
				</button>
			</div>
			<div dangerouslySetInnerHTML={{__html:result&&result.resStr||''}} className='result'>
			</div>
			<div className='bottom'>
				<div><button className='clear-btn' onClick={onClear}>清空本次数据</button></div>
				<div><button className='compute-btn' onClick={onComputed}>计算</button></div>
			</div>
		</div>
	)
}

export default App
