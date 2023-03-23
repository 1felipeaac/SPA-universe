import { Router } from "./router.js"
import {Selectors} from "./selectors.js"

const router = new Router()

export default function() {

    function setPage(){
        Selectors.home.addEventListener("click", route)
        Selectors.universe.addEventListener("click", route)
        Selectors.exploration.addEventListener("click", route)
    }

    function route(){
        router.route()
    }

    function setStylePages(element){
        const id = element.id
        element.addEventListener("click", function(e){
            e.preventDefault()
            saveState(id)
        })
    }

    function changeClassPages(element){

        var classToRemove = Array.from(Selectors.pages.classList).filter((className)=>{
            return className.startsWith('page-')
        })
        var classToReplace = 'page-'+ element

        Selectors.body.style.backgroundImage = `url("./assets/img-${element}.png")`

        Selectors.pages.classList.replace(classToRemove, classToReplace)

        if(element != 'home'){
            Selectors.main.style.justifyContent = "flex-start"
        }else{
            Selectors.main.style.justifyContent = "center"
        }
     
    }

    function saveState(element){

        if(element == "")
            element = 'home'

        switch (element) {
            case 'universe':
                changeClassPages(element)
                break;
            case 'exploration':
                changeClassPages(element)

                break;
            default:
                changeClassPages(element)
                break;
        }

    }

    function windowPopState(){
        window.addEventListener("popstate", function(){
            var {pathname} = window.location
            saveState(pathname.replace("/",''))
        })
    }

    function buildPages(){
        setPage()
        setStylePages(Selectors.home)
        setStylePages(Selectors.universe)
        setStylePages(Selectors.exploration)
    }

    function navegation(){
        router.handle()

        window.onpopstate = () => router.handle() // permitir que volte a página pelo botão do navegador
        window.route = () => router.route() // habilitar o preventDefault
    }

    function addRoutes(){
        router.add("/","/pages/home.html")
        router.add("/exploration","/pages/exploration.html")
        router.add("/universe","/pages/universe.html")
        router.add(404, "/pages/error.html")
    }

    return{
        buildPages,
        windowPopState,
        navegation,
        addRoutes
    }
}