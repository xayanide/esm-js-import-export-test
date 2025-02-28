import * as nodeFsPromises from "node:fs/promises";
import * as nodePath from "node:path";
import * as nodeUrl from "node:url";
import * as nodePerfHooks from "node:perf_hooks";
import nodeProcess from "node:process";

const AsyncFunctionConstructor = (async () => {}).constructor;
const nodePerformanceHook = nodePerfHooks.performance;
const eventsDir = nodePath.join(nodePath.dirname(nodeUrl.fileURLToPath(import.meta.url)), "defaultProcessEvents");

function isAsyncFunction(fn) {
    return fn instanceof AsyncFunctionConstructor;
}

function bindEventListener(importedModule) {
    const eventName = importedModule.name;
    const eventExecute = importedModule.execute;
    let callback;
    if (isAsyncFunction(eventExecute)) {
        console.log(`[${eventName}] ASYNC eventModule.execute()`);
        callback = async function (...args) {
            return await eventExecute(...args);
        };
    } else {
        console.log(`[${eventName}] SYNC eventModule.execute()`);
        callback = function (...args) {
            return eventExecute(...args);
        };
    }
    if (importedModule.isOnce) {
        nodeProcess.once(eventName, callback);
    } else {
        nodeProcess.on(eventName, callback);
    }
}

async function loadEventHandlers(testName) {
    console.log(`TEST NAME: ${testName}`);
    try {
        console.log("loadEventHandlers(): START");
        const eventFiles = await nodeFsPromises.readdir(eventsDir);
        const s1 = nodePerformanceHook.now();
        /**
        Using function declaration as the callback for map() is fine if we're functional. However if we are dealing with classes,
        one must use arrow functions because using function declarations can change the context of 'this' of a class, which is not what we want,
        causing things to break involving things using 'this' inside the class
        */
        const promisesArray = eventFiles.map(async function (file) {
            if (!file.endsWith(".js")) {
                return;
            }
            const filePath = nodeUrl.pathToFileURL(nodePath.join(eventsDir, file)).href;
            const { default: defaultImport } = await import(filePath);
            bindEventListener(defaultImport);
        });
        console.log(`loadEventHandlers(): FINISH. Map -> Import -> BindEventListener. Time elapsed: ${nodePerformanceHook.now() - s1}`);
        const s2 = nodePerformanceHook.now();
        await Promise.all(promisesArray);
        console.log(`loadEventHandlers(): FINISH. ResolvePromises. Time elapsed: ${nodePerfHooks.performance.now() - s2}`);
    } catch (err) {
        console.error(`loadEventHandlers(): Encountered error while loading event handlers:${err.message}\n${err.stack}`);
    }
}

await loadEventHandlers("DefaultParallel");

nodeProcess.emit("uncaughtException", new Error("TestException1"));
nodeProcess.emit("uncaughtException", new Error("TestException2"));
nodeProcess.emit("uncaughtException", new Error("TestException3"));
nodeProcess.emit("unhandledRejection", new Error("TestRejection1"));
nodeProcess.emit("unhandledRejection", new Error("TestRejection2"));
nodeProcess.emit("unhandledRejection", new Error("TestRejection3"));
