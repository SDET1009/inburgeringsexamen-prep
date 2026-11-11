// Web Speech read-aloud (NL). Fallback-friendly: if unavailable, the button is hidden.
export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window
}

export function readAloud(text: string, lang = "nl-NL"): boolean {
  if (!speechSupported()) return false
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = 0.95
    const voices = window.speechSynthesis.getVoices()
    const nl = voices.find((v) => v.lang?.toLowerCase().startsWith("nl"))
    if (nl) u.voice = nl
    window.speechSynthesis.speak(u)
    return true
  } catch {
    return false
  }
}

export function stopSpeech() {
  if (speechSupported()) window.speechSynthesis.cancel()
}

// Some browsers need a voiceschange nudge
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices()
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices()
}
