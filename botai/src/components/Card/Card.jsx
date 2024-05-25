import React from 'react'

function Card({searchForAnswer, question}) {
  return (
    <div style={{
        backgroundColor:"white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "10px",
        borderRadius:"10px",
        width:"90%"
    }} onClick={() => {
        searchForAnswer(question);
    }}>
      <div style={{fontWeight:"700", fontSize:"20px",marginBottom:"20px"}}>{`Hi, ${question}`}</div>
      <div style={{color:"rgba(0, 0, 0, 0.5)"}}>Get immediate AI generated response</div>
    </div>
  )
}

export default Card
