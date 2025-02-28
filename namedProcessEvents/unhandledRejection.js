export const eventModule = {
    name: "unhandledRejection",
    isOnce: false,
    execute: function (err) {
        console.error(`unhandledRejection!: ${err.message}\n${err.stack}`);
    },
};
