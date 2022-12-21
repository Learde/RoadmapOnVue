// General functions
export { default as makeRequest } from "./makeRequest.js";
export { setBaseUrl, setHeaders, addHeaders, setToken } from "./config.js";

// Endpoints
export * from "./endpoints/login.js";
export * from "./endpoints/registration.js";
export * from "./endpoints/addTopic.js";
export * from "./endpoints/getTopic.js";
export * from "./endpoints/editTopic.js";
export * from "./endpoints/deleteTopic.js";
