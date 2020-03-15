function cl() {
    let login = document.getElementById("log").value;
    let pass = document.getElementById("pass").value;
    if(!(login && pass)) {
        login = 'awdrgy';
        pass = 'Grudinka2003';
    }
    let datastart = 0;
    let dataend = 1000000000000000;
    let con = new XMLHttpRequest();
    if (login && pass) {

        con.open('GET', `http://shproj2020.herokuapp.com/login?username=${login}&password=${sha256(pass)}`, false);
        con.send();

        con = new XMLHttpRequest();
        con.open('GET',`http://shproj2020.herokuapp.com/schedule?startTime=${datastart}&endTime=${dataend}`, false );
        con.send();
        console.log(con.response);
        let response = JSON.parse(con.response);
        let reservations = [];
        for (let i = 0; i < response.length; i++) {
            reservations.push(new Reservation(response[i]));
        }

        con = new XMLHttpRequest();
        con.open('GET', `http://shproj2020.herokuapp.com/get_teacher_list`, false);
        con.send();
        console.log(con.response);
        let response1 = JSON.parse(con.response);
        let teachers = [];
        console.log(response1.length);
        for (let i = 0; i < response1.length; i++) {
            teachers.push(new Teacher(response1[i]));
        }

        console.log(teachers.length);
    }
}

class Reservation{
    constructor(jn) {
        this.reservationId = jn.reservationId;
        this.classNumber = jn.classNumber;
        this.teacherId = jn.teacherId;
        this.reason = jn.reason;
        this.startTime = jn.startTime;
        this.endTime = jn.endTime;
        this.customerId = jn.customerId;
        if(this.customerId === 0){
            this.customerId = this.teacherId;
        }
    }
}
class Teacher{
    constructor(jn) {
        this.prsId = jn.prsId;
        this.fio = jn.fio;
        this.anotherInfo = jn.anotherInfo;
        this.admin = jn.admin;
    }
}