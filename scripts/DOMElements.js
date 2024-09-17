export const DOMElements = {
    submitAction: document.getElementById("bookForm"),
    returnButton: document.getElementById("bookFormReturn"),
    bookItemIsCompleteButton: document.querySelectorAll(
        ".bookItemIsCompleteButton"
    ),
    bookItemEditButton: document.querySelectorAll(".bookItemEditButton"),
    bookItemDeleteButton: document.querySelectorAll(".bookItemDeleteButton"),
    library: document.getElementById("library"),
    addBookButton: document.getElementById("add-book-button"),
    formSection: document.getElementById("form-section"),
    incompleteBookList: document.getElementById("incompleteBookList"),
    completeBookList: document.getElementById("completeBookList"),
    searchForm: document.getElementById("searchBook"),
    searchInput: document.getElementById("searchBookTitle"),
    getInputValues() {
        return {
            title: document.getElementById("bookFormTitle").value,
            author: document.getElementById("bookFormAuthor").value,
            year: parseInt(document.getElementById("bookFormYear").value, 10),
            isComplete: document.getElementById("bookFormIsComplete").checked,
        };
    },
    fillForm(book) {
        document.getElementById("bookFormTitle").value = book.title || "";
        document.getElementById("bookFormAuthor").value = book.author || "";
        document.getElementById("bookFormYear").value = book.year || "";
        document.getElementById("bookFormIsComplete").checked =
            book.isComplete || false;
    },
    resetForm() {
        this.submitAction.reset();
        this.submitAction.removeAttribute("data-editing");
    },
};
