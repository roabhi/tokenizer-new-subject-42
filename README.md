# Tokenizer 42 - Build your own token

## Demo

[Application deployed on Vercel ↗](https://tokenizer-new-subject-42.vercel.app/)

## Introductrion

Welcome to the exciting world of blockchain technology!
Have you ever dreamed of creating your own digital token?
Now is your chance to make that dream a reality.
Blockchain technology allows for the creation and distribution of unique digital assets,
known as tokens. These tokens can represent a wide range of things, from a simple representation of currency to more complex assets like artwork or even a real-world asset.
The process of creating your own token is not without its challenges, but with the right
knowledge and resources, it can be a rewarding and fulfilling experience.
So why wait?
Start your journey towards creating your very own token on the blockchain today!

## Objectives

As a participant in this project, you will have the opportunity to contribute to the creation of a digital asset on the blockchain. This project is designed to challenge you in
several areas, including your ability to master multiple programming languages and your
familiarity with public blockchain technology.
While a strong background in cryptography is not required for this project, you should
be prepared to learn and adapt as you work towards creating your own digital asset. This
project will require you to think critically and creatively, as well as to push yourself out
of your comfort zone as you navigate the complexities of blockchain technology.
Ultimately, your participation in this project will not only help you develop valuable
skills and knowledge, but it will also allow you to be a part of something truly innovative
and exciting. Are you ready to take on the challenge?
Let’s get started!

## Project

This is a front end applicaton that allows you to claim rewards under the form of an ERC20 token called 42ALT. In order to claim the token, you need to have a wallet connected to the application. The wallet needs to be connected to the Polygon Amoy network since the project is still in development. The application is intended only for 42 students and provided as a way to incentivize students to complete rings from the Common Core. The tokenomics of the 42ALT token is still under development and will be updated in the future.

## How to use the application

1. Get you API key on 42 intra by creating a new application
2. Get your Rainbow kit API key
3. Get you own RPC key either from Alchemy, Infura or any other RPC provider
4. Set up your .env file with the API key
5. Clone the repository
6. Run `npm install`
7. Run `npm run dev`
8. Connect your wallet to the application
9. Claim your tokens

Your .env file should look like this:

```
#From 42 Intra --> TokenizerService Project
FORTY_TWO_CLIENT_ID=YOUR_API_KEY
FORTY_TWO_CLIENT_SECRET=YOUR_SECRET
# Geberated with --> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NEXTAUTH_SECRET=YOUR_SECRET

# Base URL
NEXTAUTH_URL=YOUR_BASE_URL
# Redirect URI (this is the URI where users will be redirected after authentication)
# Format the URI appropriately. Note that you should not include any query parameters here.
REDIRECT_URI=/api/auth/callback/42-school

NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS

NEXT_PUBLIC_ALCHEMY_KEY=YOUR_ALCHEMY_KEY

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = YOUR_WALLETCONNECT_PROJECT_ID


```
