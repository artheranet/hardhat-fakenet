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
            "0x4203c438d4e94bf4a595794b5f5c2882f959face730abb7a7b8acb462c8e138d",
            "0x36c62e8094847f3e7aadc5c940cdbb8943d333a59b2774b889fd4a5ef629b51a",
            "0x9187fdd9c00ab8e6c9e33480a51e86b7aa46cdb3255aaaf18b8ad3e281a17333",
            "0xa466a5e9cc896f41b7b0b890ba630018de426e9ae63da62cdbd2379274a617e1",
            "0x5f67cc02a811744ab738ff5e292d966a3c86fc448f680f1020fda2cd4efed431",
            "0x594a4d9c0fa4aca3fd0d48045e28c7dc5e421a67a5f79df58379498f2442fd0e",
            "0x6daff5042939e44e6928f3e80443b221f7ccbed1263d15613003b8b7a1199778",
            "0xa86000de9b6819977be7395e4b1d0d84dd5f321ac0164d4c9c4e478e934c1489",
            "0xbaa7872d34f851f1ab7c37161cbadb9ef670ca088d126e1ff2ba7cb135ddf7a6",
            "0x967aeec6c484f91a1721bb8662da81c85e6891a70528a7134668e89e89796cd0"
        ]
    }
}
```

Replace `<PATH_TO_ARTHERA_NODE_BINARY>` with the path to your Arthera node binary.

The `accounts` section contains private keys for 11 accounts as follows:
- `accounts[0]` is a validator account that owns system contracts, has a balance of 1,000,000,000 AA and a stake delegation to himself of 5,000,000 AA
- `accounts[1-10]` are normal accounts with a balance of 1,000,000,000 AA

Run Hardhat with the Arthera network:

```shell
npx hardhat --network arthera ...
```
