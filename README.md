# Bindable
A base class for instantiating classes for each instance of an element.

## Installation
Install the package with NPM:

```
npm install @donutteam/bindable
```

## Usage
This class does nothing on its own and must be extended to be useful.

This class is also only for use in browsers, not Node. You'll need to use some sort of bundler to get it there, we recommend [esbuild](https://esbuild.github.io/).

For example:

```js
import { Bindable } from "@donutteam/bindable";

class Example extends Bindable
{
	// When extending bindable, you should replace the base class' selector with
	// one that matches all elements you want this bindable to match
	static selector = ".my-example-class";

	// Each Bindable constructor is passed an element that matched the selector
	constructor(element)
	{
		// As an example, log each element that has the "my-example-class" class
		console.log(element);

		// Of course, you could also do anything you like here like adding event listeners:
		element.addEventListener("click", (event) =>
		{
			event.preventDefault();

			alert("Hello world!");
		})
	}
}

// Call this to bind all elements that currently exist.
// Depending on *where* your JS bundle is loaded, you may want
// to wrap this in a document load event listener
Example.bindAll();
```

If you have additional JavaScript that will create new elements, you can also optionally have your class watch for changes automatically using `Bindable.observe()`:

```js
Bindable.observe();
```

By default, Bindable's mutation observer will watch `document.documentElement`, which is the root. If you'd prefer to watch a specific element lower in the tree instead, you can pass a different element to `Bindable.observe()` as follows:

```js
const myRoot = document.querySelector(".my-root");

// Only new elements within myRoot will be bound if they match the selector
Bindable.observe(myRoot);
```

With this strategy, you can create one or more observers that only watch the parts of the page you know will change instead of the entire document.

## Logging
By default, Bindable classes will log helpful information to the console when an element fails to bind for some reason and when `bindAll` is complete.

If you don't want logs, you can change it on the base class *or* your extended class as such:

```js
// Will disable logging for ALL Bindable classes
Bindable.enableLogging = false;
```
```js
// Will only disable logging for this class and classes that extend it (by default, they could turn it back on too)
class Example extends Bindable
{
	static enableLogging = false;
}
```

## License
[MIT](https://github.com/donutteam/bindable/blob/main/LICENSE.md)