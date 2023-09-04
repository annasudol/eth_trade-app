export const siteTitle = "ETH Svelte Web3 App";
export const siteDescription = "Ethereum Simple App Svelte";
export const siteURL = "example.com";
export const siteLink =
  "https://github.com/annasudol/liquidity_pool_staking_svelte";

export const navItems = [
  {
    title: "Account",
    route: "/",
  },
  {
    title: "Trade",
    route: "/trade",
  },
];


export const networks = {
  5: {
    name: 'Goerli',
    etherscan: 'https://goerli.etherscan.io'
  },
    80001: {
    name: 'Polygonscan',
    etherscan: 'https://mumbai.polygonscan.com'
  },
    1: {
    name: 'Mainnet',
    etherscan: 'https://etherscan.io/'
  },
}