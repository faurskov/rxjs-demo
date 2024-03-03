export class BaseComponent {

    public element: HTMLElement = document.createElement('section');
    public name: string = '';

    constructor() {
        this.element.classList.add('mb-4', 'p-4', 'bg-gray-100', 'rounded-md');
    }

    
}