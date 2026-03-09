// Settings module for AI Summarizer popup
// You can expand this to manage more advanced settings logic.

import { saveSetting, getSetting } from "../utils/storage.js"

export async function loadSettings(){
  const autoSummarize = await getSetting("autoSummarize")
  return { autoSummarize: !!autoSummarize }
}

export function updateAutoSummarize(enabled){
  saveSetting("autoSummarize", enabled)
}
