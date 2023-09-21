import asyncHandler from 'express-async-handler'
import IpAddress from '../models/ipModel.js'
// import { ping } from 'ping' 

const getAllIp = asyncHandler(async (req, res) => {
  const ips = await IpAddress.find(); // Use await to wait for the query to complete
  res.header('Access-Control-Allow-Origin', '*')
  res.status(200).json(ips); // Send the response inside the async function
});

const getInactiveIp = asyncHandler(async (req, res) => {
    const ips = await IpAddress.find({status: "inactive"}); // Use await to wait for the query to complete
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json(ips); // Send the response inside the async function
});

// const pingDevice = (req, res) => {
//     // Define an array of hostnames or IP addresses to ping
//     const hosts = ['10.10.10.78'];

//     // Options for the ping requests
//     const options = {
//     timeout: 10, // Timeout in seconds (adjust as needed)
//     };

//     // Perform ping requests for each host
//     hosts.forEach((host) => {
//         ping.promise.probe(host, options)
//         .then((result) => {
//         console.log(`${host} is ${result.alive ? 'alive' : 'dead'}`);
//         })
//         .catch((error) => {
//         console.log(`Error pinging ${host}: ${error}`);
//         });
//     });
// }

export { getAllIp, getInactiveIp };
