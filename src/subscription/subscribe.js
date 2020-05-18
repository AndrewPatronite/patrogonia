export const subscribe = (subscription, onMessage) => {
    const webSocket = new WebSocket(subscription);
    webSocket.onmessage = (message) => {
        if (message && message.data) {
            onMessage(JSON.parse(message.data));
        }
    };
    webSocket.onclose = (details) => {
        console.log(
            `Subscription ${subscription} closed: ${JSON.stringify(details)}`
        );
    };
    webSocket.onerror = (error) => {
        console.log(
            `Subscription ${subscription} error: ${JSON.stringify(error)}`
        );
    };
    return webSocket;
};
