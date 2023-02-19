---
title: "Why I don't like writing web components in vanilla javascript"
description: "In this post I write about my experience building vanilla web components with JS"
pubDate: "Feb 14 2023"
---

PS: If you like creating your own vanilla web components, please don't let this post deter you from doing just that. I tend to write stuff that I feel embarrassed about later, so please don't take this post too seriously.

I thought I'd share my thoughts on vanilla web components, because I think they're cool and fun to use, but I have one big gripe with them that I don't think many people talk about. And that has to do with how they write their own HTML. In particular, I'm referring to how many web components often use `shadowRoot.innerHtml`, `template.innerHtml`, or `shadowRoot.appendChild()` to write their HTML. These solutions aren't that great in my opinion and here's why...

By default (at the time of writing), if you use a code editor like vscode without any added extensions, you're going to end up with template strings that simply weren't made for writing HTML. If you don't remember what a web component looks like, here's an example...

```js
const template = document.createElement("template");

template.innerHTML = `
  <style>foo</style> 
  <button>bar</           button        >

  everything in here has zero IDE features whatsoever
`;

export class Foo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // event listeners and stuff
  }

  disconnectedCallback() {
    // remove event listeners and stuff
  }
}

customElements.define("foo", Foo);
```

As you'll notice, the innerHTML part has no syntax highlighting, suggestions, formatting, completions, spell-checking, etc. All of this makes the code much harder to read, write and maintain. Typos now slip by undetected at compile time, and you now have additional responsibilities like manually indenting code and making sure that it's all nested correctly. It's basically notepad.

Some people get around this by avoiding innerHtml altogether and instead use `document.createElement()`. They then add stuff onto each element individually so that they can `appendChild()` it into a tree of elements that they can then add to the shadowDom. I don't like this solution either because the code tends to get very verbose and hard to read in my experience. It's basically React without JSX.

Both of these approaches are probably fine if your component is small enough, but I think the best solution (with regards to DX), which was also featured on [CSS tricks](https://css-tricks.com/web-components-are-easier-than-you-think/), is to write the HTML template inside the .html file where you intend to use the web component itself. You get all the IDE goodness but you lose out on reusability, because your component is now strongly coupled to that HTML file. I think it's still beneficial because now you get to modularize your code a lot more.

There might be another solution that involves webback or something similar, where you create a separate HTML file for your web component that you can "import" into your JS. But I think it's far better to just use a web component framework at that point. JSX and other template engines (like the ones in Vue or Angular), are far more elegant solution for writing HTML in my opinion. So much so, that I struggle to think of a time where I'll ever write my own web components again without using _some_ sort of web component library like [stenciljs](https://stenciljs.com) or [lit](https://lit.dev/).

PS:

Speaking of lit, I looked into it a little bit and it turns out they don't use JSX or a web template engine either. They have great IDE support for writing CSS, and they do have strong support for making code reactive and composable like many other frontend frameworks which is nice. But there still isn't any IDE support for writing HTML. This has me second guessing whether or not I'm over-exaggerating when it comes to HTML templates, but I think they manage to get around this issue by making everything composable. Here's a modified example of what they do in the docs.

```ts
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';


@customElement('my-page')
class MyPage extends LitElement {

  headerTemplate() {
    return html`<header>foo</header>`;
  }

  articleTemplate() {
    return html`<article>bar</article>`;
  }

  footerTemplate() {
    return html`<footer>baz</footer>`;
  }

  render() {
    return html`
      ${this.headerTemplate()}
      ${this.articleTemplate()}
      ${this.footerTemplate()}

      <style>foo</style> 
      <button>bar</           button        >

      Still no IDE suppport here
    `;
  }
}
```
