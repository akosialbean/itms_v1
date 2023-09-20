import React from 'react';

const IpAddress = () => {
  // Initialize an array to store IP addresses
  const ipAddresses = [];

  // Define the 'status' variable outside the loop
  const status = 'inactive';

  // Loop to generate IP addresses
  for (let ip = 0; ip <= 255; ip++) {
    let result = `10.10.20.${ip}`;
    ipAddresses.push({ ip: result, status }); // Add each IP address to the array with 'status'
  }

  // Convert the array to a JSON string
  const jsonResult = JSON.stringify(ipAddresses, null, 2); // Pretty-print JSON with 2-space indentation

  return (
    <pre>
      {/* Render the JSON result */}
      {jsonResult}
    </pre>
  );
};

export default IpAddress;
