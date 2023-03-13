import { Connection, WorkflowClient } from '@temporalio/client';
import { morningRoutineWorkflow } from './workflows';
import { nanoid } from 'nanoid';;

async function run() {
    const customer: string = process.argv.slice(2)[0] || "Anonymous";

    //Connect to localhost with default ConnectionOptions.
    const connection = await Connection.connect({});

    const client = new WorkflowClient({
        connection,
    });

    const workflowId = customer + '-workflow-' + nanoid();
    const taskQueue = customer + '-morning-routine'

    const wakeUpTime = "7:30 AM"

    const handle = await client.start(morningRoutineWorkflow, {
        taskQueue: taskQueue,
        cronSchedule: '30 7 * * *',
        workflowId: workflowId,
        args: [customer, wakeUpTime],
    });
    console.log(`Started workflow ${handle.workflowId}`);

}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
