class user {
    constructor(name , lastName , books , pets){
        this.name = "facundo"
        this.lastName = "romero"
        this.books = [{nameBook:"Lord Of Rings",author:"J. R. R. Tolkien"}]
        this.pets = ["cat","fish"]
    }
    
    
    getFullName() {
        return `the full name of the user is ${this.name} ${this.lastName}`;
    }
    
    addPet(petName) {
        this.pets.push(petName);

    }

    countPets(){
        return `this user has  ${this.pets.length} pets`;
    }

    addBook(books){
        this.books.push(books);
    }

    getBookNames(){
    var booksNames = [];
    this.books.forEach(item => booksNames.push(item.nameBook)); 
    return booksNames;
 }


}

var user1 = new user();

user1.addPet("parrot");
user1.addBook({nameBook:"Harry Potter",author:"J. K. Rowling"});

console.log(user1.getFullName());
console.log(user1.countPets());
console.log(user1.getBookNames());






