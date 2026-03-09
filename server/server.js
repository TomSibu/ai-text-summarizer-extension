import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fetch from "node-fetch"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/summarize", async (req, res) => {

const text = req.body.text

try {

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:"Summarize this text:\n" + text
}
]
}
]
})
}
)

const data = await response.json()

console.log("API Response:", data)

res.json({
summary: data.candidates[0].content.parts[0].text
})

}

catch(error){
res.status(500).json({error:"Summarization failed"})
}

})

app.listen(3000, ()=>{
console.log("Server running on port 3000")
})