const storageKey = "STORAGE_KEY_BOOKS";

export const BookManager = (function () {
    function createBook(title, author, year, isComplete) {
        return { id: new Date().getTime(), title, author, year, isComplete };
    }

    function getBooks() {
        const storedBooks = localStorage.getItem(storageKey);
        return storedBooks ? JSON.parse(storedBooks) : [];
    }

    function saveBooks(books) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(books));
        } catch (error) {
            console.error("Gagal untuk menyimpan buku:", error);
        }
    }

    function addOrUpdateBook(book) {
        try {
            const books = getBooks();
            const index = books.findIndex((b) => b.id === book.id);
            if (index !== -1) {
                books[index] = book;
            } else {
                books.push(book);
            }
            saveBooks(books);
        } catch (error) {
            console.error("Gagal untuk tambah/edit buku:", error);
        }

    }

    function toggleBookStatus(bookId) {
        try {
            const book = findBook(bookId);
            if (book) {
                book.isComplete = !book.isComplete;
                addOrUpdateBook(book);
            }
        } catch (error) {
            console.error("Gagal untuk mengubah status buku:", error);
        }
    }

    function deleteBook(bookId) {
        try {
            let books = getBooks();
            books = books.filter((book) => book.id !== bookId);
            saveBooks(books);
        } catch (error) {
            console.error("Gagal untuk menghapus status buku:", error);
        }

    }

    function findBook(bookId) {
        return getBooks().find((book) => book.id === bookId);
    }

    function findBookId(e) {
        return parseInt(e.target?.closest(".book-item")?.dataset?.bookid, 10);
    }

    return {
        createBook,
        getBooks,
        addOrUpdateBook,
        toggleBookStatus,
        deleteBook,
        findBook,
        findBookId,
    };
})();
