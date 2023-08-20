import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import * as os from "os";
import path from "path";
import * as fs from "fs";

export class ArtheraService {
    private _options: any;
    private node: ChildProcessWithoutNullStreams | null = null;
    private tmpDir: string | null = null

    public static getDefaultOptions(): any {
        return {
            executable: "arthera-node",
            port: 18545
        }
    }

    public static async create(options: any): Promise<ArtheraService> {
        return new ArtheraService(options);
    }

    private constructor(options: any) {
        this._options = options;
    }

    public async startServer() {
        this.tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "arthera-fakenet-"));

        await new Promise<void>((resolve, reject) => {
            this.node = spawn(
                this._options.executable, [
                    '--fakenet', '1/1',
                    '--datadir', this.tmpDir!,
                    '--verbosity', '3',
                    '--tracenode',
                    '--http', '--http.addr', '127.0.0.1', '--http.port', this._options.port,
                    '--http.vhosts', '*',
                    '--http.corsdomain', '*',
                    '--http.api', 'eth,web3,net,txpool,art,abft,debug'
                ]
            );
            this.node.stderr.on('data', (data) => {
                const log: string = data.toString();
                if (log.includes('HTTP server started')) {
                    resolve();
                }
            });
        });
    }

    public async stopServer() {
        console.log("Stopping Arthera");
        this.node?.kill('SIGKILL');
        if (this.tmpDir) {
            fs.rmSync(this.tmpDir, {recursive: true});
        }
    }
}
