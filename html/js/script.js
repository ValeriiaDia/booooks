// КАРТА
navigator.geolocation.getCurrentPosition(function (position) {
    coords = position.coords;
    console.log(coords);
  
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
  
    let map = new ol.Map({ //создаем карту из библиотеки OpenLayers
      target: 'map', //указываем id контейнера для карты
      layers: [ //создаем массив, в котором указываем источник данных для карты
        new ol.layer.Tile({
          source: new ol.source.OSM() // наша карта берет данные из OpenStreetMap
        })
      ],
      view: new ol.View({ // настройка внешнего вида карты
        center: ol.proj.fromLonLat([longitude, latitude]), //широта и долгота
        zoom: 10 //увеличение
      })
    });
  });
  
  //  МЕНЮ
  let condition = true;
  let start = 0;
  let end = 0;
  
  function forward() {
    anime({
      targets: '.menu-small',
      translateX: ['-150%', '-50%'],
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 1000,
      loop: false
    });
  
    anime({
      targets: '.menu_small_icon',
      rotate: 90,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 1000,
      loop: false
    });
  
    anime({
      targets: '.stick',
      rotate: 180,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 1000,
      loop: false
    });
    condition = false;
  }
  
  function backward() {
    anime({
      targets: '.menu-small',
      translateX: ['-50%', '-150%'],
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 1000,
      loop: false
    });
  
    anime({
      targets: '.menu_small_icon',
      rotate: 0,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 1000,
      loop: false
    });
  
    anime({
      targets: '.stick',
      rotate: 0,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 1000,
      loop: false
    });
    condition = true;
  }
  
  $('.menu_small_icon').on('click', function () {
    if (condition) {
      forward();
    }
    else {
      backward();
    }
  });
  
  $('.container').on('touchstart', function (event) {
    start = event.originalEvent.touches[0].pageX;
  })
  
  $('.container').on('touchend', function (event) {
    end = event.originalEvent.changedTouches[0].pageX;
    if (end - start >= 100 && condition) {
      forward();
    }
    else if (start - end >= 100 && !condition) {
      backward();
    }
  })
  
  // ИГРА
  let cvs = document.querySelector(".canvas");
  let ctx = cvs.getContext("2d");
  let pikachu = document.createElement('img');//создаем виртуальный тег <img>
  pikachu.src = "images/pokemon.png"; //добавляем источник картинки
  let xPos = 350; //координата Х картинки
  let yPos = 300; //координата У картинки
  
  function draw() {
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(pikachu, xPos, yPos);
    window.requestAnimationFrame(draw);
  }
  
  function pos() {
    if (xPos >= 800) { xPos = -70; }
    if (xPos <= -80) { xPos = 790; }
    if (yPos >= 400) { yPos = -70; }
    if (yPos <= -80) { yPos = 390; }
  }
  
  window.addEventListener('load', draw);
  
  window.addEventListener('keydown', function (event) {
    if (event.code == 'KeyA' || event.key == 'ArrowLeft') { xPos -= 10; }
    if (event.code == 'KeyD' || event.key == 'ArrowRight') { xPos += 10; }
    if (event.code == 'KeyW' || event.key == 'ArrowUp') { yPos -= 10; }
    if (event.code == 'KeyS' || event.key == 'ArrowDown') { yPos += 10; }
    if (event.key == 'Enter') {
      xPos = Math.random() * (740);
      yPos = Math.random() * (330);
    }
    pos();
  });
  
  var area = document.getElementById('area');
  var cell = document.getElementsByClassName('cell');
  var currentPlayer = document.getElementById('curPlyr');
  
  var player = "x";
  var stat = {
    'x': 0,
    'o': 0,
    'd': 0
  }
  var winIndex = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  
  for (var i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
  }
  
  for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
  }
  
  function cellClick() {
  
    var data = [];
  
    if (!this.innerHTML) {
      this.innerHTML = player;
    } else {
      alert("Ячейка занята");
      return;
    }
  
    for (var i in cell) {
      if (cell[i].innerHTML == player) {
        data.push(parseInt(cell[i].getAttribute('pos')));
      }
    }
  
    if (checkWin(data)) {
      stat[player] += 1;
      restart("Выграл: " + player);
    } else {
      var draw = true;
      for (var i in cell) {
        if (cell[i].innerHTML == '') draw = false;
      }
      if (draw) {
        stat.d += 1;
        restart("Ничья");
      }
    }
  
    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
  }
  
  function checkWin(data) {
    for (var i in winIndex) {
      var win = true;
      for (var j in winIndex[i]) {
        var id = winIndex[i][j];
        var ind = data.indexOf(id);
  
        if (ind == -1) {
          win = false
        }
      }
  
      if (win) return true;
    }
    return false;
  }
  
  function restart(text) {
  
    alert(text);
    for (var i = 0; i < cell.length; i++) {
      cell[i].innerHTML = '';
    }
    updateStat();
  }
  
  function updateStat() {
    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    document.getElementById('sD').innerHTML = stat.d;
  }