import { bufferWhen, delay, filter, fromEvent } from "rxjs";
import { BaseComponent } from "./base-component";

export class MouseCords extends BaseComponent {

    private x = 0;
    private y = 0;
    private container = document.createElement('div');

    constructor() {
        super();
        this.name = 'MouseCords';
        this.container.classList.add('flex', 'gap-2', 'p-4');
        this.element.appendChild(this.container);

        this.addMouseMove();
        this.addClick();
    }

    private addMouseMove() {
        fromEvent<MouseEvent>(document, 'mousemove').subscribe((e: MouseEvent) => {
            this.x = e.clientX;
            this.y = e.clientY;
            this.render();
        });
    }

    private render() {
        this.container.innerHTML = `
            <p class="text-2xl">${this.x}</p>
            <p class="text-2xl">${this.y}</p>
            `
    }

    private addClick() {
        const click$ = fromEvent(document, "click");
        click$.pipe(
            bufferWhen(() => click$.pipe(delay(400))),
            filter((events) => events.length >= 3)
        ).subscribe(() => {
            const div = document.createElement('div');
            div.classList.add('flex', 'gap-2', 'p-4');
            div.innerHTML = `
                        <p class="text-2xl">${this.x}</p>
                        <p class="text-2xl">${this.y}</p>
                        `;
            this.element.appendChild(div);
        });
    }

    /*
    .pipe(
            bufferWhen(() => click$.pipe(delay(400))),
            filter((events) => events.length >= 3)
        )
    */
}