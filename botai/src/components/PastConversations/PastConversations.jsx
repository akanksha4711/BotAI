import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BasicRating from '../Rating/Rating';

function PastConversations() {
  const [allChats, setAllChats] = useState([]);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    setAllChats(JSON.parse(localStorage.getItem("AllChats")).chats)
  }, [])
  return (
    <div>
      <div style={{textAlign:'center'}}>
        <h1>Conversation History</h1>
        <select name="rating" id="rating" value={rating} onChange={(e) => {
            setRating(Number(e.target.value));
        }}>
            <option value="0">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
      </div>
      {allChats.filter(chats => {
        if(rating === 0) return true;
        return chats.filter(ch => ch.rating === rating).length !== 0
      }).map(chats => {
        return <div className='past-chat'>
            {chats.map(ch => {
                if(ch.type === "question") {
                    return (<Stack direction={'row'} spacing={2} mb={4}>
                        <div className='dp'></div>
                        <Stack direction={'column'} spacing={1}>
                            <strong>You</strong>
                            <div>{ch.content}</div>
                            <div style={{color:"rgba(0, 0, 0, 0.62)", fontSize:"12px"}}>{ch.time}</div>
                        </Stack>
                    </Stack>)
                }
                else {
                    return (
                    <Stack direction={'row'} spacing={2} mb={4}>
                        <div className='dp-bot'></div>
                        <Stack direction={'column'} spacing={1}>
                            <strong>Soul AI</strong>
                            <div>{ch.content}</div>
                            <Stack sx={{color:"rgba(0, 0, 0, 0.62)", fontSize:"12px"}} direction={'row'} spacing={2}>
                                <div>{ch.time}</div>
                                {ch.rating!==0 ? <BasicRating value={ch.rating} type="fixed"/> : <></>}
                            </Stack>
                            {ch.feedback!=="" ? <div><strong>Feedback: </strong>{ch.feedback}</div> : <></>}
                        </Stack>
                    </Stack>
                    )
                }
            })}
        </div>
      })}
    </div>
  )
}

export default PastConversations
