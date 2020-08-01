class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
    
    const list = document.getElementById('book-list');

    //Create tr element
    const row = document.createElement('tr');
    //Insert Cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class = "delete">X</a></td>
    `;

    list.appendChild(row);
    }

    showAlert(message,className) {
         //Create div
        const div = document.createElement('div');
        //Add classes
        div.className = `alert ${className}`;
        //Add Text
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        
        //Insert alert
        container.insertBefore(div, form);
        
        //Timeout
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


//Local Storage Class
class Store{
    

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //Add book to UI
            ui.addBookToList(book);
        })

    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book , index){
           if(book.isbn === isbn){
               books.splice(index,1);
           }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
//DOM load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks)

//Event Listener For addBook
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get Form Values
     const title = document.getElementById('title').value;
     const author = document.getElementById('author').value;
     const isbn = document.getElementById('isbn').value;
 
     //Instantiating a Book
     const book = new Book(title , author , isbn);
 
     //Instantiate UI object
     const ui = new UI();
 
     //Validate
     if(title === '' || author === '' || isbn === ''){
         // Error alert
         ui.showAlert('Please fill in all fields','error')
     }else{
 
      // Add book to List
     ui.addBookToList(book);

     //Add to Local Storage
     Store.addBook(book);
 
     //Show success
     ui.showAlert('Book Added', 'success');
 
     //Clear fields
     ui.clearFields();
     }
     
 
     e.preventDefault();
 });
 
 
 //Event Listener for Delete
 document.getElementById('book-list').addEventListener('click', (e)=>{
     
     //Instantiate UI object
     const ui = new UI();
 
     ui.deleteBook(e.target);

     // Remove from local storage
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 
     //Show Message
     ui.showAlert('Book Removed!', 'success');
     e.preventDefault();
 })
 