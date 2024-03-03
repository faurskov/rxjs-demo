import { BaseComponent } from './base-component';
import typescriptLogo from '/typescript.svg'
import viteLogo from '/vite.svg'
import rxjsLogo from '/rxjs.svg'
import { MouseCords } from './mouse-cords';
import { BookFilter } from './book-filter';
export class Container {

    private components: BaseComponent[] = [];

    constructor(private container: HTMLElement) {
        const section = document.createElement('section');
        this.render(section);
        container.appendChild(section);
        this.addComponent(new BookFilter());
        this.addComponent(new MouseCords());
    }

    public addComponent(component: BaseComponent){
        this.components.push(component);
        this.container.appendChild(component.element);
    }

    // private showComponent(){

    // }

    private render(section: HTMLElement){
        section.innerHTML =  `
        <div class="flex gap-2 justify-end">
            <a href="https://vitejs.dev" target="_blank">
                <img src="${viteLogo}" class="w-8 h-auto" alt="Vite logo" />
            </a>
            <a href="https://www.typescriptlang.org/" target="_blank">
                <img src="${typescriptLogo}" class="w-8 h-auto" alt="TypeScript logo" />
            </a>
            <a href="https://rxjs.dev/" target="_blank">
                <img src="${rxjsLogo}" class="w-8 h-auto" alt="Rxjs logo" />
            </a>
        </div>
        <h1 class="p-4 text-3xl text-center">Rxjs</h1>`;
    }
}