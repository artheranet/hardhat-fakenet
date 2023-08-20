import { TASK_RUN, TASK_TEST } from "hardhat/builtin-tasks/task-names";
import { extendConfig, task } from "hardhat/config";

import {
    HardhatRuntimeEnvironment,
    RunSuperFunction,
    TaskArguments,
} from "hardhat/types";

import { ArtheraService } from "./arthera-service";

task(TASK_TEST, async (_args, env, runSuper) => {
    return handlePluginTask(env, runSuper);
});

task(TASK_RUN, async (_args, env, runSuper) => {
    return handlePluginTask(env, runSuper);
});

extendConfig((resolvedConfig: any, config: any) => {
    const defaultOptions = ArtheraService.getDefaultOptions();
    if (config.networks && config.networks.arthera) {
        const customOptions = config.networks.arthera;
        resolvedConfig.networks.arthera = { ...defaultOptions, ...customOptions };
    } else {
        resolvedConfig.networks.arthera = defaultOptions;
    }
});

async function handlePluginTask(
    env: HardhatRuntimeEnvironment,
    runSuper: RunSuperFunction<TaskArguments>
) {
    if (env.network.name !== "arthera") {
        return runSuper();
    }
    const options = env.network.config;
    const artheraService = await ArtheraService.create(options);
    await artheraService.startServer();
    const ret = await runSuper();
    await artheraService.stopServer();
    return ret;
}
