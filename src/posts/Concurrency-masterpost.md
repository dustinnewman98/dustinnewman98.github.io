---
title: Concurrency Masterpost
subtitle:
description:
date:
---

Concurrency is at the heart of network programming. Most of networking is presumably I/O bound and as such it's very easy to waste precious CPU cycles simply waiting for responses. To solve this, we structure our programs to be *concurrent*, dividing a problem into independent sections such that each concurrent process (and I don't mean Linux process, but rather the general meaning) may execute the sections in any order. Different concurrency and concurrency control mechanisms have been proposed in the past 60 years and I thought it would be helpful to have a reference point comparing them all. This post will be broken up into two primary sections: "concurrency" and "concurrency control."

## Concurrency
### Threads
Threads are independent executions of code. In operating system terminology, "threads" differ from "processes" in that threads share an address space and thus do not require the allocation of new pages in virtual memory. This makes them cheaper to create. There are two primary ways to create threads: through the operating system or through the runtime. 

#### Kernel Threads
Kernel threads are created through the underlying operating system. They receive their own stack (allocated within the existing memory of their parent process) and of course their own CPU registers for the stack and instruction pointers. However, just because threads do not require allocating their own address space, they still require allocating a stack. While the exact size differs between implementations, they are almost always going to be larger than green threads. For example, Rust allocates a default thread stack size of 2 MiB (≈ 2 MB) [1]; Java, 1 MB [2]; POSIX standard thread (i.e. `pthread_create` in C), 2 MB [3]. 

#### Green Threads
### Parallelism
### Multitasking
#### Preemptive
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