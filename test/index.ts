import { assert } from "chai";
import { useEnvironment } from "./helpers";

describe("Arthera plugin", function () {
    useEnvironment("hardhat-project", "arthera");

    it("Should add Arthera network to hardhat's config", async function () {
        assert.isDefined(this.env.config.networks.arthera);
    });

    it("Should run Hardhat RUN task 'delayed-sample.js' using Arthera", async function () {
        await this.env.run("run", {
            noCompile: true,
            script: "scripts/accounts-sample.js",
        });

        assert.equal(process.exitCode, 0);
    }).timeout(10000);
});

