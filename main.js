let teachers;
let me;
ChooseTableType();
CreateTableFirstType(0, 10000000000000);
Header(true);
init();
ChooseMenuItem();
function init() {
    if (document.layers) document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = mousemove;
}
function mousemove(event) {
    let mouse_x = mouse_y = 0;
    if (document.attachEvent != null) {
        mouse_x = window.event.clientX;
        mouse_y = window.event.clientY;
    } else if (!document.attachEvent && document.addEventListener) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    }
    let  menu = document.getElementById('menu');
    if(mouse_x < 300){
        menu.style.transform = 'translate(0, 0)';
        menu.style.transition ='0.6s';
    }
    else{
        menu.style.transform = 'translate(-250px, 0)';
        menu.style.transition ='0.6s';
    }
}
function function2(){
    let search = document.getElementById('search-submit');
    search.onmousedown = function () {
        console.log('ggggg');
        document.addEventListener('keyup', (e) => {
            if(e.code === 'Enter'){
                console.log('ffff');
            }
        });
    }
}
function ChooseMenuItem(){
    let array = document.getElementsByClassName('item');
    let last = 0;
    for (let i = 0; i < array.length; i++) {
        let y = array[i];
        array[i].onmouseover = function () {
            y.style.background = "rgba(101,108,103,0.29)";
            y.style.transition = '0.6s';
            y.style.paddingLeft = '50px';

        };
        array[i].onmouseout = function () {
            y.style.background = "rgba(218,222,216,0.29)";
            y.style.transition = '0.6s';
            y.style.paddingLeft = '20px';
        };
        array[i].onmousedown = function () {
            switch (i) {
                case 0:
                    let tbg = document.getElementById('tableid');
                    let signin = document.getElementById('signin');
                    tbg.style.zIndex = '100000';
                    signin.style.zIndex = '0';
            }
        }
    }
}
function Header(bool) {
    if(bool){
        let header = document.getElementById('header');
        let button = document.createElement('input');
        button.type = 'button';
        button.value = 'войти';
        button.style.height = '40px';
        button.style.width = '100px';
        button.className = 'button_for_login_in_the_header';
        let x = (header.clientWidth - 100)/2;
        let y = (header.clientHeight - 40)/2;
        button.style.transform = `translate(${x}px, ${y}px)`;
        button.onmousedown = function(){
            button.style.boxShadow = '0 0 0 3px #eeeeee';
            button.style.color = 'white';
            button.style.transition = '0s';
            let tbg = document.getElementById('tableid');
            let signin = document.getElementById('signin');
            tbg.style.zIndex = '0';
            signin.style.zIndex = '1000000';
        };
        button.onmouseup = function(){
            button.style.background = "rgba(101,108,103,0.29)";
            button.style.boxShadow = '0 0 0 3px #3d4752';
            button.style.color = 'black';
            button.style.transition = '0s'
        };
        button.onmouseover = function(){
            button.style.background = "rgba(101,108,103,0.29)";
            button.style.boxShadow = '0 0 0 3px #3d4752';
            button.style.transition = '0.6s'
        };
        button.onmouseout = function(){
            button.style.background = "rgba(187,195,190,0.29)";
            button.style.boxShadow = '0 0 0 0px #3d4752';
            button.style.transition = '0.6s'
        };
        button.appendChild(document.createTextNode('Войти'));
        header.appendChild(button);
    }
    else{
        let header = document.getElementById('header');
        if(header.children[0].className === 'button_for_login_in_the_header'){
            header.removeChild(header.children[0]);
            let name = document.createElement('div');
            let exit = document.createElement("div");
            exit.style.margin = '10px';
            name.appendChild(document.createTextNode(me.fio));
            name.style.fontSize = '25px';
            name.style.textAlign = 'center';
            exit.appendChild(document.createTextNode('Выход'));
            header.appendChild(exit);
            header.appendChild(name );
        }

    }
}
function ChooseTableType() {
    let g1 = document.getElementById('g1');
    let g2 = document.getElementById('g2');
    let g3 = document.getElementById('g3');
    let g4 = document.getElementById('g4');
    let block = document.getElementById("blockid");
    block.style.background = "rgba(187,195,190,0.29)";
    let array = [g1, g2, g3, g4];
    let last = 0;
    for (let i = 0; i < array.length; i++) {
        array[i].style.transform = `translate(${i * 100}%, 0)`;
        let j = array[i].getBoundingClientRect().x - block.getBoundingClientRect().x;
        array[i].onmouseover = function () {
            block.style.transform = `translate(${j}px, 0)`;
            block.style.background = "rgba(101,108,103,0.29)";
            block.style.transition = '0.6s'
        };
        array[i].onmouseout = function () {
            block.style.transform = `translate(${last}px, 0)`;
            block.style.background = "rgba(187,195,190,0.29)";
            block.style.transition = '0.6s';
        };
        array[i].onmousedown = function () {
            last = j;
            let tbl = document.getElementsByClassName("table");
        }
    }
}
function login() {
    let login = document.getElementById("log").value;
    let pass = document.getElementById("pass").value;
    if (!(login && pass)) {
        login = 'awdrgy';
        pass = 'Grudinka2003';
    }
    let con = new XMLHttpRequest();
    if (login && pass) {
        con.open('GET', `http://shproj2020.herokuapp.com/login?username=${login}&password=${sha256(pass)}`, false);
        con.withCredentials = true;
        con.send();
        con = new XMLHttpRequest();
        con.open('GET', `http://shproj2020.herokuapp.com/get_prs_id`, false);
        con.withCredentials = true;
        con.send();
        me = teachers[con.response];
        Header(false);
    }
}

function getReservations(starttime, endtime) {
    let con = new XMLHttpRequest();
    con.open('GET', `http://shproj2020.herokuapp.com/schedule?startTime=${starttime}&endTime=${endtime}`, false);
    con.send();
    console.log(con.response);
    let response = JSON.parse(con.response);
    console.log(response.length);
    return response;
}

function getTeachers() {
    let con = new XMLHttpRequest();
    con.open('GET', `http://shproj2020.herokuapp.com/get_teacher_list`, false);
    con.send();
    let response1 = JSON.parse(con.response);
    let teachers = [];
    console.log("teachers: " + response1.length);
    for (let i = 0; i < response1.length; i++) {
        teachers[response1[i].prsId] = response1[i];
    }
    return teachers;
}

class Reservation {
    constructor(jn) {
        this.reservationId = jn.reservationId;
        this.classNumber = jn.classNumber;
        this.teacherId = jn.teacherId;
        this.reason = jn.reason;
        this.startTime = jn.startTime;
        this.endTime = jn.endTime;
        this.customerId = jn.customerId;
        if (this.customerId === 0) {
            this.customerId = this.teacherId;
        }
    }
}

class Teacher {
    constructor(jn) {
        this.prsId = jn.prsId;
        this.fio = jn.fio;
        this.anotherInfo = jn.anotherInfo;
        this.admin = jn.admin;
    }
}

function CreateTableFirstType(start, end) {
    let reservations = getReservations(start, end);
    console.log("reservations: " + reservations.length);
    teachers = getTeachers();
    let tbl = document.getElementsByClassName("table");
    let tbdy = document.createElement('tbody');
    for (let i = -1; i < reservations.length; i++) {
        let tr = document.createElement('tr');
        tr.style.border = '0';
        let array;
        if (i === -1) {
            array = ["кабинет", "учитель", "причина"];
        } else {
            array = [reservations[i].classNumber, teachers[reservations[i].teacherId].fio, reservations[i].reason];
        }
        for (let j = 0; j < array.length; j++) {
            let td = document.createElement('td');
            td.style.border = '0';
            let text = document.createTextNode(array[j]);
            td.appendChild(text);
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl[0].appendChild(tbdy);
}

function f() {
    let button = document.getElementById('button');
    button.onmousedown = function(){
        button.style.boxShadow = '0 0 0 3px #eeeeee';
        button.style.color = 'white';
        button.style.transition = '0s';
        tbg.style.zIndex = '0';
        signin.style.zIndex = '1000000';
    };
    button.onmouseup = function(){
        button.style.background = "rgba(101,108,103,0.29)";
        button.style.boxShadow = '0 0 0 3px #3d4752';
        button.style.color = 'black';
        button.style.transition = '0s'
    };
    button.onmouseover = function(){
        button.style.background = "rgba(101,108,103,0.29)";
        button.style.boxShadow = '0 0 0 3px #3d4752';
        button.style.transition = '0.6s'
    };
    button.onmouseout = function(){
        button.style.background = "rgba(187,195,190,0.29)";
        button.style.boxShadow = '0 0 0 0px #3d4752';
        button.style.transition = '0.6s'
    };
}