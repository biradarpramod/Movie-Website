let left_btn = document.getElementsByClassName('bi-arrow-left-square')[0];
let right_btn = document.getElementsByClassName('bi-arrow-right-square')[0];

let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let search_input = document.getElementById('search_input');

left_btn.addEventListener('click', () => {
  cards.scrollLeft -= 140;
});

right_btn.addEventListener('click', () => {
  cards.scrollLeft += 140;
});

let json_url = "movie.json";

fetch(json_url)
  .then(response => response.json())
  .then(data => {
    data.forEach((ele, i) => {
      let { name, imdb, date, sposter, bposter, genre, url } = ele;

      let card = document.createElement('a');
      card.classList.add('card');
      card.href = url;
      card.innerHTML = `
        <img src="${sposter}" alt="${name}" class="poster">
        <div class="rest_card">
          <img src="${bposter}" alt="">
          <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
              <p>${genre}, ${date}</p>
              <h3><span>IMDB</span><i class="bi bi-play-fill"></i>${imdb}</h3>
            </div>
          </div>
        </div>
      `;
      cards.appendChild(card);
    });

    if (data.length > 0) {
      document.getElementById('title').innerText = data[0].name;
      document.getElementById('gen').innerText = data[0].genre;
      document.getElementById('date').innerText = data[0].date;
      document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i> ${data[0].imdb}`;
    }

    // // Initialize search visibility
    // search.style.visibility = "hidden";
    // search.style.opacity = 0;

    // Search data load
    data.forEach(element => {
      let { name, imdb, date, sposter, genre, url } = element;
      let card = document.createElement('a');
      card.classList.add('card');
      card.href = url;
      card.innerHTML = `
        <img src="${sposter}" alt="${name}">
        <div class="cont">
          <h3>${name}</h3>
          <p>${genre}, ${date}, <span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</p>
        </div>
      `;
      search.appendChild(card);
    });

    // Search filter
    search_input.addEventListener('keyup', () => {
      let filter = search_input.value.toUpperCase();
      let a = search.getElementsByTagName('a');
      let hasVisibleMovies = false;
  
      for (let index = 0; index < a.length; index++) {
        let b = a[index].getElementsByClassName('cont')[0];
        let txtValue = b.textContent || b.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[index].classList.add('flex');
          hasVisibleMovies = true;
        } else {
          a[index].classList.remove('flex');
        }
      }
  
      if (search_input.value !== "" && hasVisibleMovies) {
        search.style.visibility = "visible";
        search.style.opacity = 1;
      } else {
        search.style.visibility = "hidden";
        search.style.opacity = 0;
      }
    });

    let video = document.getElementsByTagName('video')[0];
    let play = document.getElementById('play');

    play.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        play.innerHTML = `Play <i class="bi bi-pause-fill"></i></a>`;
      } else {
        video.pause();
        play.innerHTML = `Watch <i class="bi bi-play-fill"></i></a>`;
      }
    });

    let series = document.getElementById('series');
    let movies = document.getElementById('movies');

    series.addEventListener('click', () => {
      cards.innerHTML = '';

      let series_array = data.filter(ele => {
        return ele.type === "series";
      });

      series_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;

        let card = document.createElement('a');
        card.classList.add('card');
        card.href = url;
        card.innerHTML = `
          <img src="${sposter}" alt="${name}" class="poster">
          <div class="rest_card">
            <img src="${bposter}" alt="">
            <div class="cont">
              <h4>${name}</h4>
              <div class="sub">
                <p>${genre}, ${date}</p>
                <h3><span>IMDB</span><i class="bi bi-play-fill"></i>${imdb}</h3>
              </div>
            </div>
          </div>
        `;
        cards.appendChild(card);
      });
    })

    movies.addEventListener('click', () => {
      cards.innerHTML = '';

      let movies_array = data.filter(ele => {
        return ele.type === "movie";
      });

      movies_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;

        let card = document.createElement('a');
        card.classList.add('card');
        card.href = url;
        card.innerHTML = `
          <img src="${sposter}" alt="${name}" class="poster">
          <div class="rest_card">
            <img src="${bposter}" alt="">
            <div class="cont">
              <h4>${name}</h4>
              <div class="sub">
                <p>${genre}, ${date}</p>
                <h3><span>IMDB</span><i class="bi bi-play-fill"></i>${imdb}</h3>
              </div>
            </div>
          </div>
        `;
        cards.appendChild(card);
      });
    });
  });
