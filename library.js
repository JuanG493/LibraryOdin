

let mylibrary = [];
let shelf = document.querySelector('.framebooks');

let btnDelAll = document.querySelector('.deleteAll');
btnDelAll.addEventListener('click', () => shelf.innerHTML = '')


function Book(title, author, pages, read) {
   this.title = title
   this.author = author
   this.pages = pages
   this.read = read
   this.info = function () {
      return (`${title} by ${author}, ${pages}, ${read} read yet`);
   }

}
let library = document.querySelector('form');
library.addEventListener('submit', e => {
   e.preventDefault();
   let eleVal = document.querySelectorAll('.field');
   let radBut = document.querySelector('input[name="read"]:checked').value;
   let partialList = [];
   eleVal.forEach((item) => {
      partialList.push(item.value)
   });
   partialList.push(radBut);
   mylibrary.push(new Book(...partialList));
   library.reset();
   addingBooks(radBut);
})

function addingBooks(stt) {
   let indexItem = mylibrary[mylibrary.length - 1]
   let newBook = document.createElement('div');
   newBook.setAttribute('id', `${mylibrary.length - 1}`);
   if(stt === 'yes'){
      newBook.setAttribute('class', 'read')
   }

   let contenBook = document.createElement('span');
   contenBook.textContent = `Title: ${indexItem.title}, Author: ${indexItem.author}, Pages: ${indexItem.pages}`;
   newBook.appendChild(contenBook);
   
   let btnStatus = document.createElement('button');
   btnStatus.innerText = 'status';
   btnStatus.setAttribute('onclick', `changeStatus(${mylibrary.length-1})`);
   newBook.appendChild(btnStatus);
   let btnDel = document.createElement('button');
   btnDel.innerText = 'Delete';
   btnDel.setAttribute('onclick', `delOneBook(${mylibrary.length - 1})`)
   newBook.appendChild(btnDel);
   shelf.appendChild(newBook);
}

function delOneBook(num) {
   let elemntDel = document.querySelector(`div[id="${num}"]`);
   shelf.removeChild(elemntDel);
}

function changeStatus (num){
   let target = document.getElementById(`${num}`);
   target.classList.toggle('read');
}







