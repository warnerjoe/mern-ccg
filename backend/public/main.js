// main.js
const update = document.querySelector('#update-button');

update.addEventListener('click', _ => {
    fetch('/cards', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Darth Vader',
          quote: 'I find your lack of faith disturbing.',
        })
    });
});

