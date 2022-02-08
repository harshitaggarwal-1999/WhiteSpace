let optionsCont = document.querySelector(".options-cont");
let optionFlag = true;

let toolsCont = document.querySelector(".tools-cont");

let pencilToolCont = document.querySelector(".pencil-tool-cont");
let pencil = document.querySelector(".pencil");
let pencilToolContFlag = false;
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let eraser = document.querySelector(".eraser");
let eraserToolContFlag = false;


optionsCont.addEventListener("click", (e) => {
    //true -> tools show , false -> tools hide
    optionFlag = !optionFlag;
    if(optionFlag){
        opentools();
    }else{
        closetools();
    }   
})

function opentools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");

    toolsCont.style.display = "flex";

}

function closetools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");

    toolsCont.style.display = "none";
    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
    // true ->  show pencil tool cont, false -> hide pencil tool cont
    pencilToolContFlag = !pencilToolContFlag;

    if(pencilToolContFlag){
        pencilToolCont.style.display = "block";
    } else {
        pencilToolCont.style.display = "none";
    }
})

eraser.addEventListener("click", (e) => {
    // true ->  show pencil tool cont, false -> hide pencil tool cont
    eraserToolContFlag = !eraserToolContFlag;

    if(eraserToolContFlag){
        eraserToolCont.style.display = "flex";
    } else {
        eraserToolCont.style.display = "none";
    }
})

