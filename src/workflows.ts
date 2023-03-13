import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';


const maximumAttempts = 10; //The number of times to retry

// Get the activities function in order to make them to the workflow.
const {wakeUp, takeShower, makeBreakfast, brushTeeth} = wf.proxyActivities<typeof activities>({
    //More info about startToCloseTimeout is here: https://docs.temporal.io/concepts/what-is-a-start-to-close-timeout/
    startToCloseTimeout: '4 seconds',
    retry: {
        backoffCoefficient: 1,
        maximumAttempts,
    }
});


//const wakeUpTime = '7:30 AM';

export async function morningRoutineWorkflow(customer :string, wakeUpTime: string): Promise<void> {
    const startTime = new Date(Date.now()).toString();
    const wu = await wakeUp(customer, wakeUpTime);

    const sh = await takeShower(customer);

    const bk = await makeBreakfast(customer);

    const bt = await brushTeeth(customer);

    const endTime = new Date(Date.now()).toString();

    const status = {
        startTime,
        wakeUp: wu,
        takeShower: sh,
        makeBreakfast: bk,
        brushTeeth: bt,
        endTime
    }

    console.log(JSON.stringify(status,null, 2));
}
