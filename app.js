// Book Constructor
function Book(title , author , isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}



//UI constructor
function UI() {};

UI.prototype.addBookToList = function (book){
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

//Show Alert
UI.prototype.showAlert = function(message,className){
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

//Delete Book
UI.preventDefault.deleteBook(target)=function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearfield = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


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

    //Show success
    ui.showAlert('Book Added', 'success');

    //Clear fields
    ui.clearfield();
    }

    e.preventDefault();
});


//Event Listener for Delete
document.getElementById('book-list').addEventListener('click', (e)=>{
    
    //Instantiate UI object
    const ui = new UI();

    ui.deleteBook(e.target);

    //Show Message
    ui.showAlert('Book Removed!', 'Success');
    e.preventDefault();
})
