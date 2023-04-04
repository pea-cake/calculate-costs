import { useState } from 'react'
import People from './People'
import './Room.scss'
function Room({data,i,onChange,onDeleteRoom,days}) {
	console.log(data)
	const [peoples, setPeoples] = useState(data.room.peoples||[])
	const [startPass, setStartPass] = useState([])
	const [endPass, setEndPass] = useState([])
	const addPeople = ()=>{
		let new_peoples = [...peoples,{name:'室友',days:days}]
		setPeoples(new_peoples)
		onChange({...data.room,peoples:[...new_peoples]},i)
	}
	const onChangePeople = (e,d,p_i,type)=>{
		console.log(type)
		setPeoples(peoples.map((people,index)=>{
			if(index==p_i){
				d[type]=e.target.value
				return d
			}else{
				return people
			}
		}))
		onChange({...data.room,peoples:peoples},i)
	}
	const onDeletePeople = (e,data,p_i)=>{
		setPeoples(()=>peoples.filter((item,index)=>index!==p_i))
	}

	const handleChangeName = (e)=>{
		console.log(e)
		let new_room = {...data.room}
		new_room.name = e.target.value
		onChange({...new_room,peoples:peoples},i)
	}
	const handleDeleteRoom = ()=>{
		onDeleteRoom(i)
	}
	const handleStartPass = (e)=>{
		setStartPass(e.target.value)
		console.log('end',endPass)
		getTotalPass(e.target.value,endPass)
	}
	const handleEndPass = (e)=>{
		setEndPass(e.target.value)
		console.log('start',startPass)
		getTotalPass(startPass,e.target.value)
	}
	const getTotalPass = (start,end)=> {
		const totalPass = end-start
		let new_room = {...data.room}
		new_room.totalPass = totalPass||0
		onChange({...new_room,peoples:peoples},i)
	};
	return (
		<div className="room">
			<div className='color-red'><span>房间{i+1}：</span><input onChange={handleChangeName} type="text" value={data.room.name} /> <button className='color-red del-btn' onClick={handleDeleteRoom}>删除</button></div>
			<div><span>空调开始度数：</span><input onChange={handleStartPass} type="text" value={data.room.startPass} /></div>
			<div><span>空调结束度数：</span><input onChange={handleEndPass} type="text" value={data.room.endPass} /></div>
			<div className="peoples">
				{peoples.map((people,index)=><People data={people} i={index} onChange={onChangePeople} onDelete={onDeletePeople} key={index}/>)}
				<button className='add-people-btn' onClick={() => addPeople()}>
					+添加室友
				</button>
			</div>
		</div>
	)
}

export default Room
