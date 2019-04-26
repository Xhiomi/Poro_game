//Constantes y variables
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')
var intervalo
var enemies = [];
var frames = 0
var poro = "http://apollo-na-uploads.s3.amazonaws.com/1439686997/Poro.png"
var fondo = "https://vignette.wikia.nocookie.net/leagueoflegends/images/5/53/Summoner%27s_Rift_Update_Map.png/revision/latest?cb=20170223053555"
const facil = document.getElementById('facil')
const intermedio = document.getElementById('intermedio')
const avanzado = document.getElementById('avanzado')
const nivelDios = document.getElementById('nivel-dios')
const contenedorBotones = document.querySelector('.contenedor-botones')
const canvasDiv = document.querySelector('canvas-css')
//Primero la x, luego la y, el ancho y el alto
//ctx.fillStyle = "red"
//ctx.fillRect(0, 0, 512, 512)

//Variables
// var poroLink = "http://apollo-na-uploads.s3.amazonaws.com/1439686997/Poro.png"
// var imagen = new Image()
// imagen.src = porooLink
// imagen.onload = function(){
//   ctx.drawImage(imagen, 0, 0, 50, 50)
// }
//
// var x = 0
// setInterval(function(){
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   ctx.drawImage(imagen, x, 0, 50, 50)
//   x++
//   if(x>canvas.width - 50) x = 0
// }, 1000/60
// )

//http://apollo-uploads-las.s3.amazonaws.com/1437177167/mapa2.jpg

//Ocultar contenedor de botones
//canvas.classList.add('hidden');

// function canvasSize(text, fontSize) {
//   fontSize = 10vw;
//   canvas.width = ctx.measureText(text).width;
//   canvas.height = fontSize*1.3;
// }

//Constructores
function Background(){
  this.x = 0
  this.y = 0
  this.width = canvas.width
  this.height = canvas.height
  this.imagen = new Image()
  this.imagen.src = fondo
  this.imagen.onload = function(){
    this.draw()
  }.bind(this)

  this.draw = function(){
    ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
  }
}

function Heroe(){
  this.x = 0
  this.y = canvas.height - 50
  this.width = 50
  this.height = 50
  this.imagen = new Image()
  this.imagen.src = poro
  this.imagen.onload = function(){
      this.draw()
  }.bind(this)

  this.draw = function(){
  if(this.x < 0) this.x = 0
  if(this.x > canvas.width) this.x = canvas.width - 8
      ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
  }

  this.checkIfTouch = function(enemy){
  return (this.x < enemy.x + enemy.width) &&
         (this.x + this.width > enemy.x) &&
         (this.y < enemy.y + enemy.height) &&
         (this.y + this.height > enemy.y);
  }
}

function Enemy(x){
  this.x = x
  this.y = 0
  this.width = 50
  this.height = 50
  this.imagen = new Image()
  this.imagen.src = "https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e0/Teemo_OmegaSquad_%28Obsidian%29.png"
  this.imagen.onload = function(){
    this.draw()
  }.bind(this)

  this.draw = function(){
    this.y++
    ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
  }
}

//instancias
var board = new Background()
var poro = new Heroe()
var enemy1 = new Enemy(0)
var enemy2 = new Enemy(128)
var enemy3 = new Enemy(384)

//main functions
function update(){
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.draw()
  poro.draw()
  enemy1.draw()
  generateEnemy()
  drawEnemies()
  checkCollition()
}

facil.addEventListener("click", function(event){
  function startFacil(){
    intervalo = setInterval(update, 1000/125)
  }
  contenedorBotones.classList.add('hidden')
  canvas.classList.remove('hidden')
  startFacil()
});

intermedio.addEventListener("click", function(event){
  function startintermedio(){
    intervalo = setInterval(update, 1000/250)
  }
  contenedorBotones.classList.add('hidden')
  canvas.classList.remove('hidden')
  startintermedio()
});

avanzado.addEventListener("click", function(event){
  function startAvanzado(){
    intervalo = setInterval(update, 1000/500)
  }
  contenedorBotones.classList.add('hidden')
  canvas.classList.remove('hidden')
  startAvanzado()
});

nivelDios.addEventListener("click", function(event){
  function startDios(){
    intervalo = setInterval(update, 1000/1000)
  }
  contenedorBotones.classList.add('hidden')
  canvas.classList.remove('hidden')
  startDios()
});

//Play again and click listener
function gameOverTwo(){
  ctx.font = "50px Avenir"
  ctx.fillStyle = "white"
  ctx.fillText('Press to play again', 250, 150)
  canvas.addEventListener("click", function(event){
    location.reload(true)
  })
}

//Game over text
function gameOver(){
  clearInterval(intervalo)
  ctx.font = "100px Avenir"
  ctx.fillStyle = "white"
  ctx.fillText('GAME OVER', 125, 100)
  gameOverTwo()
}

//Generating enemies all over the with of canvas
function generateEnemy(){
  if(frames % 100 === 0){
      var x = Math.floor(Math.random() * 600)
      enemies.push(new Enemy(x))
  }
}

//Drowing enemies
function drawEnemies(){
    enemies.forEach(function(enemy){
        enemy.draw()
    })
}

//Function for collition
function checkCollition(){
    enemies.forEach(enemy=>{
        if(poro.checkIfTouch(enemy)){
            gameOver()
        }
    })
}

//Listener for the arrows
addEventListener("keydown", function(event){
  if(event.keyCode === 37 && poro.x > 0) poro.x -= 50
  if(event.keyCode === 39 && poro.x + 50 < canvas.width) poro.x += 50
  if(event.keyCode === 38 && poro.y > 0) poro.y -= 50
  if(event.keyCode === 40 && poro.y + 50 < canvas.width) poro.y += 50
})
