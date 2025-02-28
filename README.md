# Generic Event Handlers Code References and Tests
1. Dynamically load and import event modules
2. Handle both when event modules' `execute()` method is synchronous or asynchronous.
3. Bind to `.once` EventEmitter method when event modules' `isOnce` property is true.
4. Emit events as tests.

## Prerequisites
- [Node.js](https://nodejs.org/en) (Recommended: LTS version)

### Code references available:
1. Modules with Default exports
    - Sequential importing and binding of events
    - Parallel importing and binding of events
2. Modules with Named exports
    - Sequential importing and binding of events
    - Parallel importing and binding of events
