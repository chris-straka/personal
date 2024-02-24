---
title: "Vanilla JS Components"
description: "In this post I write about my experience building vanilla web components in JS"
pubDate: "Feb 14 2023"
---

This post is basically an evolution of my understanding of JS components. I'm used to writing stuff like this...

```html
<html>
  <head>
    <link rel="stylesheet" href="my.css" />
    <script src="my.js" defer></script>
  </head>
  <body>
    <button id="foo">Fetch</button>
    <ul id="bar"></ul>
  </body>
</html>
```

```js
const bt = document.getElementById("foo");
const ul = document.querySelector("#bar");

bt.addEventListener("click", () => {
  // ul.innerHTML = ``
  // document.createElement() && ul.appendChild()
});
```

And I like this because there's good IDE support and concerns are separated into their own file. I can also declaratively create HTML in JS using innerHTML = `` (and escape when necessary!), or create html imperatively with createElement() and appendChild(). Looking at native web components, that way of doing things hasn't changed much...

```js
const template = document.createElement("template");

template.innerHTML = `
  <style>
    You might put all your styles in here, but this can get big.
    IDE support can really help out here (otherwise it's like writing in notepad)
  </style> 

  <p>adding HTML can make this string quite large</p>
`;

export class FooEl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const h1 = document.createElement("h1");
    h1.textContent = "I could also create the html here imperatively";
    h1.textContent = "The constructor can also get really big this way";

    this.shadowRoot.appendChild(h1);
  }

  connectedCallback() {} // addEventListener()
  disconnectedCallback() {} // removeEventListener() || cleanup()
}

customElements.define("foo-el", Foo);
```

However, I think it's much better to break things apart into their own methods. This [way of making JS components from olavgg](https://github.com/olavgg/vanillajs/blob/master/example1/js/application.js) is good I think, or at least something like it.

```js
export class FooEl extends HTMLElement {
  constructor() {
    super();
    this.stuff = [];
  }

  connectedCallback() {
    this.stuff = getStuff(); // TODO
    this.createDOMElements();
    this.render();
  }

  createDOMElements() {
    this.foo = document.createElement("h1");
    this.bar = document.createElement("h1");
  }

  renderFoo() {
    this.foo.innerHTML = `foo`;
  }

  renderBar() {
    this.bar.innerHTML = `bar`;
  }

  render() {
    this.renderFoo();
    this.renderBar();
  }
}
```

It's similar to [lit](https://lit.dev).

```ts
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("foo-el")
class FooEl extends LitElement {
  static styles = css``;

  h1Template() {
    return html`<h1>title</h1>`;
  }

  @property()
  foo = "foo";

  pTemplate() {
    return html`<p>${this.foo}</p>`;
  }

  render() {
    return html`${this.h1Template()} ${this.pTemplate()}`;
  }
}
```

If you prefer to keep the HTML in its own file, you can also do this [technique featured on CSS tricks](https://css-tricks.com/web-components-are-easier-than-you-think/).

```html
<template id="foo">All the HTML/styles for the component</template>
```

```js
customElements.define(
  "foo-el",
  class extends HTMLElement {
    constructor() {
      super();
      let foo = document.getElementById("foo");
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(foo.content.cloneNode(true));
    }
  }
);
```

For this to work, I'm pretty sure the user would have to visit the page with that HTML template on it. This means the JS component would only be reusable on that page. I think webpack has a feature where you can create a separate HTML file for your web component and then have it "import" that html into your JS, but I'd probably reach for something else at that point like JSX, Lit/Stencil or a framework.
