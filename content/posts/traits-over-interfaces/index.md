---
title: "Traits Over Interfaces"
subtitle: "Don't be such a square!"
description: "Traits in Rust vs. Interfaces in Golang"
date: 2020-12-04T00:22:30-08:00
tags: []
categories: []
draft: false
---

Reading back over traits in "The Book" of Rust (that has a biblical feel, doesn't it?), I realized something that was totally impossible in Go: implementing traits for non-local types i.e. types that you did not create yourself. To see what I mean concretely, let's say that we wanted to define a `square` method for floating-point numbers. Sure, it's actually far fewer keystrokes to just multiply the value by itself, but let's say we wanna be extra explicit (as things are often better that way). In Rust, we can simply define a trait `Squared` with a method `square` and `impl` that for `f64`. 

```rust
trait Squared {
    fn square(self) -> f64;
}

impl Squared for f64 {
    fn square(self) -> f64 {
        self * self
    }
}

fn square(s: impl Squared) -> f64 {
    s.square()
}

fn main() {
    let s: f64 = 6.0;
    println!("{}", square(s));
}
```

This code snippet is also available [on the Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=4deb7b6dd5590ae845056eb43050f10e). Pretty straight-forward! However, this turns out to be impossible in Go, since - according to the compiler - you "cannot define new methods on non-local types." What a buzzkill. For example, the following program will not compile.

```go
package main

import "fmt"

type squared interface {
	square() float64
}

func (f float64) square() float64 {
	return f * f
}

func square(s squared) {
	fmt.Println(s)
	fmt.Println(s.square())
}

func main() {
	var s float64 = 6.0
	square(s)
}
```

(Also [on the Go Playground](https://play.golang.org/p/D95UUgWDfMi).) This might seem totally minor and technical, but it actually has pretty profound effects on how you can use libraries or modules in each language. With Rust, you can always just `impl` the desired functionality on top of other people's hard work. In true programmer fashion, you stand on the shoulders of giants. However, in Go, this isn't allowed. Limiting extensibility can be seen as both a win and loss for that elusive Gopher ideal, "simplicity", which would actually make a nice girl's name when you think about it . On one hand, all code relevant to one specific type is written alongside that type. It's easy to find, but, on the other hand, hard to update. If you need some open-source maintainer to implement a `string` method, well, you might have to go to buymeacoffee.com. On the other, other hand, needs will inevitably arise for a project and Go's rather simple (for all the good and bad that entails) approach to interfaces leaves you with two, equally hack-y options. You can either type-alias to define your "own" local type or create a struct wrapper for the original type. Both are pretty ugly in my honest opinion.

