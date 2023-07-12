class Core {
    #core;

    constructor() {
        window.onhashchange = this.#hashHandler
        this.#core = {
            routes: [],
            path: "",
            defaultPath: "",
            States: [],
            load: async ({routes, defaultRoute}) => {
                const root = document.getElementById("root");

                this.#core.routes = await Promise.all(routes.map(async route => {
                    const view = await import(route.component);

                    return {
                        path: route.path,
                        component: view.default
                    }
                })).then(res => res);
            
                this.#core.path = defaultRoute;
                this.#core.defaultPath = defaultRoute;
                
                let view = this.#core.routes.find(route => route.path === this.#core.path);
                
                if(!view){
                    view = this.#core.routes.find(route => route.path === this.#core.defaultPath);
                    this.#core.path = this.#core.defaultPath;
                }
            
                window.location.hash = this.#core.path;

                root.appendChild(view.component());
            },
            reload: () => {
                const root = document.getElementById("root");

                root.innerHTML = "";
            
                let view = this.#core.routes.find(route => route.path === this.#core.path);
            
                if(!view){
                    view = this.#core.routes.find(route => route.path === this.#core.defaultPath);
                    this.#core.path = this.#core.defaultPath;
                    window.location.hash = this.#core.path;
                }
            
                root.appendChild(view.component());
            }
        };
    }

    get Core() {
        return this.#core;
    }

    #hashHandler = (event) => {
        const newUrl = event.newURL.split("#").pop()

        this.#core.path = newUrl
        this.#core.reload()
        this.#core.States = []
    }
    
}

const Main = new Core();

export default Main;