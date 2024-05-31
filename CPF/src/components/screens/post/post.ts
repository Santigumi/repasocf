import { Info } from "../../types/song"
import { addInfo } from "../../utils/firebase"
import { getInfo } from "../../utils/firebase"
import Card, { Attribute } from "../../song/Song"
import Postbtn, { AttributePost } from "../../menu/postbtn"
import Dashbtn, { AttributeDash } from "../../menu/dashbtn"

const formData: Omit<Info, 'id'> = {
    nombre: '',
    color: '',
    letra: '',
}

export class Post extends HTMLElement{

    constructor(){
    super()
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

    const text = this.ownerDocument.createElement('h1')
    text.innerText = 'Crea una publicacion'
    this.shadowRoot?.appendChild(text)

    const nombre = this.ownerDocument.createElement('input')
    nombre.type = 'text'
    nombre.placeholder = 'Nombre'
    nombre.addEventListener('change', this.addNombre)
    this.shadowRoot?.appendChild(nombre)

    const color = this.ownerDocument.createElement('input')
    color.type = 'color'
    color.addEventListener('change', this.addColor)
    this.shadowRoot?.appendChild(color)

    const letra = this.ownerDocument.createElement('input')
    letra.placeholder = 'Letra'
    letra.addEventListener('change', this.addLetra)
    this.shadowRoot?.appendChild(letra)

    const save = this.ownerDocument.createElement('button');
    save.innerHTML = 'Guardar publicacion'
    save.addEventListener('click', this.submitForm)
    this.shadowRoot?.appendChild(save)
    }


    addNombre(e: any){
    formData.nombre = e.target?.value
    }

    addColor(e: any){
    formData.color = e.target?.value
    }

    addLetra(e: any){
    formData.letra = e.target?.value
    }

    submitForm(){
    addInfo(formData);
    alert("Se ha subido tu post")
    }

}
export default Post
customElements.define('app-post', Post)