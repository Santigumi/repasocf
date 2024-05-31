import styles from "./song.css"

export enum Attribute {
    'nombre' = 'nombre',
    'color' = 'color',
    'letra' = 'letra',

}

class Card extends HTMLElement{
    nombre?: string;
    color?: string;
    letra?: string;

    constructor(){
    super()
    this.attachShadow({mode:'open'})
    }

    static get observedAttributes(){
        const attrs: Record<Attribute, null> = {
        nombre: null,
        color: null,
        letra: null,
        }
    return Object.keys(attrs);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined){
                this[propName] = newValue
    }

    connectedCallback(){
    this.render()
    }

    render(){
    if(this.shadowRoot){
    this.shadowRoot.innerHTML = `
    <h2>${this.title}</h2>
    <p>Nombre: ${this.nombre}</p>
    <p>Color: ${this.color}</p>
    <p>Letra: ${this.letra} </p>
    `
    }
    const cssInfo= this.ownerDocument.createElement("style");
    cssInfo.innerHTML = styles;
    this.shadowRoot?.appendChild(cssInfo);
    }
}
export default Card
customElements.define('app-card', Card)