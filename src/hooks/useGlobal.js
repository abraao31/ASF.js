import Main from "../Main.js";

export default (initialValue) => {

    if(initialValue === undefined){
        initialValue = null;
    }

    let stack = new Error().stack.split("\n").map((line) => {
            const path = line.split("@http://").pop().split("/");
            path.shift();
            return path.join("/")
        }
    )

    const id = stack[1] 

    const exist = Main.Core.States.find((variavel) => variavel.id == id);

    if(!exist){
        Main.Core.States.push({
            id,
            value: initialValue
        });
    }

    const value = () => {
        const global = Main.Core.States.find((variavel) => variavel.id == id);
        return global.value;
    }

    return [
        value(), 
        (value) => {
            const global = Main.Core.States.find((variavel) => variavel.id == id);
            global.value = value;
            Main.Core.reload();
        }
    ]
}