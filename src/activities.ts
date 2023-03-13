import {ApplicationFailure} from "@temporalio/workflow";


//  milliseconds * seconds * minutes * hours = .5 hours
const PAUSE_LENGTH= 1000 * 60 * 60 * .5;

export async function wakeUp(customer: string, wakeUpTime: string): Promise<string> {
    const msg = `${customer} got up at ${wakeUpTime}.`;
    console.log(msg);
    return msg;
}

export async function takeShower(customer: string,): Promise<string> {
    const msg = `${customer} took at shower.`;
    console.log(msg);
    await pause(PAUSE_LENGTH);
    return msg;
}

export async function makeBreakfast(customer: string,): Promise<string> {
    const tasks = ['brew coffee', 'make toast', 'fry egg']
    tasks.forEach(task => {console.log(task)})
    const msg = ` Here is what ${customer} did: ${JSON.stringify(tasks, null, 2)}.`;
    await pause(PAUSE_LENGTH);
    return msg;
}

export async function brushTeeth(customer: string,): Promise<string> {
    const msg = `${customer} brushed their teeth.`;
    console.log(msg);
    await pause(PAUSE_LENGTH);
    return msg;
}

async function pause(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

