
import { addObserver, appState } from './components/store/store';
import Post from './components/screens/post/post';
import Dashboard from './components/screens/dashboard/dashboard';
import '../src/components/screens/dashboard/dashboard'
import '../src/components/screens/post/post'

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		console.log(appState.screen);

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ` `;
		}
		switch (appState.screen) {
			case 'POST':
				const post = this.ownerDocument.createElement('app-post') as Post;
				this.shadowRoot?.appendChild(post);
				break;

			case 'DASHBOARD':
				const dashboard = this.ownerDocument.createElement('app-dashboard') as Dashboard;
				this.shadowRoot?.appendChild(dashboard);
				break;

			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);
