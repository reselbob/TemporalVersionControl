import { Worker } from '@temporalio/worker';
import * as activities from './activities';

const customer: string = process.argv.slice(2)[0] || "Anonymous";
const taskQueue = customer + '-morning-routine'

async function run() {
    // First, register Workflows and Activities with the Worker that connects to
    // and interacts with the Temporal server.
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows'),
        activities,
        taskQueue: taskQueue,
    });

    // Next, start accepting tasks on the `morning-routine` queue
    await worker.run();
}

// Set up error handling behavior
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
