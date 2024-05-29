import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import './Home.css'
import { Stack } from '@mui/material';
import answerData from '../../assets/sampleData.json';
import Card from '../Card/Card';
import Chat from '../Chat/Chat';
import PastConversations from '../PastConversations/PastConversations';
import { FaRegEdit } from "react-icons/fa";

function Home() {
  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const [pastChats, setPastChats] = useState(false);
  const listRef = useRef(null);
  
  const searchForAnswer = (question) => {
    let maxMatchIdx = 0;
    let matchCount = 0;
    answerData.forEach((ans, idx) => {
        let count = 0;
        const ques = question.split(" ");
        ques.forEach(q => {
            if(ans.question.toLowerCase().includes(q.toLowerCase())) count++;
        });
        if(matchCount < count){
            matchCount = count;
            maxMatchIdx = idx;
        }
    });
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = `${hours}:${minutes}`
    const newChats = [...chats];
    newChats.push({content: question, time, id: chats.length, type:"question"});
    newChats.push({content: answerData[maxMatchIdx].response, time, id: chats.length+1, type:"answer", feedback:"", rating: 0});
    setChats(newChats);
  }
  
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [chats])
  
  return (
    <div>
        <Stack sx={{display: {xs: 'block', sm: 'none'}}} justifyContent={'center'} alignItems={'center'} spacing={2}>
            <Stack sx={{
                backgroundColor: "#D7C7F4",
                padding:"10px"
            }}
            direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2} onClick={() => {
                setPastChats(false);
            }}>
                <div className='dp-bot'></div>
                <div style={{
                    fontSize:"20px"
                }}>New Chat</div>
                <FaRegEdit size={25}/>
            </Stack>
            <button className='btn' style={{marginLeft:"10px", marginRight:"10px"}} onClick={() => {
                setPastChats(true);
            }}>Past Conversations</button>
        </Stack>
        <Grid container>
            <Grid item xs={12} sm={2} sx={{display: {xs: 'none', sm: 'block'}}}>
                <Stack direction={'column'} spacing={2}>
                    <Stack sx={{
                        backgroundColor: "#D7C7F4",
                        padding:"10px"
                    }}
                    direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2} onClick={() => {
                        setPastChats(false);
                    }}>
                        <div className='dp-bot'></div>
                        <div style={{
                            fontSize:"20px"
                        }}>New Chat</div>
                        <FaRegEdit size={25}/>
                    </Stack>
                    <button className='btn' style={{marginLeft:"10px", marginRight:"10px"}} onClick={() => {
                        setPastChats(true);
                    }}>Past Conversations</button>
                </Stack>
            </Grid>
            {pastChats ? 
            <Grid item xs={12} sm={10} className='chat-bkg'><PastConversations/></Grid>
             : 
            <Grid item xs={12} sm={10} className='chat-bkg'>
                {chats.length===0 && <div>
                <div style={{height:"50vh", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                    <div style={{fontSize:"32px", fontWeight:"500",marginBottom:"20px"}}>How Can I Help You Today?</div>
                    <div className='dp-bot'></div>
                </div>
                <Grid container spacing={2} px={2} py={6}>
                    <Grid item xs={12} sm={6}>
                        <Card searchForAnswer={searchForAnswer} question="what is the weather"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card searchForAnswer={searchForAnswer} question="what is my location"/>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Card searchForAnswer={searchForAnswer} question="what is the temperature"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card searchForAnswer={searchForAnswer} question="how are you"/>
                    </Grid>
                </Grid>
                </div>}
                {chats.length!==0 && <Stack ref={listRef} direction={'column'} spacing={2} mx={2}>
                    {chats.map((ch, idx) => <Chat chatObj={ch} chats={chats} setChats={setChats}/>)}
                </Stack>}
                <Stack spacing={2} direction={'row'} my={2} mx={2} justifyContent={'space-between'} sx={{
                    position:"sticky",
                    bottom:"0",
                    padding:"10px"
                }}>
                    <input style={{width:"100%"}} value={question} onChange={(e) => {
                        setQuestion(e.target.value);
                    }}/>
                    <button className='btn' onClick={() => {
                        searchForAnswer(question);
                        setQuestion("");
                    }}>Ask</button>
                    <button className='btn' onClick={() => {
                        let allChats = localStorage.getItem("AllChats");
                        if(allChats){
                            allChats = JSON.parse(allChats);
                            allChats.chats.push(chats)
                        }
                        else {
                            allChats = {chats: [chats]}
                        }
                        localStorage.setItem("AllChats", JSON.stringify(allChats));
                        setChats([]);
                    }}>Save</button>
                </Stack>
            </Grid>}
        </Grid>
    </div>
  )
}

export default Home
