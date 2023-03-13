import {ApplicationFailure} from "@temporalio/workflow";


//  milliseconds * seconds * minutes * hours = .5 hours
const PAUSE_LENGTH= 1000 * 60 * 60 * .5;

export async function wakeUp(wakeUpTime: string): Promise<string> {
    const msg = 'I got up at : ' + wakeUpTime + '.';
    console.log(msg);
    return msg;
}

export async function takeShower(): Promise<string> {
    const msg = 'I am taking a shower!';
    console.log(msg);
    await pause(PAUSE_LENGTH);
    return msg;
}

export async function makeBreakfast(): Promise<string> {
    const tasks = ['brew coffee', 'make toast', 'fry egg']
    tasks.forEach(task => {console.log(task)})
    const msg =  'Here is what I did: ' + tasks.join(" ")
    await pause(PAUSE_LENGTH);
    return msg;
}

export async function brushTeeth(): Promise<string> {
    const msg = 'I brushed my teeth'
    console.log(msg);
    await pause(PAUSE_LENGTH);
    return msg;
}

async function pause(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

