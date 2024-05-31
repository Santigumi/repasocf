import { getInfo } from "../../utils/firebase"
import Card, { Attribute } from "../../song/Song"
import Postbtn, { AttributePost } from "../../menu/postbtn"
import Dashbtn, { AttributeDash } from "../../menu/dashbtn"
import { Info } from "../../types/song"

export class Dashboard extends HTMLElement {
    constructor(){
    super();
    this.attachShadow({mode:'open'})
    }

    connectedCallback(){
    this.render()
    }

    async render(){
    const postbtn = this.ownerDocument.createElement('post-button') as Postbtn;
    postbtn.setAttribute(AttributePost.text, 'Post');
    this.shadowRoot?.appendChild(postbtn);
    const dashbtn = this.ownerDocument.createElement('dash-button') as Dashbtn;
    dashbtn.setAttribute(AttributeDash.text, 'Dashboard');
    this.shadowRoot?.appendChild(dashbtn);

    const sectionCards = document.createElement('section');
    const songs = await getInfo();
    songs.forEach((card: any)=>{
    const cart = document.createElement('app-card');
    cart.setAttribute(Attribute.nombre, card.nombre)
    cart.setAttribute(Attribute.color, card.color)
    cart.setAttribute(Attribute.letra, card.letra)
    sectionCards.appendChild(cart)
    this.shadowRoot?.appendChild(sectionCards)
    })
    }
}

export default Dashboard
customElements.define('app-dashboard', Dashboard)