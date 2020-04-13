ChooseTableType();
CreateTableFirstType(0, 10000000000000);

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
        console.log(j);
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
            CreateTableFirstType(0, 10000000000000);
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
        con.send();
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
    console.log(con.response);
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
    let teachers = getTeachers();
    let tbl = document.getElementsByClassName("table");

    let date = new Date();


    let tbdy = document.createElement('tbody');
    for (let i = -1; i < reservations.length; i++) {
        let tr = document.createElement('tr');
        let array;
        if (i === -1) {
            array = ["кабинет", "учитель", "причина"];
        } else {
            array = [reservations[i].classNumber, teachers[reservations[i].teacherId].fio, reservations[i].reason];
        }
        console.log(array);
        for (let j = 0; j < array.length; j++) {
            let td = document.createElement('td');
            let text = document.createTextNode(array[j]);
            td.appendChild(text);
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl[0].appendChild(tbdy);
}

function f() {

}