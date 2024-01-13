let h = 0;
let m = 0;
let sec = 0;
let hour = document.querySelector("#hour");
let minut = document.querySelector("#min");
let second = document.querySelector("#sec");

const setbtn = document.querySelector("#setbtn");

const timers = document.querySelector("#Timers");

setbtn.addEventListener('click',set)

let formid = 1;
let taskdivid = 1;
function set(event){
    event.preventDefault()

    let div = document.createElement("div");
    div.classList.add("taskdiv");
    let divid = `task${taskdivid++}`;
    div.id = divid;

    let form = document.createElement("form");
    let fid = `form${formid++}`;
    form.id=fid;
    creatinput(form);
    // console.log(form);
    div.appendChild(form);
    timers.appendChild(div);

    hour.value = "00";
    minut.value = "00";
    second.value = "00";
    
}

function creatinput(form){
    let input = document.createElement("input");
    input.classList.add("hour");
    input.readOnly = true;
    input.value = (Number.parseInt(hour.value));

    let input1 = document.createElement("input");
    input1.classList.add("minute");
    input1.readOnly = true;
    input1.value = Number.parseInt(minut.value);

    let input2 = document.createElement("input");
    input2.classList.add("sec");
    input2.value = Number.parseInt(second.value);
    input2.readOnly = true;

    let btn = document.createElement("button");
    btn.classList.add("delbtn");
    btn.innerText = "Delete";
    btn.addEventListener("click",del);

    form.append(input,input1,input2,btn);
    // Decrease the time every second
    const intervalId = setInterval(() => {
        let hours = Number.parseInt(input.value);
        let minutes = Number.parseInt(input1.value);
        let seconds = Number.parseInt(input2.value);
        
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }
        
            input.value = String(hours).padStart(2, '0');
            input1.value = String(minutes).padStart(2, '0');
            input2.value = String(seconds).padStart(2, '0');
        
    }, 1000);

    // Store the intervalId as a property of the form to clear it later
    form.intervalId = intervalId;

    return form;
}

function del(e){
    e.preventDefault();
    let parent = e.target.parentNode.parentNode;
    


    clearInterval(parent.intervalId);

    timers.removeChild(parent);
    
}
