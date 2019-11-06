let searchInput = document.querySelector('#searchInput'),
  wordsListParagraph = document.querySelector('.main-listWords'),
  addWordInput = document.querySelector('#addWordInput'),
  addWordBtn = document.querySelector('#addWordBtn'),
  clear = document.querySelector('#clear'),
  wordStatus = document.querySelector('.main-bottomParagraph'),
  checkWordBtn = document.querySelector('#checkWordBtn'),
  wordsList = [];

let myData = localStorage.getItem('Word List');

if(myData) {
  wordsList = JSON.parse(myData);
}

wordsListParagraph.innerHTML = '[' + 'WORDS: ' + wordsList + ']';

let addWordFunc = function() {
  let myWord = addWordInput.value.toLowerCase(),
    myWordEmpty = addWordInput.value = '';
  if(myWord) {
    for(let i = 0; i < wordsList.length; i++) {
      if(wordsList[i] !== myWord) {
        myWord = myWord;
      } else if(wordsList[i] === myWord) {
        myWord = addWordInput.value = '';
      }
    }
    wordsList.push(myWord);
    if(myWord === myWordEmpty) {
      wordsList.pop();
    }
    localStorage.setItem('Word List', JSON.stringify(wordsList));
  }
  myWordEmpty;
  wordsListParagraph.innerHTML = '[' + 'WORDS: ' + wordsList + ']';
};

addWordBtn.addEventListener('click', addWordFunc);

addWordInput.addEventListener('keyup', function(event) {
  if(event.keyCode === 13) {
    addWordFunc();
  }
});

clear.addEventListener('click', function() {
  localStorage.clear();
  wordsList = [];
  location.reload();
});



setInterval(function() {
  let searchWord = searchInput.value.toLowerCase();
  if(searchWord) {
    wordStatus.innerHTML = wordsList.some(item => item === searchWord);
  } else {
    wordStatus.innerHTML = '';
  }
}, 500);

// searchInput.addEventListener('keyup', function () {
//   let searchWord = searchInput.value.toLowerCase();
//   if(searchWord) {
//     wordStatus.innerHTML = wordsList.some(item => item === searchWord);
//   } else {
//     wordStatus.innerHTML = '';
//   }
// });