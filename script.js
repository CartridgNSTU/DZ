
// jquery ui 
$(document).ready(function() {

   $("#tabs").tabs();

});




// jquery

let students = []
let id_current = 0

function load_from_site() {
  let xhr = new XMLHttpRequest();
  xhr.open ('Get', 'http://217.71.129.139:4003/students.php');
  xhr.send();

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert ('Oшибка ${xhr.status}: ${xhr.statusText}');
    }
    else {

        students = JSON.parse(xhr.responseText)['response']
    }
  }
    
    xhr.onerror = function () {
      alert("Запрос не удался");
    };
}



let mas_group = new Array()
function data_upload(){

    let tr = document.getElementById('tr')
    
    for (let i = 0; i < students.length; i++){
        let group =  students[i].group
        if  (mas_group.indexOf(group) == -1){
          mas_group.push(group) 
          let th = document.createElement('th')
          let btn = document.createElement('button')
          btn.textContent = group
          th.appendChild(btn)
          tr.appendChild(th)
          btn.classList.add(group)
          btn.classList.add("btn_group")

  }

  }
  
}

function student_loading(){
  let btn_group = document.querySelectorAll('.btn_group')
btn_group.forEach.call(btn_group,function(el){
  el.addEventListener('click',function(el){
      this.classList.add('student_loading')
      let thead = document.getElementById('thead')
      var student_container = $('.student_loading').text();
      $('.remove').remove();
      for (let i = 0; i < students.length; i++){
        let group =  students[i].group
        let id =  students[i].id
        let name =  students[i].name
        let surname =  students[i].surname
        let scores =  students[i].scores
        if (student_container == group){
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        td1.textContent = id
        td2.textContent = name
        td3.textContent = surname
        td4.textContent = scores
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        thead.appendChild(tr)
        tr.classList.add('remove')
      }
    }
    this.classList.remove('student_loading')
  })
})
}

