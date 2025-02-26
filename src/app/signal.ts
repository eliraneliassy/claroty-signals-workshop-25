export function createSignal<T>(value: T):
  [() => T, (value: T) => void] {

  const subscriptions = new Set<Runner>();

  const read: () => T = ()=> {
    const running = context[context.length - 1];
    if(running) {
      subscribe(running, subscriptions);
    }
    return value;
  }
  const write: (value: T) => void = (newValue: T) => {
    value = newValue;

    for(const sub of subscriptions) {
      sub.execute();
    }
  }
  return [read, write];
}

export interface Runner{
  execute: () => void;
  dependencies: Set<any>
}

const context: Runner[] = [];

function subscribe<T>(running: Runner, subscriptions: Set<Runner>) {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}

function cleanup(running: Runner) {
  for(const dep of running.dependencies) {
    dep.delete();
  }

  running.dependencies.clear();
}

export function effect(fn: () => unknown) {

  const execute = () => {
    cleanup(running);
    context.push(running);
    try{
      fn();
    } finally {
      context.pop();
    }
  }

  const running: Runner = {
    execute,
    dependencies: new Set(),
  }

  execute();
}

