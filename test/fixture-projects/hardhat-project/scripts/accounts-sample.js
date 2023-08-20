const hre = require("hardhat");

async function main() {
    const accounts = await hre.network.provider.send("eth_accounts");
    if (!accounts) {
        throw new Error("Accounts not detected");
    }

    console.log("Accounts:", accounts);

    if (accounts.length !== 1) {
        throw new Error("Invalid Accounts amount");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
