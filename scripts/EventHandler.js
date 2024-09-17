import { DOMElements } from "./DOMElements.js";
import { UIController } from "./UIController.js";
import { BookManager } from "./BookManager.js";

export default function setupEventListeners() {
    document.addEventListener("DOMContentLoaded", handleDisplayBooks);
    DOMElements.submitAction.addEventListener("submit", handleFormSubmit);
    [DOMElements.returnButton, DOMElements.addBookButton].forEach((button) => {
        button.addEventListener("click", handleToggleFormVisibility);
    });
    document.addEventListener("click", (event) => {
        const target = event.target;

        if (target.closest("[data-testid='bookItemIsCompleteButton']")) {
            handleToggleComplete(event);
        } else if (target.closest("[data-testid='bookItemEditButton']")) {
            handleEditBook(event);
        } else if (target.closest("[data-testid='bookItemDeleteButton']")) {
            handleDeleteBook(event);
        }
    });
    DOMElements.searchForm.addEventListener("submit", handleSearchBooks);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const formValues = DOMElements.getInputValues();
    const bookId = DOMElements.submitAction.dataset.editing;

    let newBook;
    if (bookId) {
        newBook = BookManager.findBook(parseInt(bookId, 10));
        Object.assign(newBook, formValues);
    } else {
        newBook = BookManager.createBook(
            formValues.title,
            formValues.author,
            formValues.year,
            formValues.isComplete
        );
    }

    BookManager.addOrUpdateBook(newBook);
    handleDisplayBooks();
    DOMElements.resetForm();
    DOMElements.returnButton.click();
}

function handleToggleFormVisibility() {
    DOMElements.formSection.classList.toggle("hidden");
    DOMElements.library.classList.toggle("hidden");
    DOMElements.addBookButton.classList.toggle("hidden");

    if (
        DOMElements.formSection.classList[0] === "hidden" &&
        DOMElements.submitAction.dataset.editing
    ) {
        DOMElements.submitAction.reset();
        DOMElements.submitAction.removeAttribute("data-editing");
    }
}

function handleDisplayBooks() {
    return UIController.displayBooks(
        BookManager.getBooks(),
        DOMElements.incompleteBookList,
        DOMElements.completeBookList
    );
}

function handleToggleComplete(event) {
    const bookId = BookManager.findBookId(event);
    BookManager.toggleBookStatus(bookId);
    handleDisplayBooks();
}

function handleEditBook(event) {
    const bookId = BookManager.findBookId(event);
    const book = BookManager.findBook(bookId);
    if (book) {
        DOMElements.fillForm(book);
        DOMElements.submitAction.dataset.editing = book.id;
        handleToggleFormVisibility();
    }
}

function handleDeleteBook(event) {
    const bookId = BookManager.findBookId(event);
    BookManager.deleteBook(bookId);
    handleDisplayBooks();
}

function handleSearchBooks(e) {
    e.preventDefault();
    const query = DOMElements.searchInput.value.toLowerCase();
    const books = BookManager.getBooks();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
    UIController.displayBooks(filteredBooks, DOMElements.incompleteBookList, DOMElements.completeBookList);
}