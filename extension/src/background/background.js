chrome.runtime.onInstalled.addListener(() => {

chrome.contextMenus.create({
id: "summarizeText",
title: "Summarize with AI",
contexts: ["selection"]
})

})

chrome.contextMenus.onClicked.addListener((info, tab) => {

if(info.menuItemId === "summarizeText"){

chrome.storage.local.set({
selectedText: info.selectionText
})

}

})
