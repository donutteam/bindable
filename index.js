//
// Exports
//

/**
 * A base class for instantiating classes for each instance of an element.
 */
export class Bindable
{
	/**
	 * Whether or not to log to the console when binding new elements.
	 * 
	 * @type {Boolean}
	 */
	static enableLogging = true;

	/**
	 * The selector used to find bindables that are not yet bound.
	 *
	 * @type {String}
	 */
	static selector = "";

	/**
	 * Binds all bindables.
	 *
	 * @author Loren Goodwin
	 */
	static bindAll()
	{
		let numberBound = 0;

		/**
		 * @type {Array<HTMLElement>}
		 */
		const bindables = document.querySelectorAll(this.selector + `:not([data-bound=true], [data-no-bind=true])`);

		for (const bindable of bindables)
		{
			try
			{
				new this(bindable);

				numberBound++;

				bindable.dataset.bound = "true";
			}
			catch (error)
			{
				if (this.enableLogging)
				{
					console.error(`[${ this.name }] Failed to bind bindable:`, bindable, error);
				}
			}
		}

		if (this.enableLogging)
		{
			console.log(`[${ this.name }] Bound ${ numberBound } bindable elements.`);
		}
	}

	/**
	 * Creates a mutation observer that watches for changes and tries binding new elements.
	 *
	 * @param {HTMLElement} [observerRoot] The element to observe for changes. Optional, defaults to the root of the document.
	 * @author Loren Goodwin
	 */
	static observe(observerRoot)
	{
		const mutationObserver = new MutationObserver(() => this.bindAll());

		mutationObserver.observe(observerRoot ?? document.documentElement,
			{
				subtree: true,
				childList: true,
			});
	}
}