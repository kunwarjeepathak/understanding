export interface SubItemData {
  question: string;
  answerMd: string;
}

export interface QACardData {
  category: string;
  title: string;
  subItems: SubItemData[];
}

const data: QACardData[] = [
  {
    category: 'java',
    title: 'Multithreading',
    subItems: [
      {
        question: 'thread lifecycle?',
        answerMd: `
### Thread Lifecycle Explained

Understanding thread lifecycle is crucial for building robust, high-performance concurrent applications. We'll explore both OS-level and JVM perspectives.

\`\`\`mermaid
stateDiagram-v2
  [*] --> NEW
  NEW --> RUNNABLE: start()
  RUNNABLE --> BLOCKED: lock contention
  BLOCKED --> RUNNABLE: lock release
  RUNNABLE --> WAITING: wait()/join()/park()
  WAITING --> RUNNABLE: notify()/timeout/unpark
  RUNNABLE --> TERMINATED: run() completes
\`\`\`

🚦 **State Transitions**

| From    | To             | Trigger                              |
|---------|----------------|--------------------------------------|
| NEW     | RUNNABLE       | \`start()\` called                   |
| RUNNABLE| RUNNING        | Scheduler selects thread             |
| RUNNING | BLOCKED        | synchronized block contention        |
| BLOCKED | RUNNABLE       | lock released                        |
| RUNNING | WAITING        | wait()/join() (no timeout)/park()    |
| RUNNING | TIMED_WAITING  | sleep(), wait(timeout), parkNanos()  |
| WAITING | RUNNABLE       | notify(), notifyAll(), unpark()      |
| RUNNING | TERMINATED     | run() completes or exception thrown  |

### Common APIs by State

- **Creating thread**: \`new Thread(runnable)\`  
- **Starting**: \`thread.start()\`  
- **Blocking on lock**: \`synchronized(obj)\`, \`ReentrantLock.lock()\`  
- **Waiting**: \`obj.wait()\`, \`LockSupport.park()\`  
- **Timed wait**: \`Thread.sleep(ms)\`, \`obj.wait(ms)\`  
- **Notify**: \`obj.notify()\`, \`LockSupport.unpark(thread)\`  
- **Termination**: thread finishes \`run()\` or throws uncaught exception.  
      `
      },
      {
        question: 'What is the Executor framework?',
        answerMd: `
The Executor framework decouples task submission from execution mechanics. Executors provide thread pools (FixedThreadPool, CachedThreadPool) and scheduling (ScheduledThreadPool).
        `
      },
      {
        question: 'What’s new in CompletableFuture?',
        answerMd: `
CompletableFuture in Java 8+ supports building async pipelines: \`thenApplyAsync\`, \`thenCombine\`, \`exceptionally\`, \`allOf\`/ \`anyOf\`, etc.
        `
      },
      {
        question: 'How do you handle thread safety?',
        answerMd: `
Use synchronized blocks, locks (\`ReentrantLock\`), concurrent collections, or atomic classes (\`AtomicInteger\`, \`AtomicReference\`) to coordinate access.
        `
      }
    ]
  },
  {
    category: 'java',
    title: 'String Based Questions',
    subItems: [
      {
        question: 'How are Strings stored in Java?',
        answerMd: `
Java Strings are immutable and stored in the String Pool to maximize reuse. From Java 7 onward, the pool lives on the heap.
        `
      },
      {
        question: 'What’s the difference between StringBuilder and StringBuffer?',
        answerMd: `
StringBuffer is synchronized (thread-safe) but slower. StringBuilder is unsynchronized and faster for single-thread use.
        `
      },
      {
        question: 'How do you reverse a String?',
        answerMd: `
Use \`new StringBuilder(str).reverse().toString()\` or write a loop swapping characters in a \`char[]\`.
        `
      }
    ]
  }
];

export default data;