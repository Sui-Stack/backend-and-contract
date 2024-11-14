import { PriceServiceConnection } from "@pythnetwork/price-service-client";

export const getPrice = () => {
    const priceIds = [
        "0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744", // ETH/USD price id
      ];

    const connection = new PriceServiceConnection("https://hermes.pyth.network");
    
    
    
    
    connection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
      // priceFeed here is the same as returned by getLatestPriceFeeds above.
      console.log(connection.getLatestPriceFeeds(priceIds).then((priceFeeds) => {

        console.log(priceFeeds);

        }));
    });
     
    // When using the subscription, make sure to close the WebSocket upon termination to finish the process gracefully.
    setTimeout(() => {
      connection.closeWebSocket();
    }, 60000);
}