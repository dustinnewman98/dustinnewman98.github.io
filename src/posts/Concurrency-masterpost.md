---
title: Concurrency Masterpost
subtitle:
description:
date:
---

Concurrency is at the heart of network programming. Most of networking is presumably I/O bound and as such it's very easy to waste precious CPU cycles simply waiting for responses. To solve this, we structure our programs to be **concurrent**, dividing a problem into independent sections such that each concurrent unit may execute the sections in any order. Different concurrency and concurrency control mechanisms have been proposed in the past 60 years and I thought it would be helpful to have a reference point comparing them all. This post will be broken up into two primary sections: "concurrency" and "concurrency control."

## Concurrency
### Threads
Threads are independent executions of code. In operating system terminology, "threads" differ from "processes" in that threads share an address space and thus do not require the allocation of new pages in virtual memory. This makes them cheaper to create. There are two primary ways to create threads: through the operating system or through the runtime. 

#### Kernel Threads
Kernel threads are created through the underlying operating system. They receive their own stack (allocated within the existing memory of their parent process) and of course their own CPU registers for the stack and instruction pointers. However, just because threads do not require allocating their own address space, they still require allocating a stack. While the exact size differs between implementations, they are almost always going to be larger than green threads. For example, Rust allocates a default thread stack size of around 2 MB [^1]; Java, 1 MB [^2]; POSIX standard thread (i.e. `pthread_create` in C), 2 MB. [^3] Assuming we are using Rust or C, this means that to spawn one million threads, we would need 2 *terabytes* of RAM.

#### Green Threads
Green threads, also called "user-space threads," are created through the runtime rather than the underlying OS. Note that "runtime" can mean either the runtime of the language itself (which comprises all library code necessary to implement the language features used by your code) or a virtual machine runtime. Like kernel threads, green threads also receive their own stacks, but they are usually significantly smaller. This is because green threads are *multiplexed* onto kernel threads, meaning for every M green threads there are only N kernel threads where presumably M > N. Think of this like green threads "piggybacking" on top of kernel threads. 

For example, assume we have 20 green threads that do not require large stacks. Perhaps they are mostly I/O bound operations, waiting on database requests or something. Instead of allocating 20 kernel threads, each having a far too generous 2 MB stack frame, we are looking at 40 MB of RAM, most of it wasted! Instead, if we give each thread, say a 4 KB stack frame, then we only need 0.8 MB of RAM and *only one* kernel thread. Here, we have M = 20 and N = 1. Popular implementations of green threads all have their own lingo, most of it totally irrelevant. For example, we have Go's "goroutines" with a default green thread stack size of 2 KB [^4]; Haskell's sanely named "threads" with 1 KB [^5]; and Erlang's insanely named "processes" with a shocking 233 *bytes*. [^6]

Using these figures and the example in the previous section, even with the "large" size of Go, we can spawn one million threads with just 2 gigabytes of RAM. Extremely impressive!

You might be wondering at this point "Well, if green threads are so awesome, what's the catch?" and that is a very fair question! Essentially, they are hard to get "right." To support green threads, you need a runtime to manage the multiplexing and mapping from green to kernel threads (remember M:N). From Rust's point of view, this runtime bloat is too steep a price to pay and so the runtime only supports native kernel threads. Green threads also do not inherently support multi-core CPUs. Instead, they must be carefully distributed by the runtime across kernel threads running on each CPU. There is also the problem that if one green thread makes a blocking call, the whole kernel thread is blocked (i.e. descheduled by the operating system)! To fix this, all I/O operations need to be non-blocking, which the runtime needs to coordinate and this is no easy task.

### Parallelism
Now, while threads are a useful concept to achieve concurrency, if you only use one CPU out of four, you might actually see a slow down instead of a speed boost. This is because of the overhead associated with context switching threads. (e.g. saving and loading the stack and instruction pointers, paging in memory, etc.) While concurrency is merely structuring your program to better deal with multiple (independent) tasks, **parallelism** is actually executing tasks simultaneously. To make the distinction clearer, I'll use [an excellent analogy](https://www.quora.com/Is-multithreading-concurrent-or-parallel/answer/Jan-Christian-Meyer) stolen from Jan Christian Meyer on Quora. Imagine you are coding while drinking coffee. These are two independent tasks, but you can only do one at a time. While you are doing both of these together, you never do both truly simultaneously; you do them *concurrently*. Now imagine you can clone yourself such that your clone will code while you drink the coffee. Now you are acting both concurrently *and in parallel*.

Parallelism allows your concurrent code to run simultaneously on different processors. However, there is a limit. Generally speaking, once your number of threads exceeds the number of CPUs, performance actually degrades due to the overhead from context switching dominating the time actually spent executing the threads.

### Multitasking
If you are working with only one CPU, however, parallelism is almost impossible. Aside from crazy things like hyperthreading, you just physically cannot execute more than one instruction at once on a single core. So, what's a program to do then? We've been concurrently programming for decades now and long before multi-core machines came along so obviously there's some way. The secret here is that the operating system will rapidly switch between tasks giving the illusion to the human user that we are running in parallel. What does the "switching" here is known as the "scheduler" because it schedules the different tasks to run in a certain order. There are two main ways for going about this.

#### Preemptive
Preemptive schedulers are by far the most common for popular operating systems. They operate by forcibly interrupting tasks to schedule a new one, trying to operate as fairly as possible generally. They usually make some kind of optimization whereby a task that makes an I/O request is "blocked" from running until the request returns with something useful. These are used for all kernel threads and Erlang's green threads (called "processes").

#### Cooperative

## Concurrency Control
### Shared Memory
#### Mutexes
#### Spinlock
#### Read-Write Lock
#### Semaphore
#### Software Transactional Memory
### Message Passing
#### Actor Model
#### Communicating Sequential Processes
Processes in CSP are anonymous, while actors have identities. So, CSP uses explicit channels for message passing, whereas with Actors you send messages directly.
With CSP the sender cannot transmit a message until the receiver is ready to accept it. Actors can send messages asynchronously
#### CCS
CSP has two forms of choice (internal/external or nondeterministic/deterministic). In CCS the two ideas are fused into one. I think that is an irreconcilable difference. (src https://cs.stackexchange.com/questions/465/similarities-and-differences-in-major-process-algebras)

[^1]: https://github.com/rust-lang/rust/blob/caa231d998a5e853c7ba1455d7a05b500df9d63c/src/libstd/thread/mod.rs#L122

[^2]: Running OpenJDK version “13” 64-Bit Server VM AdoptOpenJDK (build 13+33, mixed mode, sharing) on MacOS 64-bit

[^3]: http://man7.org/linux/man-pages/man3/pthread_create.3.html

[^4]: https://github.com/golang/go/blob/817afe83578d869b36e8697344bb2d557c86b264/src/runtime/stack.go#L72

[^5]: http://downloads.haskell.org/~ghc/7.4.1/docs/html/users_guide/runtime-control.html

[^6]: http://erlang.org/doc/efficiency_guide/processes.html