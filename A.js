function cl(){
    var login = document.getElementById("log").value;
    var pass = document.getElementById("pass").value;
    alert(login + " " + pass);
    var con = new XMLHttpRequest();
    if(login && pass){
        minAjax({
    url:"shproj2020.herokuapp.com/login",//request URL
    type:"GET",//Request type GET/POST
    //Send Data in form of GET/POST
    data:{
      urername: login,
        password: pass
    },
    //CALLBACK FUNCTION with RESPONSE as argument
    success: function(data){
      alert(data);
    }

  });
    }
}