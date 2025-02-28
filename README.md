# Generic Event Handlers Code References and Tests
1. Dynamically load and import event handler modules.
2. Handle both when the event handler modules' `execute()` method is synchronous or asynchronous.
3. Bind to `.once` EventEmitter method when the event handler modules' `isOnce` property is true.
4. Emit events as tests to invoke the event handlers' callbacks, specifically their `execute()` method synchronously or asynchronously (properly awaited inside the callback wrapper).

## Prerequisites
- [Node.js](https://nodejs.org/en) (Recommended: LTS version)

### Code references available:
1. Event handler modules with `Default exports`: `defaultProcessEvents`
    - Sequential imports and event listener binds: `defaultSequential.js`
    - Parallel imports and event listener binds: `defaultParallel.js`
2. Event handler modules with `Named exports`: `namedProcessEvents`
    - Sequential imports and event listener binds: `namedSequential.js`
    - Parallel imports and event listener binds: `namedParallel.js`
