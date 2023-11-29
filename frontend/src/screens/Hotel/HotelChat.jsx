import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import hotelAxiosInstance from '../../utils/hotelAxiosInstance.js'
import {toast} from 'react-toastify'
// import { useParams } from 'react-router-dom'
import io from "socket.io-client";
import { useJwt } from "react-jwt";

const ENDPOINT = "http://www.wetravels.online";
var socket, selectedChatCompare
const  HotelChat=() =>{
  const {hotelInfo}=useSelector((state)=>state.hotelauth)
  const [rooms,setRooms]=useState([])
  const [chatId,setChatId]=useState('')
  const [chats,setChats]=useState([])
  const [client,setClient]=useState('')
  const [content,setContent]=useState('')
  const [messageSent,setMessageSent]=useState(false)

  const hotelToken = hotelInfo.hotelToken;
  console.log(hotelToken,'hotelToken');
  const { decodedToken } = useJwt(hotelToken);
  console.log(decodedToken,'decodedToken');

  useEffect(() => {
    const setupSocket = () => {
      if(hotelToken) {
        console.log(decodedToken, 'this is decoded token in useEffect');
        socket = io(ENDPOINT);
        socket.emit("setup", decodedToken);
        socket.on("connection", () => setSocketConnected(true));
      } else {
        console.log('no token found');
      }
    };
    setupSocket();
  }, [hotelToken, decodedToken]);
  // const {chatid}=useParams()

  const sendHandler=async()=>{
    if(content===''){
      toast.error('Message cannot be empty')
      return
    }

    try{
      let res=await hotelAxiosInstance.post(`/sendchat/${chatId}/Hotel`,{content})
if(res){
  setContent('')
  setMessageSent(true)
socket.emit('new message',res.data)
}
    }catch(error){
console.log(error.message);
    }
  }

  useEffect(()=>{
    let fetchMessages=async()=>{
      let res=await hotelAxiosInstance.get(`/get-room-messages/${chatId}`)
      if(res){
        setChats(res.data)
        setMessageSent(false)
        socket.emit('join chat',chatId)

      }
    }
    if(chatId){
      fetchMessages()
    }
    selectedChatCompare=chats
  },[chatId,messageSent])

  useEffect(() => {
    socket.on('message received',(newMessageReceived)=>{
        if(!selectedChatCompare || chatId!==newMessageReceived.room._id){

        }else{
            setChats([...chats,newMessageReceived])
        }
    })
})



useEffect(()=>{
  if(hotelInfo){
    let fetchRooms=async()=>{
      let res=await hotelAxiosInstance.get('/get-hotel-rooms')
      setRooms(res.data)
    }
    fetchRooms()
  }
},[hotelInfo])


  return (
<div className="container mx-auto pl-12">
  <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
    <div className="border-r border-gray-300 lg:col-span-1">
      <div className="mx-3 my-3">
        <div className="relative text-gray-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
            placeholder="Search" required />
        </div>
      </div>

      <ul className="overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
        <li>
          {rooms.length > 0 ? (
            rooms.map((chat,index)=>(
            <a key={index}
              className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none "  style={{ textDecoration: 'none' }} >
              <img className="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username"/>
              <div className="w-full pb-2" onClick={()=>{setChatId(chat._id);setClient(chat.user.name)}}>
                <div className="flex justify-between ">
                  <span className="block ml-2 font-semibold text-gray-600 ">{chat.user.name}</span>
                  <span className="block ml-2 text-sm text-gray-600 ">25 minutes</span>
                </div>
                {/* <span className="block ml-2 text-sm text-gray-600">bye</span> */}
              </div>
            </a>
            ))
          ) : (
            <a
              className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">

              <div className="w-full pb-2">
                <div className="flex justify-between">
                  <span className="block ml-2 font-semibold text-gray-600 no-underline">No Chats found</span>
                </div>
              </div>
            </a>
          )}
        </li>
      </ul>
    </div>
    <div className="hidden lg:col-span-2 lg:block">
      {chatId ? (
        <div className="w-full">
          <div>
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img className="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
              <span className="block ml-2 font-bold text-gray-600">User</span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>

            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                {chats && chats.length > 0 ? (
                  chats.map((chat, index) => (
                    chat.senderType === 'Hotel' ? (
                      <li key={index} className="flex justify-start">
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                          <span className="block">{chat.content}</span>
                        </div>
                      </li>
                    ) : (
                      <li key={index} className="flex justify-end">
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                          <span className="block">{chat.content}</span>
                        </div>
                      </li>
                    )
                  ))
                ) : (
                  <div>
                    <div className="relative h-20 flex items-center p-3 border-b border-gray-300">
                      <span className="absolute w-3 h- bg-green-600 rounded-full left-10 top-3"></span>
                    </div>
                    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                      <ul className="space-y-2">
                        <li className="flex justify-center">
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                            <span className="block">No Chats </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <input type="text" placeholder="Message" value={content} onChange={(e) => setContent(e.target.value)}
                    className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message" required />
                  <button type="submit" onClick={sendHandler}>
                    <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      ) : <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-6 rounded-md">
        <p className="text-center text-gray-700">No chat found</p>
      </div>
    </div>
    }
    </div>
  </div>
</div>

  
  )
}

export default HotelChat
