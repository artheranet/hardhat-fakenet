import "hardhat/types/config";
import {ArtheraNodeConfig} from "./types";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    arthera?: Partial<ArtheraNodeConfig>;
  }
}
