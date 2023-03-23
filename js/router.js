
export class Router{

    routes = {}

    add(routeName, page){
        this.routes[routeName] = page
    }

    route(event){
        event = event || window.event
        event.preventDefault() //desabilitar mudança automática da página
    
        window.history.pushState({}, "", event.target.href) //"avisando" o hitórico sobre a mudança de página
        this.handle()
    }

    handle(){
        const {pathname} = window.location // desestruturarando o 'location'
        const route = this.routes[pathname] || this.routes[404] // caso não exista direciona para página de erro
        fetch(route)
        .then(data =>
            data.text(),
        )
        .then(html => {
            document.querySelector("#pages").innerHTML = html
        })
    }
}