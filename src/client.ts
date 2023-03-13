import { Connection, WorkflowClient } from '@temporalio/client';
import { morningRoutineWorkflow } from './workflows';
import { nanoid } from 'nanoid';;
import path from "path";
import fs from "fs";
// dotenv looks for the existence of a .env file that has env var settings.
// if no .env file exists, dotenv look for the environment variables in memory
require('dotenv').config({ path: path.join(__dirname, '../', '.env') })

async function run() {
    //Connect to localhost with default ConnectionOptions.
    const connection = await Connection.connect({});

    const client = new WorkflowClient({
        connection,
    });

    const workflowId = 'workflow-' + nanoid();

    const wakeUpTime = "7:30 AM"

    const handle = await client.start(morningRoutineWorkflow, {
        taskQueue: 'morning-routine',
        cronSchedule: '30 7 * * *',
        workflowId: workflowId,
        args: [wakeUpTime],
    });
    console.log(`Started workflow ${handle.workflowId}`);

}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
