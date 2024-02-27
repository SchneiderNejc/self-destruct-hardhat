
# Self-destruct
A sample project serving as a compilation/deployment/testing hardhat framework, including settings, networks, api keys, tasks and scripts.

#### Deployed contract addresses
| Network | gldToken | destruct |
| ------ | ----------- | ------ |
| Sepolia | 0x6FE1eCB671a08Ae61E3cD7590bbc6270eC870FBf | 0xA9E810025b3FE6CEe7b56c5876Cd8864E0968751 |
| BscTestnet | 0xaD3B665a4542500B9B39E13fde91d113470eAc41 | 0x1B39Cb5D66aBfd33616371312290D9AF93947B51 |
| OptimismSepolia | 0x56ae34F87eA05752C0A071CF0bc15EC68625d6d1 | 0x3A7C162b399E8719071B0A7a0595421D83b30aB6 |
| PolygonSepolia | 0x56ae34F87eA05752C0A071CF0bc15EC68625d6d1 | 0x3A7C162b399E8719071B0A7a0595421D83b30aB6 |
| PolygonZkevmTestnet | 0x56ae34F87eA05752C0A071CF0bc15EC68625d6d1 | 0x3A7C162b399E8719071B0A7a0595421D83b30aB6 |
| CeloTestnet | 0x56ae34F87eA05752C0A071CF0bc15EC68625d6d1 | 0x3A7C162b399E8719071B0A7a0595421D83b30aB6 |
| ArbitrumSepolia  | 0x56ae34F87eA05752C0A071CF0bc15EC68625d6d1 | 0x3A7C162b399E8719071B0A7a0595421D83b30aB6 |
| AvalancheTestnet  | 0x56ae34F87eA05752C0A071CF0bc15EC68625d6d1 | 0x3A7C162b399E8719071B0A7a0595421D83b30aB6 |
---
## Hardhat commands
| Command| Description | 
| ------ | ----------- | 
| npx hardhat | version/help | 
| npx hardhat compile | compile all | 
| npx hardhat init | init new project | 
| npx hardhat test | run all test scripts | 
| hardhat test test/my-tests.ts | run single script | 
| npx hardhat run scripts/deploy.js [--network localhost] | deploy contracts in: scripts/ | 
| npx hardhat node | start local node at http://127.0.0.1:8545 | 
| npx hardhat coverage | print full tests coverage | 
| npx hardhat verify --network sepolia 0x56ae34F87eA05752C0A071CF0bc15EC68625d6d1 --contract contracts/GLDToken.sol:GLDToken 1000000 | verify contract| 
| npx hardhat flatten contracts/GLDToken.sol | for manual contract verification | 
| npx hardhat accounts | run task accounts. Task is added to npx hardhat help | 
| npx hardhat console [--no-compile] | open NodeJS JavaScript console with builtin config and ether objects | 

### Configuration variables
| Command| Description | 
| ------ | ----------- | 
| npm install --global hardhat-shorthand | install binary to simplyfy input. Use hh compile instead of npx hardhat compile | 
| hardhat-completion install | requirement for hardhat-shorthand | 
| npx hardhat vars path | find location of configuration variables on the HDD | 
| npx hardhat vars set TEST_API_KEY | set variable, create it if it doesn't exist| 
| npx hardhat vars get TEST_API_KEY | prints the preset variable | 
| npx hardhat vars list | prints all config variables stored locally | 
| npx hardhat vars delete TEST_API_KEY | remove config variable | 
| npx hardhat vars setup | list all variables used by project, useful to identify what's needed | 