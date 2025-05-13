const list = document.getElementById('quotes-list');
const total = document.getElementById('total');
const loader = document.querySelector('.loader');
let quotes = [];

const getQuotes = async () => {
    try {
        const response = await fetch('https://dummyjson.com/quotes');
        const data = await response.json();
        quotes = data.quotes;
        listQuotes(data.quotes);
        loader.style.display = 'none';
    } catch (error) {
        list.innerHTML = `<b class="error">Failed To Load The Data !</b>`;
        throw error;
    }
}


const listQuotes = (quotes) => {
    list.innerHTML = "";
    if (!quotes.length) {
        list.innerHTML = `<b class="error">There Are No Quotes Matches Your Input ! </b>`;
        total.textContent = 0;
        return;
    }

    quotes.map(obj => {
        const item = document.createElement('li');
        item.innerHTML = `<p>${obj.quote}</p>`;
        list.appendChild(item);
    })
    total.textContent = quotes.length;

}


document.querySelector('#search').addEventListener('input',
    (e) => {
        listQuotes(quotes.filter(obj => {
            return obj.quote.toLowerCase().includes((e.target.value).toLowerCase());
        }));
    }
);
getQuotes();

