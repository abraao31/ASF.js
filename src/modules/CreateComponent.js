/**
 * CreateComponent
 * @param {string} tag
 * @param {object} props
 * @returns {HTMLElement} HTMLElement
 * @example
 * const component = CreateComponent("div", {
 *  id: "id",
 *  class: "class",
 *  style: {
 *      color: "red"
 *  },
 *  children: [
 *      CreateComponent("p", {
 *          innerHTML: "Hello World"
 *      })
 *  ]
 * })
 */
export default (tag, props) => {
    const component = document.createElement(tag);

    Object.keys(props).forEach(key => {
        if(props[key] != null && props[key] != undefined){
            if(key == "children"){
                props[key].forEach(child => {
                    component.appendChild(child);
                })
            }else if(key == "style"){
                Object.keys(props[key]).forEach(style => {
                    component.style[style] = props[key][style];
                })
            }else if(key.slice(0, 2) == "on"){
                component.addEventListener(key.slice(2).toLowerCase(), props[key]);
            }else if(key == "innerHTML"){
                component.innerHTML = props[key];
            }else if(key == "outerHTML"){
                component.outerHTML = props[key];
            }else{
                component.setAttribute(key, props[key]);
            }
        }
    })

    return component;
};