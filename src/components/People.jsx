import { useState } from 'react'
import './People.scss'
function People({ data, onChange, onDelete, i }) {
	console.log(data)
	const handleChange = (e) => {
		onChange(e, data, i, 'name')
	}
	const handleChangeDay = (e) => {
		onChange(e, data, i, 'days')
	}
	const handleDelete = (e) => {
		if(i===0){
			alert('必须有个人啊，不能再删了')
			return
		}
		onDelete(e, data, i)
	}
	return (
		<div className="people">
			<div className='form'>
				<div className='color-green'><span>室友{i+1}：</span><input className='people-name' onChange={handleChange} value={data.name} /></div>
				<div className='color-green'><span>居住天数：</span><input className='people-day' onChange={handleChangeDay} value={data.days} />天</div>
			</div>
			<button className='color-green del-btn' onClick={handleDelete}>删除</button>
		</div>
	)
}

export default People
