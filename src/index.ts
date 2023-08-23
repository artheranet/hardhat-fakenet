import { TASK_RUN, TASK_TEST } from "hardhat/builtin-tasks/task-names";
import { extendConfig, task } from "hardhat/config";

import {
    HardhatRuntimeEnvironment,
    RunSuperFunction,
    TaskArguments,
} from "hardhat/types";

import "./type-extensions";
import { ArtheraService } from "./arthera-service";
import {ArtheraNodeConfig} from "./types";

function getDefaultOptions(hre: HardhatRuntimeEnvironment): ArtheraNodeConfig {
    const defaultExecutable = "arthera-node";
    const defaultPort = 18545;

    return {
        executable: defaultExecutable,
        port: defaultPort,
    }
}

/**
 * Merges arthera defaults with user's arthera config
 * @param  {HardhatRuntimeEnvironment} hre
 * @return {any}
 */
function getOptions(hre: HardhatRuntimeEnvironment): any {
    return { ...getDefaultOptions(hre), ...(hre.config as any).artheraNode };
}

task(TASK_TEST, async (_args, hre, runSuper) => {
    return handlePluginTask(hre, runSuper);
});

task(TASK_RUN, async (_args, hre, runSuper) => {
    return handlePluginTask(hre, runSuper);
});

async function handlePluginTask(
    hre: HardhatRuntimeEnvironment,
    runSuper: RunSuperFunction<TaskArguments>
) {
    if (hre.network.name !== "arthera") {
        return runSuper();
    }
    const options = getOptions(hre);
    const artheraService = await ArtheraService.create(options);
    await artheraService.startServer();
    const ret = await runSuper();
    await artheraService.stopServer();
    return ret;
}
