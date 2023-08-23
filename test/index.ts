import { assert } from "chai";
import { useEnvironment } from "./helpers";

describe("Arthera plugin", function () {
    useEnvironment("hardhat-project", "arthera");

    it("Should run Hardhat RUN task 'accounts-sample.js' using Arthera", async function () {
        await this.env.run("run", {
            noCompile: true,
            script: "scripts/accounts-sample.js",
        });

        assert.equal(process.exitCode, 0);
    }).timeout(10000);
});

