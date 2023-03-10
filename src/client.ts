import { Connection, WorkflowClient } from '@temporalio/client';
import { simpleWorkflow } from './workflows';
import { nanoid } from 'nanoid';
import path from "path";
// dotenv looks for the existence of a .env file that has env var settings.
// if no .env file exists, dotenv look for the environment variables in memory
require('dotenv').config({ path: path.join(__dirname, '../', '.env') })

async function run() {
    //Connect to localhost with default ConnectionOptions.
    const connection = await Connection.connect({});

    const client = new WorkflowClient({
        connection,
    });

    const handle = await client.start(simpleWorkflow, {
        taskQueue: 'morning-routine',
        // create a workflowId to make the workflow identifiable within the Temporal
        // server
        workflowId: 'workflow-' + nanoid(),
    });
    console.log(`Started workflow ${handle.workflowId}`);

    console.log(await handle.result());
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
