import { debounceTime, fromEvent, merge } from "rxjs";
import { books } from "../books";
import { BaseComponent } from "./base-component";


type Book = {
    title: string;
    category: string;
    language: string;
}

export class BookFilter extends BaseComponent{

    private filteredBooks: Book[] = books;
    private container = document.createElement('div');
    constructor() {
        super();
        this.name = 'BookFilter';
        this.addFilter();
        this.addBookContainer();
        this.enableFilter();
        this.renderBooks();
    }

    private enableFilter() {
        const categoryFilter = this.element.querySelector('[data-category-filter]') as HTMLSelectElement;
        const languageFilter = this.element.querySelector('[data-language-filter]') as HTMLSelectElement;
        const search = this.element.querySelector('[data-search]') as HTMLInputElement;

        merge(
            fromEvent(categoryFilter, 'change'),
            fromEvent(languageFilter, 'change'),
            fromEvent(search, 'input').pipe(debounceTime(250))
        ).subscribe(() => {
            console.log('filter');
            
            this.filteredBooks = books
                .filter(book => categoryFilter.value === 'all' ? true : book.category === categoryFilter.value)
                .filter(book => languageFilter.value === 'all' ? true : book.language === languageFilter.value)
                .filter(book => search.value?.length > 2 ?  book.title.toLowerCase().includes(search.value.toLowerCase()): true);
            this.renderBooks();
        })
    }

    private addFilter() {
        const filters = document.createElement('div');
        filters.classList.add('flex', 'gap-2', 'p-4', 'justify-end');
        filters.innerHTML = `
            <select class="p-2 rounded-md" data-category-filter>
                <option value="all">All</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
            </select>
            <select class="p-2 rounded-md" data-language-filter>
                <option value="all">All</option>
                <option value="Danish">Danish</option>
                <option value="English">English</option>
                <option value="German">German</option>
            </select>
            <input type="text" class="p-2 rounded-md" placeholder="Search" data-search />
        `;
        
        this.element.appendChild(filters);
    }

    private addBookContainer() {
        this.container.classList.add('flex', 'gap-2', 'p-4');
        this.element.appendChild(this.container);
    }

    private renderBooks(){
        this.container.innerHTML = `
        <div class="grid grid-cols-3 gap-2">
            ${this.filteredBooks.map(book => `
                <div class="p-2 bg-slate-50">
                    <p>${book.title}</p>
                    <div class="flex gap-1">
                        <p class="text-xs">${book.category}</p>
                        <p class="text-xs">${book.language}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        `;
    }
}