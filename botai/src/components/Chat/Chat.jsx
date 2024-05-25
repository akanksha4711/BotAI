import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import BasicRating from '../Rating/Rating';
import Feedback from '../Feedback/Feedback';


function Chat({chatObj, chats, setChats}) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newChats = chats.map(ch => {
        if(ch.id === chatObj.id){
            ch.feedback = feedback;
        }
        return ch;
    })
    setChats(newChats);
  }, [feedback])
  useEffect(() => {
    const newChats = chats.map(ch => {
        if(ch.id === chatObj.id){
            ch.rating = rating;
        }
        return ch;
    })
    setChats(newChats);
  }, [rating])

  if (chatObj.type === "question"){
    return (
        <Stack direction={'row'} spacing={2} className='chat' justifyContent={'start'} alignItems={'center'}>
        <div className='dp'></div>
        <Stack direction={'column'} spacing={1}>
            <strong>You</strong>
            <div>{chatObj.content}</div>
            <div>{chatObj.time}</div>
        </Stack>
      </Stack>
    )
  }
  const {time, type, content, id} = chatObj;
  const handleThumbsUp = () => {
    setShowRating(true);
  }
  const handleThumbsDown = () => {
    setShowFeedback(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.feedback.value);
    setFeedback(e.target.feedback.value);
  }
  
  return (
    <div>
      <Stack direction={'row'} spacing={2} className='chat' justifyContent={'start'} alignItems={'center'}>
        <div className={'dp-bot'}></div>
        <Stack direction={'column'} spacing={1}>
            <strong>Soul AI</strong>
            <div>{content}</div>
            <div style={{color:"rgba(0, 0, 0, 0.62)",fontSize:"12px",display:'flex',justifyContent:'space-between'}}>
                <div>{time}</div>
                <Stack spacing={2} direction={'row'}>
                    <FaRegThumbsUp onClick={handleThumbsUp} size={20} className='rating'/>
                    <FaRegThumbsDown onClick={handleThumbsDown} size={20} className='rating'/>
                </Stack>
            </div>
            {showRating ? <div>
                <BasicRating value={rating} setValue={setRating}/>
            </div> : <></>}
            {showFeedback && <div>
                <Feedback open={showFeedback} handleSubmit={handleSubmit}/>
                <strong>Feedback: </strong>{feedback}
            </div>}
        </Stack>
      </Stack>
    </div>
  )
}

export default Chat
