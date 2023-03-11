import { Connection, WorkflowClient } from '@temporalio/client';
import { simpleWorkflow } from './workflows';
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
    //console.log(`workflowId: ${workflowId}`);

    const wakeUpTime: string = getWakeupTime();

    const handle = await client.start(simpleWorkflow, {
        taskQueue: 'morning-routine',
        cronSchedule: '* * * * *',
        workflowId: workflowId,
        args: [wakeUpTime],
    });
    console.log(`Started workflow ${handle.workflowId}`);

    //console.log(await handle.result());
}

function getWakeupTime(): string{
    const dataFileSpec = path.join(__dirname, '../data', 'data.json')
    const data = fs.readFileSync(dataFileSpec,
        {encoding:'utf8', flag:'r'});
    const json = JSON.parse(data);
    return json.wakeupTime;
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
