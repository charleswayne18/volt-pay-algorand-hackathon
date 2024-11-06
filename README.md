# Voltpay Frontend

Voltpay is a decentralized application built on the Algorand blockchain that enables users to purchase airtime, buy data, and pay bills seamlessly using Algos.

## Technical Overview

Voltpay operates on three primary layers:
1. *Frontend Layer* - This repository contains the code for the Next.js frontend.
2. *Smart Contract Layer* - Built using TealScript, the smart contracts are compiled and stored in the src/contracts folder of this repository. For more details, check the [Voltpay Smart Contract repository](https://github.com/charleswayne18/volt-pay-smart-contract).
3. *Backend Layer* - This layer, developed with NestJS, interacts with the blockchain to process transactions and integrates third-party APIs. The backend code is hosted at the [Voltpay Backend repository](https://github.com/EagleCharles/volt-pay-backend).

## Getting Started

To set up and run the frontend application, follow these steps:

### Prerequisites

- *Node.js* (version 18+)
- An *Algorand wallet* (Pera Wallet recommended)
- Testnet Algos, which can be obtained from the [Algorand Testnet Dispenser](https://bank.testnet.algorand.network/)

### Running the Backend Server

First, clone and run the backend server, which is essential for the frontend to function properly. Follow the setup instructions provided in the [Voltpay Backend repository](https://github.com/EagleCharles/volt-pay-backend).

### Setting Up the Frontend Server

1. *Clone the Repository*  
   bash
   git clone https://github.com/charleswayne18/volt-pay-algorand-hackathon
   cd volt-pay-algorand-hackathon
   

2. *Install Dependencies*  
   bash
   npm install
   

3. *Configure Environment Variables*  
   Create a .env.local file in the project root and set up necessary environment variables, including API endpoints and Algorand wallet configurations. Use the provided .env.example file as a reference.

4. *Start the Development Server*  
   bash
   npm run dev
   

   The app should now be running locally at http://localhost:3000.

### Testing the Application

1. *Ensure Testnet Algos* are available in your wallet.
2. *Connect your wallet* (Pera Wallet recommended) and select the Testnet network.
3. *Interact with the app* by attempting test transactions to buy airtime, purchase data, or pay bills.

## Additional Resources

For more details on the smart contracts or backend APIs, refer to the respective repositories:
- [Smart Contract Repository](https://github.com/charleswayne18/volt-pay-smart-contract)
- [Backend Repository](https://github.com/EagleCharles/volt-pay-backend)

--- 

With these steps, Voltpay’s frontend should be up and running, enabling you to explore its features and simulate Algorand transactions in a test environment.
