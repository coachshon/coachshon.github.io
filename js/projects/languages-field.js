const badgeBaseURL = 'https://img.shields.io/badge/';
const style = 'for-the-badge'
// https://simpleicons.org/
var logo = {
    'Jupyter Notebook': ['Python', '306998', 'FFD43B'],
    'Python': ['Python', '3776AB', 'FFE873'],
    'C': ['cloudera','014177', 'ebebeb'],
    'C++': ['cplusplus', '00599C', 'FFE873'],
    'C#': ['csharp','239120', 'FFE873'],
    'HTML': ['HTML5', 'f06529', 'ebebeb'],
    'CSS': ['CSS3', '2965f1', 'ebebeb'],
    'Shell': ['WindowsTerminal', 'FFFFFF', '000000'],
    'Makefile': ['WindowsTerminal', '000000', 'ebebeb'],
    'JavaScript': ['javascript', 'f0db4f', '323330'],
    'Lua': ['lua', '00017E', 'ebebeb'],
    'Java': ['java', 'f89820', 'ebebeb']
};

function clearLanguagesField() {
    var field = document.getElementById('projects_languages');
    field.innerHTML = '';
}

function buildURL(language) {
    logoName = logo[language][0];
    logoColor = logo[language][1];
    backgroundColor = logo[language][2];
    return `${badgeBaseURL}-${language}-${backgroundColor}?logo=${logoName}&style=${style}&logoColor=${logoColor}`;
}

function appendLanguageImage(language, index) {
    var img = document.createElement('img');
    img.src = buildURL(language);
    img.className = 'lang-column-default';
    var field = document.getElementById('projects_languages');
    field.appendChild(img);
}