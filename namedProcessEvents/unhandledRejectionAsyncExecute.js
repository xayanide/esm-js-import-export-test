export const eventModule = {
    name: "unhandledRejection",
    isOnce: false,
    execute: async function (err) {
        console.error(`unhandledRejectionAsync!: ${err.message}\n${err.stack}`);
        const myPromise = new Promise((resolve) => {
            setTimeout(function () {
                console.log("Resolved");
                resolve();
            }, 1000);
        });
        console.log("Resolving promise...");
        await myPromise;
    },
};
