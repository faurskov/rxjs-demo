import typescriptLogo from '/typescript.svg'
import viteLogo from '/vite.svg'
export class Container {

    constructor(container: HTMLElement) {
        const section = document.createElement('section');
        this.render(section);
        container.appendChild(section);
    }

    private render(section: HTMLElement){
        section.innerHTML =  `
        <div class="flex gap-2 justify-end">
            <a href="https://vitejs.dev" target="_blank">
                <img src="${viteLogo}" class="logo" alt="Vite logo" />
            </a>
            <a href="https://www.typescriptlang.org/" target="_blank">
                <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
            </a>
        </div>
        <h1 class="p-4 text-3xl text-center">Rxjs</h1>`;
    }
}