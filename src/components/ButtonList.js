import React from 'react'
import Button from './Button'

const list =["All","Live", "Gaming","Fontend", "News", "Cricket", "Sahil", "Music","Resume","React",]
const ButtonList = () => {
  return (
    <div className='flex m-5 mt-14  overflow-x-auto gap-3    '>
  {list.map((item, index)=>(
  <Button className="hidden sm:block" key={index} name= {item}/>
  ))}
      
    </div>
  )
}

export default ButtonList
