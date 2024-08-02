// add days

addDays();


function addDays() {
    const history = document.querySelector('.history');

    if (history) {
        for (var i = 1; i < 182; i++) {
            const level = Math.floor(Math.random() * 4);
            const child = document.createElement('div');
            child.id = 'day';
            child.innerHTML = `<div class="day" data-level="${level}"></div>`;
            history.appendChild(child);
        }
    }
}
