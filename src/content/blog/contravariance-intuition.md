---
title: "Understanding the intuition behind type variance"
description: "This blog post helps people make sense of variance on an intutitive level."
pubDate: "Feb 08 2023"
---

As a heads up, this may not be a great introduction to the topic of variance. If you're stumped this might help you.

If you ever looked at Kotlin generics, you may have struggled (as I have) to understand type variance on an intuitive level. You may already know that a "producer" can **only** produce its generic type, and a "consumer" can **only** consume its generic type. But the question I want to answer here is, why?

I've written out a small code example down below that will hopefully illustrate why this must be the case.

```kotlin
// a is an "invariant" list
var a: MutableList<Int> = mutableListOf(1, 2, 3)

// b is a "contravariant" list
val b: MutableList<in Int> = a
```

As the programmer, we can clearly see that b is holding a list of integers. So why are we not allowed to grab any integers from b when it's so painfully obvious to us that it's holding a list of integers? We even marked it as val, which means b will **never** point to anything else (i.e. a list of floats or something).

```kotlin
val c: Int = b[0] // ERROR, b[0] is of type Any? and NOT an Int
```

Even stranger, it almost seems like the compiler knows that b is holding a list of integers. Because it's only letting us add more integers to it. For example, if we try to add a Number (which is an Int super type), you'll see that it errors out.

```kotlin
val d: Number = 1.1
b.add(d) // ERROR - expected Int
```

You may be even more confused if you thought that this was the entire point for contravariance. You may vaguely remember reading/hearing something about how contravariance lets you use a supertype in place of a generic type. Well, here you are doing just that and you got an error!

The trick to understanding all of this, is you have to separate in your mind, the action of instantiating a contravariant type, from the action of calling methods on that contravariant type. Contravariance __will__ let you use a supertype in place of a generic type, but only when you **instantiate** that contravariant type, not when you call methods on that contravariant type.

So why can't we grab numbers from b then? It's because when you instantiate that contravariant type, the compiler doesn't actually know what we assigned to b. It's similar to static and dynamic dispatch, where we can clearly see what's happening but the compiler can't. The compiler only knows that it's pointing to a list of type Int OR it's pointing to list of Int's supertype. You can call methods that accept in an Int on that contravariant type, because everything that is an Int or above can still function like an Int. But you can not do the same thing in reverse. A Number (which is a supertype of Int) could technically be a Float, which cannot act like an Int.

Hopefully that makes sense and helps clear things up.