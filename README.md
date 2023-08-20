# @artherachain/hardhat-fakenet
Hardhat plugin to run hardhat against an Arthera fakenet node

```shell
npm install --save-dev @artherachain/hardhat-fakenet
```

Edit your `hardhat.config.js` file and add the following network:

```javascript
networks: {
    arthera: {
        url: 'http://localhost:18545', 
        executable: '<PATH_TO_ARTHERA_NODE_BINARY>',
        accounts: [
            "0x163f5f0f9a621d72fedd85ffca3d08d131ab4e812181e0d30ffd1c885d20aac7",
        ]
    }
}
```

Replace `<PATH_TO_ARTHERA_NODE_BINARY>` with the path to your Arthera node binary.

Run Hardhat with the Arthera network:

```shell
npx hardhat --network arthera ...
```
