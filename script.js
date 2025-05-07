const browserInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
};
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

// 1.
const footer = document.createElement('footer');
footer.style.marginTop = '30px';
footer.style.padding = '15px';
footer.style.backgroundColor = '#c4c3a7';
footer.innerHTML = `<pre>${JSON.stringify(browserInfo, null, 2)}</pre>`;
document.body.appendChild(footer);

// 2.
fetch('https://jsonplaceholder.typicode.com/posts/17/comments')
    .then(response => response.json())
    .then(comments => {
        const commentsSection = document.createElement('div');
        commentsSection.innerHTML = '<h3>Коментарі роботодавців</h3>';
        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
            commentBlock.style.marginBottom = '10px';
            commentsSection.appendChild(commentBlock);
        });
        document.querySelector('.container').appendChild(commentsSection);
    });

// 3.
setTimeout(() => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.innerHTML = `
        <form action="https://formspree.io/f/mgvkedjp" method="POST" style="background: white; padding: 20px; border-radius: 10px;">
            <h3>Відгукніться на це резюме</h3>
            <input name="name" placeholder="Ім’я" required><br><br>
            <input name="email" type="email" placeholder="Email" required><br><br>
            <input name="phone" type="tel" placeholder="Номер телефону"><br><br>
            <textarea name="message" placeholder="Ваше повідомлення" required></textarea><br><br>
            <button type="submit">Відправити</button>
        </form>
    `;
    document.body.appendChild(modal);
}, 60000);

// Кнопка перемикання теми 
const themeToggle = document.createElement('button');
themeToggle.style.position = 'absolute';
themeToggle.style.top = '20px';
themeToggle.style.right = '30px';
themeToggle.style.background = 'transparent';
themeToggle.style.border = 'none';
themeToggle.style.fontSize = '26px';
themeToggle.style.cursor = 'pointer';
themeToggle.style.color = '#333';
themeToggle.title = 'Перемкнути тему';

const container = document.querySelector('.container');
container.style.position = 'relative';
container.appendChild(themeToggle);

// 4.
function applyTheme(isNight) {
    const footer = document.querySelector('footer');
    const pre = footer.querySelector('pre');

    if (isNight) {
        document.body.style.backgroundColor = '#2c3e50';
        container.style.backgroundColor = '#3b3b3b';
        document.body.style.color = '#ffffff';
        themeToggle.textContent = '🌓';
        themeToggle.style.color = '#ffffff';

        if (footer && pre) {
            footer.style.backgroundColor = '#2c3e50';
            pre.style.color = '#ffffff';
        }

        document.querySelectorAll('h1, h2, h3, strong').forEach(el => {
            el.style.color = '#dcdcdc';
        });
    } else {
        document.body.style.backgroundColor = '#c4c3a7';
        container.style.backgroundColor = '#f5f4d0';
        document.body.style.color = '#333';
        themeToggle.textContent = '🌞';
        themeToggle.style.color = '#333';

        if (footer && pre) {
            footer.style.backgroundColor = '#c4c3a7';
            pre.style.color = '#2c3e50';
        }

        document.querySelectorAll('h1, h2, h3, strong').forEach(el => {
            el.style.color = '#2c3e50';
        });
    }
}


themeToggle.onclick = () => {
    const isNightNow = document.body.style.backgroundColor === 'rgb(44, 62, 80)';
    applyTheme(!isNightNow);
};

const hour = new Date().getHours();
applyTheme(hour < 7 || hour >= 21);