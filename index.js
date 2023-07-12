import Engine from "./src/modules/Engine.js";

/* Hooks */
export { default as useGlobal } from "./src/hooks/useGlobal.js";
export { default as useViews } from "./src/hooks/useViews.js";
import useGlobal from "./src/hooks/useGlobal.js";
import useViews from "./src/hooks/useViews.js";
Engine.useGlobal = useGlobal;
Engine.useViews = useViews;

/* Modules */
export { default as CreateComponent } from "./src/modules/CreateComponent.js";
export { default as Requester } from "./src/modules/Requester.js";
import CreateComponent from "./src/modules/CreateComponent.js";
import Requester from "./src/modules/Requester.js";
Engine.CreateComponent = CreateComponent;
Engine.Requester = Requester;

export default Engine;