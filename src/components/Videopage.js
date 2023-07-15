import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import {  useSearchParams } from 'react-router-dom';
import CommentContainer from './CommentContainer';
import LiveChat from './LiveChat';
import ChatMessage from './ChatMessage';
import { addMessage } from '../utils/chatSlice';
import { getRandomName, makeRandomMessage } from '../utils/Helper';

const Videopage = () => {
    
  const [searchparams] = useSearchParams();
  const [liveMsg,setLiveMsg] = useState('') 
 
  const chatMessages = useSelector(store => store.chat.messages);
  

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(closeMenu())

    },[])

    useEffect(() => {
      const intervalId = setInterval(() => {
        dispatch(
          addMessage({
            name: getRandomName(),
            messages: makeRandomMessage(24),
          })
        );
      }, 1500);
  
      return () => clearInterval(intervalId);
    }, []);
  return (
    <div className="relative top-16 md:flex md:flex-row flex flex-col w-full md:h-screen h-full  mx-8  gap-4">
    <div className="md:w-2/3 w-full flex flex-col md:h-auto overflow-y-scroll hideScroll">
    
       <iframe
          className="w-full rounded"
          height="350"
          src={"https://www.youtube.com/embed/" + searchparams.get("v")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      <CommentContainer/>
      </div>
      <div className="flex flex-col md:w-1/3 w-full hideScroll gap-2 px-2 py-1 h-[87vh] border border-gray-300 rounded">
      <span className="font-semibold">Top Chat</span>
      <div className='w-full h-[85%] p-2 flex flex-col-reverse overflow-y-scroll    '>
      {chatMessages.map((item, index) => {
            return <SingleChat key={index} {...item} />;
          })}
       
   </div>
   <form action="" className="flex gap-1  w-full text-xs"
        onSubmit={(e)=>{
          e.preventDefault()
          dispatch(addMessage({
            name : 'You',
            comment : `${liveMsg}`
          }))
          setLiveMsg('')
        }}
        >
          <input
            type="text"
            placeholder="Write here"
            autoFocus
            className="px-2 py-1  border-b w-4/5 outline-none"
            value={liveMsg}
            onChange={(e)=>setLiveMsg(e.target.value)}
          />
          <button className="px-2 py-1 rounded border w-1/5  outline-none bg-green-200">Send</button>
        </form>
        </div>
    </div>
  );
};
const SingleChat = ({ name, comment }) => {
  return (
    <div className="flex items-center gap-3  text-xs">
      <img
        className="h-6"
        src="https://th.bing.com/th/id/OIP.52T8HHBWh6b0dwrG6tSpVQAAAA?w=248&h=183&c=7&r=0&o=5&dpr=1.7&pid=1.7"
        alt=""
      />
      <span className="whitespace-nowrap font-semibold">{name}</span>
      <span className="whitespace-nowrap">{comment}</span>
    </div>
  );
};

export default Videopage
