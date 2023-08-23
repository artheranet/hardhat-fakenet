import "../../../src/index";

export default {
    defaultNetwork: "arthera",
    artheraNode: {
        executable: '/home/flavius/workblk/arthera-node/build/arthera-node',
        port: 18545
    },
    solidity: "0.8.17",
    networks: {
        arthera: {
            url: "http://127.0.0.1:18545"
        },
    },
};
