import { HubConnectionBuilder } from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";

/** Here change for URL for you Localahost URL with port => Project Backend .NET */
//const apiBaseURL = "https://mychatqa.mysanitas.com"; // => QA
//const apiBaseURL="https://mychat.mysanitas.com"; //=> PROD
const apiBaseURL = "https://localhost:44381"; // => Localhost

const connection = new HubConnectionBuilder()
  .withUrl(`${apiBaseURL}/chat`)
  .withAutomaticReconnect()
  .withHubProtocol(new MessagePackHubProtocol())
  .build();

export default { apiBaseURL, connection };
