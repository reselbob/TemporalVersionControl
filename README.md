[UNDER CONSTRUCTION]
# TemporalVersionControl
A project that demonstrate how to conduct version control under Temporal.

This project contains a workflow with the following activities:

- `wakeUp()`
- `takeShower()`
- `makeBreakfast()`
- `brushTeeth()`

The objective of the demonstration is a release version in which the behavior of the `makeBreakfast()` changes. Also, a version will be released in which the order of the activities changes thus altering the deterministic behavior of the workflow.

Finally, another version will be release in which an additional activity named `doDishes()` is added to the workflow.

# Running the demonstration code:

1. Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/server/quick-install/)).
2. Execute `npm install` to install the dependencies.
3. Execute `npm start` to start the Worker.
4. In another terminal window execute, `sh ./run-workflow.sh` to run the Workflow using the Temporal.io Client.

[MORE TO COME]
