[UNDER CONSTRUCTION]
# TemporalVersionControl
A project that demonstrate how to conduct version control under Temporal.

This project contains a workflow with the following activities:

- `wakeUp()`
- `takeShower()`
- `makeBreakfast()`
- `brushTeeth()`

The workflow runs every morning at 7:30 AM


The objective of the demonstration is ato release versions in which the behavior of the `makeBreakfast()` changes. Also, a version will be released in which the order of the activities changes thus altering the deterministic behavior of the workflow.

Finally, another version will be release in which an additional activity named `doDishes()` is added to the workflow.

# Running the demonstration code:

1. If the Temporal cluster is not running on the local machine, execute `sh ./setup-temporal-server.sh` to run the Temporal Server using Docker Compose.
2. Execute `npm install` to install the dependencies.
3. Execute `npm start` to start the Worker.
4. In another terminal window execute, `npm run workflow-from-client <CUSTOMER_NAME>` to run the Workflow using the Temporal.io Client.

**WHERE** `<CUSTOMER_NAME>` is an alphanumeric string that indicates the customer's name.


