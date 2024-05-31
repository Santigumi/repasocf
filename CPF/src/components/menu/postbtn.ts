import { dispatch } from '../store/store';
import { changeScreen } from '../store/actions';
import { addObserver } from '../store/store';

export enum AttributePost {
	'text' = 'text',
}

class Postbtn extends HTMLElement {
	text?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.onButtonClicked = this.onButtonClicked.bind(this);
		addObserver(this)
	}

	static get observedAttributes() {
		const attrs: Record<AttributePost, null> = {
			text: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.mount();
	}

	attributeChangedCallback(propName: AttributePost, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
		this.mount();
	}

	mount() {
		this.render();
		this.addListeners();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
            <button id="postbutton" type="submit">${this.text}</button>
            `;
		}
	}

	addListeners() {
		this.shadowRoot?.querySelector('#postbutton')?.addEventListener('click', this.onButtonClicked);
	}

	onButtonClicked() {
		dispatch(changeScreen('POST'))
	}
}
export default Postbtn;
customElements.define('post-button', Postbtn);