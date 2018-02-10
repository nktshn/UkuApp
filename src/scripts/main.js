function menuHighlighting(li) {
    var e = document.getElementsByName('navli');
    e.forEach(function (item) {
        if (item.innerHTML === li) {
            item.style.backgroundColor = '#f7f7f7';
        }
    })
}