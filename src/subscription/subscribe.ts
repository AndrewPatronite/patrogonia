export const subscribe = (
  subscription: string,
  onMessage: (message: any) => void
) => {
  const webSocket = new WebSocket(subscription)
  webSocket.onmessage = (message) => {
    if (message && message.data) {
      onMessage(JSON.parse(message.data))
    }
  }
  webSocket.onclose = (details) => {
    console.debug(
      `Subscription ${subscription} closed: ${JSON.stringify(details)}`
    )
  }
  webSocket.onerror = (error) => {
    console.error(
      `Subscription ${subscription} error: ${JSON.stringify(error)}`
    )
  }
  return webSocket
}
