import './styles/main.scss';
('use strict');

const cardsCortainer = document.querySelector('.cards__wrapper');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu__list');
const moreBtn = document.querySelector('.cards__btn');
const allNewPosts = [];
let postsToDraw = [];

const drawCards = (arr) => {
  cardsCortainer.innerHTML = '';
  arr.forEach((card) => {
    cardsCortainer.innerHTML += `
            <div class="card">
                <div class="card__pic">
                    <img class="card__img" alt="" src='${card.img}'>
                </div>
                <div class="card__info">
                    <div class="card__main">
                        <h4 class="card__title">${card.title}</h4>
                        <div class="card__subtitle">
                            ${card.subtitle}
                        </div>
                        <p class="card__desc">${card.desc}</p>
                        <p class="card__date">Posted by <strong>Evgeniya</strong>, on ${card.postedOn}</p>
                    </div>
                    <a href=${card.link} class="card__btn">Continue reading</a>
                </div>
            </div>
        `;
  });
};

const toggleMenu = () => {
  menu.classList.toggle('active');
  burger.classList.toggle('active');
  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }
};

function getRandomImg() {
  const num = Math.floor(Math.random() * 9);
  return `/images/img${num + 1}.jpg`;
}

const getPosts = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error while fetching posts');
      }
      return response.json();
    })
    .then((posts) => {
      posts = posts.map((post) => ({
        id: post.id,
        img: getRandomImg(),
        subtitle: post.body,
        desc: post.title,
        postedOn: 'July 24, 2019',
        link: '/',
        title: post.title,
      }));
      allNewPosts.push(...posts);
      postsToDraw = allNewPosts.slice(0, 10);
      drawCards(postsToDraw);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

getPosts();

const addPosts = () => {
  const ind = postsToDraw.length;
  const nextPosts = allNewPosts.slice(ind, ind + 5);
  postsToDraw.push(...nextPosts);
  if (postsToDraw.length === 30) {
    getMore.style.display = 'none';
  }
  drawCards(postsToDraw);
};

burger.addEventListener('click', toggleMenu);
moreBtn.addEventListener('click', addPosts);
