// Game 
// 22.11.2022

let $start = document.querySelector("#start")
let $game = document.querySelector("#game")
let $time = document.querySelector("#time")
let $game_time = document.querySelector("#game-time")
let $time_header = document.querySelector("#time-header")
let $result_header = document.querySelector("#result-header")
let $result = document.querySelector("#result")
let $login = document.querySelector("#login")
let $appPage = document.querySelector(".app")
let $loginPage = document.querySelector(".login")
let $nameUser = document.querySelector("#nameUser")
let $list = document.querySelector(".list")





let score = 0
let user = {}
let list = []
let check = false
$start.addEventListener('click', clicked)

function clicked() {
    if(Object.keys(user).length>0){     //user != {} user.name ==undefined
        check = true
    }
    list = getData("listUsers")
    score = 0;
    $start.classList.add('hide')
    $game.style.backgroundColor = "white";
    createBox();
    timer();
    setTime()
    $game_time.setAttribute("disabled", " true")
    toggle($time_header, $result_header)
}


function createBox() {

    $game.innerHTML = ""
    let box = document.createElement('div')
    box.style.backgroundColor = `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)})`
    box.style.cursor = "pointer"
    box.style.position = "absolute"
    let boxSize = getRandom(30, 100)
    let left = getRandom(0, 300 - boxSize);
    let top = getRandom(0, 300 - boxSize);
    box.style.width = box.style.height = boxSize + "px"
    box.style.left = left + "px";
    box.style.top = top + "px";
    box.setAttribute("data-box", "true")
    $game.insertAdjacentElement("afterbegin", box)
}

let result = 0
$game.addEventListener("click", clickedBox)
function clickedBox(event) {
    if (event.target.dataset.box) {
        createBox()
        score++
    }

}
function timer() {
    let interval = setInterval(function () {
        $time.textContent = ($time.textContent - 0.1).toFixed(1)
        if ($time.textContent <= 0.0) {
            clearInterval(interval)
            end();
        }
    }, 80)
}
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function end() {
    $start.classList.remove('hide')
    $game.style.backgroundColor = "#ccc";
    $game.innerHTML = "";
    $game_time.removeAttribute("disabled")
    $result.textContent = score;
    toggle($result_header, $time_header)
    checkUser()

}
function checkUser(){
    if(check == true){
        list=getData("listUsers")
        if(list[list.length-1].score < score){
            list.pop()
            login()
            showUsers()
        }
        
    }else{
        login()
        showUsers()
    }
}

$game_time.addEventListener('change', setTime)
function setTime() {
    $time.textContent = $game_time.value
    toggle($time_header, $result_header)
}


function toggle(first, second) {
    first.classList.remove("hide")
    second.classList.add("hide")
}

$login.addEventListener("click", function () {
    toggle($appPage, $loginPage)
})

function login() {
    user.name = $nameUser.value
    user.score = score
    list.push(user)
    sendData(list)
}

function showUsers() {
    $list.innerHTML=""
    list = getData("listUsers")
    // list.sort(function(a,b){
    //     return true
    // });
    list.sort(function (a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
    console.log(list);
    list.forEach(function(elem,index) {
        if (index > 9){
            return true
        }
        $list.insertAdjacentHTML('beforeend', `
        <div class="user">
        ${elem.name} ----${elem.score}
        </div>`)
    })

}
console.log(localStorage[name])

function sendData(data) {
    localStorage.setItem("listUsers", JSON.stringify(data))
}
function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}

function setLocal() {
    sendData([])
}
// function compare(a, b) {
//     if (a меньше b по некоторому критерию сортировки) {
//       return -1;
//     }
//     if (a больше b по некоторому критерию сортировки) {
//       return 1;
//     }
//     // a должно быть равным b
//     return 0;
//   }


let list2 = [1,{age:5.5},6,8,{heihgt:4},5,7,88,22,10,62] ;