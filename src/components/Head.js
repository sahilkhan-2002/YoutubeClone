import React, { useEffect, useState } from 'react'
import { toggleMenu } from '../utils/appSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { SEARCH_RESULTS } from '../utils/Helper'
const Head = () => {
  const [ searchQuery, setSearchquery]= useState("");
  const [ suggestions, setSuggestions]= useState([]);
  const [ showsuggestions, setShowSuggestions]= useState(false);

  useEffect(()=>{
// console.log(searchQuery)
const timer = setTimeout(()=>{
  getSearchsuggestions();
},200)
return()=>{
  clearTimeout(timer);
}
  },[searchQuery])

  const getSearchsuggestions= async()=>{
    const data = await fetch(SEARCH_RESULTS + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);
  }
    const dispatch = useDispatch();
    const toggleMenuHandler =()=>{
        dispatch(toggleMenu());
    }
  return (  <div className="bg-white border flex items-center justify-between px-2 md:px-4 py-2 fixed w-full z-50 ">
  <div className="flex items-center  md:ml-3 gap-2 md:gap-8">
    <img
      onClick={() => toggleMenuHandler()}
      className="md:h-7 h-8"
      src="https://th.bing.com/th/id/OIP.-nG_tVptnf4oGmIzd7dKVgHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.7&pid=1.7"
      alt=""
    />
  <img className="h-10 md:hidden" src="https://th.bing.com/th/id/OIP.zjMhUcihfwmLxS5W3NBpMgHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7" alt="" />
    <img
      className="md:h-10 hidden md:block"
      src="https://1000marcas.net/wp-content/uploads/2020/02/YouTube-logo.png"
      alt=""
    />
  </div>
  <div className="flex flex-col">
  <div className="flex border border-gray-400 rounded-full text-sm">
    <input
      type="text"
      className="outline-none px-4 md:px-2 md:py-2 md:w-60 rounded-full border-r focus:bg-gray-100 rounded-r"
      placeholder="Search for a video"
      autoFocus
      value={searchQuery}
      onChange={(e)=> setSearchquery(e.target.value)}
      onBlur={()=>setShowSuggestions(false)}
      onFocus={()=>setShowSuggestions(true)}
    />
    <button className="outline-none px-2 md:px-4 py-2 focus:bg-gray-100 rounded-full rounded-l">
    🔍
    </button>
      </div>
      {showsuggestions && <div className='fixed bg-white py-2 px-5 lg:w-[39rem] shadow-lg rounded-lg border border-gray-200 sm:w-[20xrem] '>
     
     <ul>
      {suggestions.map((s)=>(<li key={s} className='py-1 px-2 shadow-sm hover:bg-gray-100 '>{s}</li>))}
      </ul>
     </div>}
  </div>
  <div className="hidden md:block">
    <img
      className="h-5 mr-4"
      src="https://www.bing.com/th?id=OIP.DwqF6HbS4Yo7fkU2CSsEsQHaH9&pid=3.1&cb=&w=300&h=300&p=0"
      alt=""
    />
  </div>
</div>
);
};

//     <div className="bg-white border grid justify-between fixed grid-flow-col p-2 shadow-lg items-center px-2 md:px-4 w-full z-50">
//     <div className="flex items-center col-span-1 md:ml-2 gap-1 md:gap-6">
    //  <img onClick={()=>toggleMenuHandler()} className='cursor-pointer h-8 mx-2 md:h-7 sm:h' alt='menu' src='data:image/png;base64,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'/>
//  <img className="h-10 md:hidden" src="https://th.bing.com/th/id/OIP.zjMhUcihfwmLxS5W3NBpMgHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7" alt="" />
//         <img
//           className="md:h-8 hidden md:block sm:mr-3"
//           src="https://1000marcas.net/wp-content/uploads/2020/02/YouTube-logo.png"
//           alt=""
//         />
//     </div>
//     <div className='col-span-10 items-center'>
//       <div className='ml-4'>

    
//       <input placeholder='Search for a Video' className='lg:w-2/3 sm:w-1/3  border  border-gray-400 focus:bg-gray-200 p-2 rounded-l-full  md:px-4 md:py-2:w-96 outline-blue-200' type='text' value={searchQuery}
//        onChange={(e)=>setSearchquery(e.target.value)}
//       onFocus={()=>setShowSuggestions(true)}
//       onBlur={()=> setShowSuggestions(false)}/>
//       <button className='border border-gray-400 p-2 rounded-r-full bg-gray-300  '>🔍</button>
//     </div>
//     {showsuggestions && <div className='fixed bg-white py-2 px-5 lg:w-[39rem] shadow-lg rounded-lg border border-gray-200 sm:w-[20xrem] '>
     
//      <ul>
//       {suggestions.map((s)=>(<li key={s} className='py-1 px-2 shadow-sm hover:bg-gray-100 '>{s}</li>))}
//       </ul>
//     </div>}
//     </div>
    
//     <div className='col-span-1 hidden md:block'>
//     <img
//           className="h-5 mr-4"
//           src="https://www.bing.com/th?id=OIP.DwqF6HbS4Yo7fkU2CSsEsQHaH9&pid=3.1&cb=&w=300&h=300&p=0"
//           alt=""
//         />
//     </div>
//     </div>
//   )
// }

export default Head
// {showsuggestions && <div className='fixed bg-white py-2 px-5 lg:w-[39rem] shadow-lg rounded-lg border border-gray-200 sm:w-[20xrem] '>
     
// <ul>
//  {suggestions.map((s)=>(<li key={s} className='py-1 px-2 shadow-sm hover:bg-gray-100 '>{s}</li>))}
//  </ul>
// </div>}


