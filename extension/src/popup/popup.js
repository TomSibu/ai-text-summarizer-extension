import { saveSetting, getSetting } from "../utils/storage.js"
import { BACKEND_URL } from "../utils/config.js"

document.addEventListener("DOMContentLoaded", () => {

const button = document.getElementById("summarizeBtn")
const input = document.getElementById("inputText")
const output = document.getElementById("output")
const toggle = document.getElementById("autoToggle")
const settingsBtn = document.getElementById("settingsBtn")
const settingsPanel = document.getElementById("settingsPanel")
const backBtn = document.getElementById("backBtn")

backBtn.addEventListener("click", () => {

settingsPanel.classList.remove("open")

document.querySelector(".mainContent").classList.remove("blurred")

})


settingsBtn.addEventListener("click", () => {

settingsPanel.classList.toggle("open")

document.querySelector(".mainContent").classList.toggle("blurred")

})


async function summarizeText(){

const text = input.value

if(!text){
output.innerText = "Please enter text."
return
}

button.disabled = true
button.innerText = "Generating..."

output.innerText = "Generating summary..."

try{

const response = await fetch(BACKEND_URL + "/summarize",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({text})

})

const data = await response.json()

output.innerText = data.summary

}catch(error){

output.innerText = "Failed to generate summary."

}

button.disabled = false
button.innerText = "Generate Summary"

}


button.addEventListener("click", summarizeText)


toggle.addEventListener("change", () => {

saveSetting("autoSummarize", toggle.checked)

})


async function initializeFromStorage(){

const [selectedText, autoSummarize] = await Promise.all([
getSetting("selectedText"),
getSetting("autoSummarize")
])

if(autoSummarize){
toggle.checked = !!autoSummarize
}

if(selectedText){

input.value = selectedText

chrome.storage.local.remove("selectedText")

if(autoSummarize){
summarizeText()
}

}

}

initializeFromStorage()

})
