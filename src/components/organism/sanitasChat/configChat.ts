import { HubConnectionBuilder } from "@microsoft/signalr";

/** Here change for URL for you Localahost URL with port => Project Backend .NET */
const apiBaseURL="https://mychatqa.mysanitas.com"; // => QA
//const apiBaseURL="https://mychat.mysanitas.com"; //=> PROD
//const apiBaseURL = 'http://localhost:4375'; // => Localhost 

const connection = new HubConnectionBuilder().withUrl(`${apiBaseURL}/chat`).withAutomaticReconnect().build();

export default {apiBaseURL,connection};