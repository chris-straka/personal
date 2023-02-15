---
title: "Why I don't like writing my own web components in vanilla javascript"
description: "In this post I write about my experience building vanilla web components with JS"
pubDate: "Feb 14 2023"
---

PS: If you like creating your own vanilla web components, please don't let this post stop you from doing just that. I tend to write stuff that I'm later embarrassed about as well, so please don't take this post too seriously.

I thought I'd share my thoughts on vanilla web components, because I think they're cool but I have one big gripe with them that I don't think many people talk about. And that has to do with how they write their own HTML. In particular, I'm referring to how many web components use `shadowRoot.innerHtml`, `template.innerHtml`, or `shadowRoot.appendChild()`. Which in my opinion, aren't great and here's why...

By default (at the time of writing), if you use a code editor like vscode without any added extensions, you're going to end up with template strings that simply weren't made for writing HTML. I haven't yet been able to find any extensions help you do this either. Here's an example of what I mean...

```js
const template = document.createElement("template");

template.innerHTML = `
  <style>foo</style>
  <button>bar</button>
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

The issue here is you won't get any help from your IDE when you write HTML inside those template strings \`\`. No syntax highlighting, no suggestions, no formatting, no completions, no spell checking, etc. All of this makes the code much harder to read, write and maintain. Typos now slip by undetected at compile time, and you now have additional responsibilities that you didn't have before. Like indenting code yourself and making sure everything is nested correctly.

Some people get around this by avoiding innerHtml altogether and instead create elements via `document.createElement()`. They then add whatever they need onto each element and append it all together and onto the shadow root via `shadowRoot.appendChild()`. I don't think this is a good solution either though because the code tends to get overly verbose when (at least in my experience). 

Both approaches are fine if your component is small enough, but I think the best solution, which was featured on [CSS tricks](https://css-tricks.com/web-components-are-easier-than-you-think/) is to write the template for the web components inside the .html file that makes use of the web component. This makes it so that the web component is no longer reusable across HTML files, but still gives you all the IDE features. I would do this if I wanted to tightly couple the JS with the HTML that uses it.

There might be another solution that involves using webback or something similar, where you import a separate HTML file that is only meant for your web component into your web component's JS. But I think it's better to just use a component framework at that point. JSX and other template engines like the ones in Angular or Vue, are a far more elegant solution for writing HTML in JS in my opinion. So much so, that I struggle to think of a time where I'll ever write my own web components again without using _some_ sort of web component library, like [stenciljs](https://stenciljs.com).

PS:

Speaking of web component libraries, I looked into [lit](https://lit.dev/) because I thought I could use that instead to write web components with JSX. But it turns out they don't use JSX. They do provide IDE support when writing your own CSS, and they do make things reactive and composable like every other frontend framework. But there still isn't any IDE support for writing HTML. I think the reason why is that things are so composable that you don't really need it and it. Here's a modified example of what they have in the docs.

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
    `;
  }
}
```
