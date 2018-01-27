
var emodji = ['&#128054;', '&#128058;', '&#128060;', '&#128053;', '&#128049;', '&#128048;'];
var opened = 0;
var done = 0;
var intervalID = 0;

start = function() {
    debugger;
    document.getElementsByClassName('minutes')[0].innerHTML = '01';
    document.getElementsByClassName('seconds')[0].innerHTML = '00';

    const cards = document.getElementsByClassName('card');

    for (var i = 0; i < cards.length; i++) {
        cards[i].className = 'card back';
        cards[i].style.transform = 'rotateY(360deg)';
        cards[i].innerHTML = '';
        done = 0;
        opened = 0;
    }

    for (i = 0; i < emodji.length; i++) {
        var card;
        var n;
        do {
            card = cards[n = Math.floor(Math.random() * 11)];
        } while (card.classList[2] !== undefined);

        card.classList.add(i.toString());

        do {
            card = cards[(n + Math.floor(Math.random() * 11)) % 12]
        } while (card.classList[2] !== undefined);

        card.classList.add(i.toString());
    }

    document.getElementsByClassName('alert')[0].style.display = 'none';
    document.getElementsByClassName('shadow')[0].style.display = 'none';

    intervalID = setInterval(function() {
        var time = Number(document.getElementsByClassName('minutes')[0].innerHTML) * 60 +
            Number(document.getElementsByClassName('seconds')[0].innerHTML);
        time--;
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        document.getElementsByClassName('minutes')[0].innerHTML = (min < 10 ? '0' : '') + min.toString();
        document.getElementsByClassName('seconds')[0].innerHTML = (sec < 10 ? '0' : '') + sec.toString();

        if (time === 0) {
            var shadow = document.getElementsByClassName('shadow')[0];
            shadow.style.display = 'block';
            var msg = document.getElementsByClassName('alert')[0];
            msg.style.display = 'block';
            msg.firstElementChild.innerHTML = 'Поражение...';
            clearInterval(intervalID);
        }
    }, 1000);
};

toggleClass = function(element) {
    var cards = document.getElementsByClassName('card');
    if (element.classList.contains('back')) {
        if (opened === 2) {
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].classList.contains('front') && !cards[i].classList.contains('done')) {
                    cards[i].style.transform = 'rotateY(360deg)';
                    cards[i].className = cards[i].classList[0] + ' back ' + cards[i].classList[2];
                    cards[i].innerHTML = '';
                }
            }
            opened = 0;
        }

        element.style.transform = 'rotateY(180deg)';
        element.className = element.classList[0] + ' front ' + element.classList[2];
        element.innerHTML = emodji[Number(element.classList[2])];
        opened++;

        if (opened === 2) {
            for (var j = 0; j < cards.length; j++) {
                if (cards[j].id !== element.id && cards[j].classList.contains('front') && (cards[j].classList[2] === element.classList[2])) {
                    done += 2;
                    cards[j].classList.add('done');
                    element.classList.add('done');
                    opened = 0;
                }
            }
        }
    }
    else if (!element.classList.contains('done')) {
        element.style.transform = 'rotateY(360deg)';
        element.className = element.classList[0] + ' back ' + element.classList[2];
        element.innerHTML = '';
        opened--;
    }

    if (done === 12) {
        var shadow = document.getElementsByClassName('shadow')[0];
        shadow.style.display = 'block';
        shadow.style.opacity = '1';
        var msg = document.getElementsByClassName('alert')[0];
        msg.style.display = 'block';
        msg.style.opacity = '1';
        msg.firstElementChild.innerHTML = 'Победа!';
        clearInterval(intervalID);
    }
};

