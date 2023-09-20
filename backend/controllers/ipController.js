import asyncHandler from 'express-async-handler';
import IpAddress from '../models/ipModel.js'

const getAllIp = asyncHandler(async (req, res) => {
  const ips = await IpAddress.find(); // Use await to wait for the query to complete
  res.header('Access-Control-Allow-Origin', '*')
  res.status(200).json(ips); // Send the response inside the async function
});

export { getAllIp };
