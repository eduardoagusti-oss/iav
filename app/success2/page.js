import SuccessClient from "./SuccessClient"

export const dynamic = "force-dynamic"

export default function Page() {
  return <SuccessClient />
}
const urlParams = new URLSearchParams(window.location.search)
const sessionId = urlParams.get("session_id")

console.log("SESSION ID:", sessionId)
alert(sessionId)