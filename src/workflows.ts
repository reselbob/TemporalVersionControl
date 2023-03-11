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


const wakeUpTime = '7:30 AM';

export async function simpleWorkflow(): Promise<string> {

    const startTime = Date.now();
    const result = new Array<string>();

    await wf.sleep(5000)
    const wu = await wakeUp(wakeUpTime);

    await wf.sleep(5000)
    const sh = await takeShower();

    await wf.sleep(5000)
    const bk = await makeBreakfast();

    await wf.sleep(5000)
    const bt = await brushTeeth();

    const endTime= Date.now();

    const person = {
        startTime,
        wakeUp: wu,
        takeShower: sh,
        makeBreakfast: bk,
        brushTeeth: bt,
        endTime
    }

    return JSON.stringify(person);
}
