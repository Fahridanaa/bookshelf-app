export const UIController = (function () {
    function createBookHTML(book) {
        return `
        <div data-bookid="${book.id}" data-testid="bookItem" class="book-item">
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">${book.author}</p>
            <p data-testid="bookItemYear">${book.year}</p>
            <div class="action-button">
                <button data-testid="bookItemIsCompleteButton" title="${book.isComplete ? "Baca Ulang" : "Selesai Dibaca"}">
                    ${book.isComplete
                ? `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>`
                : `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>`
            }
                </button>
                <button data-testid="bookItemEditButton" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
                <button data-testid="bookItemDeleteButton" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>`;
    }

    function displayBooks(books, incompleteBookList, completeBookList) {
        const incompleteBooks = books.filter(book => !book.isComplete);
        const completeBooks = books.filter(book => book.isComplete);

        incompleteBookList.innerHTML = incompleteBooks.length > 0
            ? incompleteBooks.map(book => createBookHTML(book)).join("")
            : "<h3>Rak Kosong</h3>";

        completeBookList.innerHTML = completeBooks.length > 0
            ? completeBooks.map(book => createBookHTML(book)).join("")
            : "<h3>Rak Kosong</h3>";
    }

    return {
        displayBooks,
    };
})();
