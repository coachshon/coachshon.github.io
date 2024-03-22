var card1, card2, card3, leftSlider, centerSlider, rightSlider, cardsPosition;
var projectsData;
var currentIndex = 0

function initCarousel(data){
    card1 = document.getElementById('left_card');
    card2 = document.getElementById('center_card');
    card3 = document.getElementById('right_card');
    leftSlider = document.getElementById('left_slider');
    centerSlider = document.getElementById('center_slider');
    rightSlider = document.getElementById('right_slider');
    cardsPosition = [{'card':card1, 'slider':leftSlider}, {'card':card2, 'slider':centerSlider}, {'card':card3, 'slider':rightSlider}];
    clearLanguagesField();
    card1.onclick = function() {checkClick(card1)};
    card2.onclick = function() {checkClick(card2)};
    card3.onclick = function() {checkClick(card3)}; 
    console.log(data);
    updateCard(cardsPosition[0]['card'], data[prevIndex(currentIndex, data.length)]);
    updateCard(cardsPosition[1]['card'], data[currentIndex]);
    updateCard(cardsPosition[2]['card'], data[nextIndex(currentIndex, data.length)]);
    data[currentIndex]['languages'].forEach(appendLanguageImage);
    projectsData = data;
}
    

function updateCard(card, data){
    card.children[0].textContent = data['title'];
    card.children[1].src = data['logo'];
    card.children[2].textContent = data['description'];
    card.children[3].onclick = function() {
        window.open(data['url'], '_blank').focus();
    }
}

function checkClick(card) {    
    switch (card) {
        case cardsPosition[0]['card']:            
            cardsPosition = rotateRight(cardsPosition);    
            leftClick();  
            break;
        case cardsPosition[2]['card']:            
            cardsPosition = rotateLeft(cardsPosition);
            rightClick();
            break;
        default:
            break;
    }    
}

function leftClick(){
    clearLanguagesField();
    currentIndex = prevIndex(currentIndex, projectsData.length);
    projectsData[currentIndex]['languages'].forEach(appendLanguageImage);
    updateCard(cardsPosition[0]['card'], projectsData[prevIndex(currentIndex, projectsData.length)]);
}

function rightClick(){
    clearLanguagesField();
    currentIndex = nextIndex(currentIndex, projectsData.length);
    projectsData[currentIndex]['languages'].forEach(appendLanguageImage);
    updateCard(cardsPosition[2]['card'], projectsData[nextIndex(currentIndex, projectsData.length)]);
}

function prevIndex(index, size) {
    if(index == 0) {
        return size - 1;
    } else {
        return index - 1;
    }
}

function nextIndex(index, size) {
    if(index == size - 1) {
        return 0;
    } else {
        return index + 1;
    }
}

function rotateLeft(arr){
    let first = arr.shift();
    arr.push(first);
    return arr;
}

function rotateRight(arr){
    let last = arr.pop();
    arr.unshift(last);
    return arr;
}