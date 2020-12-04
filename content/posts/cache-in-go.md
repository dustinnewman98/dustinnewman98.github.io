---
title: Let's Make a Cache in Go
subtitle: With tests! And plenty of apples.
date: 2020-11-29T13:02:00-08:00
draft: false
---

I have been scratching my head lately trying to think of something to do with Go. It's a perfectly simple, easy-to-use language with a lot of boxes ticked and yet I have been unable to think of anything. Finally, the inspiration struck me: a thread-safe cache with tests. Now, since Go is a relatively high-level language, the actual implementation of this (extremely simple) cache is only wrapper functions around the `map` data structure. However, it is a good project to get familiar with writing tests and some good Go-isms.

Let's start my getting our project structure ready. For me, this means going into my Desktop and creating a new module.

```shell
mkdir gocache
cd gocache
go mod init
```

The Go dependency "management" scene is truly atrocious to be honest [^1], so I try to avoid it as much as I can. But, if anyone wants to use my cache, then it's important to define our cache module formally using the command above. And now that we've gotten the paperwork out of the way, create a file named `cache.go`.

We'll start by defining our package and basic data types. I'm not going to call this "data-driven development" or anything, but I have always found it helpful to formally define what we'll be working with.

```go
// cache.go
package cache

import "sync"

// We'll use strings as our cache keys
type Key string
// And you can store any type of value in our cache
type Value interface{}

type Cache struct {
    data map[Key]Value
    lock sync.RWMutex
}
```

I chose to limit our keys to strings since that is how most people will use caches (e.g. session keys, DNS lookups, cookies, etc.). For our cache values, I chose to use Go's version of the "any" type. While we definitely lose type safety due to the lack of generics [^2], we do gain a lot of convenience. If we wanted to define anything more complicated later, such as a method to iterate over all members of our cache, then we would either need to use interfaces or a concrete type. For our cache type itself, for now it's a simple struct with only a `data` field and a read-write mutex to provide synchronization.

To make testing easier down the line, you'll also want to define a constant to toggle thread-safety off or on. Just put it right under your existing code. If only real multi-threaded programming were this simple, imagine!

```go
const Threaded = true
```

I don't know about you, but when I think of cache operations (as I often do of course), I think of "get" and "set." Without these, it's hard to imagine much use for a cache (except maybe to brag about how you're using a cache). So, let's actually implement these in a thread-safe way.


```go
func (c *Cache) Get(k Key) (Value, bool) {
    if Threaded {
        // We use the Read Lock/Unlock methods here
        // since we are not mutating the cache, only
        // reading values from it
        c.lock.RLock()
        defer c.lock.RUnlock()
    }

    value, exists := c.data[k]
    if !exists {
        return nil, false
    }
    return value, true
}

func (c *Cache) Set(k Key, v Value) {
    if Threaded {
        // We use the regular Lock/Unlock methods here
        // since we are mutating the cache
        c.lock.Lock()
        defer c.lock.Unlock()
    }

    c.data[k] = v
}
```

I'm mirroring Go's own `map` API inside "get", which should help keep the cache reasonably Go-y. Great! But wait, how does someone actually use our cache? Do they need to physically type out ampersand-Capital C-a-c-h-e all by their lonesome selves? Barbaric! Let's give our lovely users a nice `New` function, in typical Go module fashion. 

```go
func New() *Cache {
    cache := &Cache{
        data: make(map[Key]Value),
    }
    return cache
}
```

Note that we don't need to initialize our `lock` field since Go will auto-initialize to the "zero value" of the RWMutex, which is exactly what we want. This is shaping up pretty nicely so far, but I'm getting tired of implementing already! Let's start testing. Create a new file named `cache_test.go` (by convention, testing files are named `<module>_test.go`) and define it to be the same package using the "testing" module.

```go
// cache_test.go
package cache

import (
    "testing"
    "time"
)
```

We want to test the most basic functionality first *i.e.* setting and getting (in that order!). Go testing works by running the `go test` command and any function starting with `Test` (capital T, of course) will be run and passed a testing struct `T`. If you need a little hint as to what we can test our cache for, I gave some examples above: a DNS cache!

```go
func TestBasic(t *testing.T) {
    dns := New()
    dns.Set("apple.com", "17.253.144.10")

    ip, exists := dns.Get("apple.com")
    if !exists {
        t.Error("apple.com was not found")
    }
    if ip == nil {
        t.Error("dns[apple.com] is nil")
    }
    if ip != "17.253.144.10" {
        t.Error("dns[apple.com] != 17.253.144.10")
    }
}
```

Wow! It almost looks like a wrapper over the built-in `map` functionality! Someone tell ICANN to `go get` because we're nearly production-ready for 400 million queries per second with this bad boy. But how to make sure it actually works? After all, not everyone is going to trust your programming chops from the get-go (pun very much intended). Luckily, all these strange conventions do have a pay-off. All we have to do is run

```shell
go test
```

And it should print out the results: PASS! But, not everyone is us, after all: some people make mistakes and we don't wanna leave them stranded if they enter in the wrong value. Sure, they could just call "set" with the new value, but what if they want to erase any evidence of their mistake entirely? We need a remove function! Go already provides a `delete` function exactly for this purpose, so our work is to just wrap it up in a lock.

```go
func (c *Cache) Remove(k Key) {
    if Threaded {
        c.lock.Lock()
        defer c.lock.Unlock()
    }

    delete(c.data, k)
}
```

Excellent! Now even mistakes are tolerated by our cache, go us! (Pun also intended). Once again, let's test. I'm figuring that we insert a value, then remove it and make sure we get a `false` from `Get()`.

```go
// cache_test.go
func TestRemove(t *testing.T) {
    fruits := New()
    fruits.Set("Apple", 1.39)

    applePrice, exists := fruits.Get("Apple")
    if !exists {
        t.Error("Apple price was not set")
    }
    if applePrice == nil {
        t.Error("Apple price is nil")
    }
    if applePrice != 1.39 {
        t.Error("Apple price expected to be 1.39")
    }

    fruits.Remove("Apple")
    applePrice, exists = fruits.Get("Apple")
    if exists {
        t.Error("Apple price was not removed")
    }
    if applePrice != nil {
        t.Error("Apple price is not nil after removal")
    }
}
```

We once again pay homage to Apple/apples and make sure our code is up to par. In case you're wondering, Go's `delete` function is just a no-op (no operation) if the key does not exist already. If you wanted to provide more information to our caller, you could check if the key was present at all and return false if not, only returning true if the key was actually removed. For now, we'll just stick to this. If ICANN has any problems with this, my GitHub issues box is always open.

Now, what about all this trouble we went to to make sure our code was thread-safe? Was it all in vain? No! It's actually a runtime error in Go if you try to simultaneously read and write to a map. As long as our `Threaded` constant is true, this never happens because, well frankly our code is just single-threaded, so there's no risk, but more generally because, until now, `Threaded` *has* been true. We want to test that all our effort to thread-proof our code actually pays off, but how? How do we force a simultaneous read and write?

*/JEOPARDY THEME MUSIC/*

It turns out there's no real robust way to do this, but we can realistically guarantee this by putting reads and writes into an infinite loop in two separate goroutines. Open that test file back up!

```go
func TestThreading(t *testing.T) {
    bloom := New()
    bloom.Set("Granniwinkle", 4.8)

    go func() {
       for {
            _, _ = bloom.Get("Granniwinkle")
       }
    }()
    time.Sleep(1 * time.Second)
    go func() {
        for {
            bloom.Set("Maude", 4.6)
        }
    }()
    time.Sleep(5 * time.Second)
}
```

The five-second timeout at the end is just to give a reasonable window for such a contention to occur, thus triggering a failure. But wait — when you run `go test`, no failure occurs! That's because `Threaded` is still set to true! To make sure that our thread-proofing is actually working, however, we need to see it fail. Sounds paradoxical, I know, but it's like riding a bike with training wheels on. Until you take them off, you'll never know if they're actually helping or not. Don't worry, this isn't nearly as painful, or difficult! Just open up `cache.go` and set

```go
Threaded = false
```

Now, none of our "training wheel" code will run anymore and we can finally fail in glory! Let's run `go test` and...

```
goroutine 5:
gocache.(*Cache).Set(...)
	cache.go
gocache.TestThreading.func2
	cache_test.go
created by gocache.TestThreading
	cache_test.go
exit status 2
FAIL	gocache	1.015s
```

Yes! I've never been so happy to see FAIL in all-caps. We successfully triggered a simultaneous read-write error because our cache was no longer synchronized behind its read-write mutex. Now, go change `Threaded` back to true before the internet explodes.

There you have it! We're ready to be the backbone of the internet. All we need is some buyers. But in the meantime, you can brag about your thread-safe cache in Go and maybe add some more features to be competitive in the cache market. 

[^1]: Package maintainers need to maintain a separate file path for each major release, so beyond the development burden, there is nothing stopping someone from removing old versions accidentally or otherwise. Package users need to manually update each import of the package to the new major version. Go in general compromises between centralization and decentralization, pleasing no one. At least with NPM, everything is centralized and thus organized. They could theoretically prevent left-pad if they wanted to. Go is supposedly decentralized, but then requires that each new version control system is manually added (subject to maintainer approval and the PR process) into `go get` and pkg.go.dev. So, one of the bragging points of Go's dependency system is that you can host your modules anywhere; it doesn't have to be on their servers. Yet, when you actually want to, say, host on Gogs, you can't because the Google maintainers have not updated their whitelist. It seems more to me that the "decentralized" claim is more about freeing up server space while still allowing Google oversight of which package sites are supported.
[^2]: @ Go community, please don't eviscerate my digestive system for mentioning generics. I promise I won't do it again.
