export function saveSetting(key, value){
chrome.storage.local.set({[key]: value})
}

export function getSetting(key){
return new Promise(resolve => {
chrome.storage.local.get([key], result => {
resolve(result[key])
})
})
}
