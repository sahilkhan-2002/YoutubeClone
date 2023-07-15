import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { getRandomName, makeRandomMessage } from '../utils/Helper';

const LiveChat = () => {
    const [liveMsg,setLiveMsg] = useState('')
  const dispatch = useDispatch();
  const chatMessages = useSelector(store => store.chat.messages);

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

  return (<>
    <div className="ml-2 md:w-1/3 w-full h-[87vh] hideScroll p-2 border border-black bg-slate-100 rounded-lg  flex  ">
      <span className="  bg-slate-100 mb-2 absolute font-semibold py-1 ">Top Chat</span>
      <div className='w-full h-[85%] p-2 flex flex-col-reverse overflow-y-scroll    '>
        {chatMessages.map((c,i)=>(
        <ChatMessage  key={i} name={c.name} messages={c.messages}/>
      ))}
       
   </div>
   
    </div>
    <div className='border border-black'>
       <input
            type="text"
            placeholder="Write here"
            autoFocus
            className="px-2 py-1  border-b w-4/5 outline-none"
            value={liveMsg}
            onChange={(e)=>setLiveMsg(e.target.value)}
          />
          <button className="px-2 py-1 rounded border w-1/5  outline-none bg-green-200">Send</button>
        </div>
    </>
  );
};

export default LiveChat;
