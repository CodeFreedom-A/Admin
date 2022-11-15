import { App } from "vue";
import { DirectiveType } from "./type";

const directives = import.meta.glob<{ default: DirectiveType }>("./([a-zA-Z]+.ts|**/index.ts)", { eager: true });

export default (app: App) => Object.keys(directives).forEach(key => app.directive(directives[key].default.name, directives[key].default.directive));
