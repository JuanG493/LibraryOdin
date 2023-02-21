class library {
   contenOfNewBooks = document.querySelector('.framebooks');

   constructor(title, author, pages, read, id) {
      this.title = title
      this.author = author
      this.pages = pages
      this.read = read
      this.id = id
   }
   infoBook() {
      return `title: ${this.title}, author: ${this.author}, number of pages: ${this.pages}`
   }

   divBook() {

      let newBook = document.createElement('div');
      newBook.setAttribute('id', `${this.id}`);

      if (this.read == 'yes')
         newBook.setAttribute('class', 'read')

      let contenBook = document.createElement('span');
      contenBook.textContent = this.infoBook()
      newBook.appendChild(contenBook);

      let btnStatus = document.createElement('button');
      btnStatus.innerText = 'status';

      btnStatus.setAttribute('onclick', `flow.changeStatusRoute("${this.id}")`);
      newBook.appendChild(btnStatus);

      let btnDel = document.createElement('button');
      btnDel.innerText = 'Delete';
      btnDel.setAttribute('onclick', `flow.delDivRoute(${this.id})`)
      newBook.appendChild(btnDel);

      this.contenOfNewBooks.appendChild(newBook);

   }

   delBook(id) {
      let target = document.querySelector(`#${id}`);
      this.contenOfNewBooks.removeChild(target)
   }
}


let flow = (() => {
   let ids = 0
   let formElm = document.querySelector('form');
   let mylibraryOfBooks = {}

   formElm.addEventListener('submit', (e) => {
      e.preventDefault();
      let eleVal = document.querySelectorAll('.field');
      let radBut = document.querySelector('input[name="read"]:checked').value;

      const values = [...eleVal].map(itm => itm.value);
      let formatId = `book${ids}`
      values.push(radBut, formatId)


      mylibraryOfBooks[formatId] = new library(...values);
      mylibraryOfBooks[formatId].divBook();

      formElm.reset();
      ids += 1;


   })

   let btnDelAll = document.querySelector('.deleteAll');
   btnDelAll.addEventListener('click', () => {

      for (const key in flow.mylibraryOfBooks) {
            delete flow.mylibraryOfBooks[key];
      }
      document.querySelector('.framebooks').innerHTML = ' '
   })

   function delDivRoute(propertis) {
      mylibraryOfBooks[propertis.id].delBook(propertis.id);
      delete mylibraryOfBooks[propertis.id];
   }

   function changeStatusRoute(propertis) {
      let target = document.querySelector(`#${propertis}`)
      target.classList.toggle('read');
   }
   return { mylibraryOfBooks, delDivRoute, changeStatusRoute  }

})()







