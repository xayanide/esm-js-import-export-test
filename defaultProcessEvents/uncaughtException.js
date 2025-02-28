export default {
    name: "uncaughtException",
    isOnce: true,
    execute: function (err) {
        console.error(`uncaughtException!: ${err.message}\n${err.stack}`);
    },
};
