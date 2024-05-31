import { dispatch } from '../store/store';
import { changeScreen } from '../store/actions';
import { addObserver } from '../store/store';

export enum AttributeDash {
	'text' = 'text',
}

class Dashbtn extends HTMLElement {
	text?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.onButtonClicked = this.onButtonClicked.bind(this);
		addObserver(this)
	}

	static get observedAttributes() {
		const attrs: Record<AttributeDash, null> = {
			text: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.mount();
	}

	attributeChangedCallback(propName: AttributeDash, oldValue: string | undefined, newValue: string | undefined) {
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
            <button id="dashbutton" type="submit">${this.text}</button>
            `;
		}
	}

	addListeners() {
		this.shadowRoot?.querySelector('#dashbutton')?.addEventListener('click', this.onButtonClicked);
	}

	onButtonClicked() {
		dispatch(changeScreen('DASHBOARD'))
	}
}
export default Dashbtn;
customElements.define('dash-button', Dashbtn);
