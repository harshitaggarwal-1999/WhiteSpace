let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let optionFlag = true;


let pencilToolCont = document.querySelector(".pencil-tool-cont");
let pencil = document.querySelector(".pencil");
let pencilToolContFlag = false;
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let eraser = document.querySelector(".eraser");
let eraserToolContFlag = false;

let sticky = document.querySelector(".notes");
let upload = document.querySelector(".upload");

optionsCont.addEventListener("click", (e) => {
    //true -> tools show , false -> tools hide
    optionFlag = !optionFlag;
    if (optionFlag) {
        opentools();
    } else {
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

    if (pencilToolContFlag) {
        pencilToolCont.style.display = "block";
    } else {
        pencilToolCont.style.display = "none";
    }
})

eraser.addEventListener("click", (e) => {
    // true ->  show pencil tool cont, false -> hide pencil tool cont
    eraserToolContFlag = !eraserToolContFlag;

    if (eraserToolContFlag) {
        eraserToolCont.style.display = "flex";
    } else {
        eraserToolCont.style.display = "none";
    }
})

upload.addEventListener("click", (e) => {

    // open input file by choosing it from in-device documents
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = ` <div class="sticky-header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="sticky-note-cont">
        <img src = "${url}"/>
        </div>
        `;
        createSticky(stickyTemplateHTML);

    })
})

sticky.addEventListener("click", (e) => {
    // console.log("sticky clicked!!");

    let stickyTemplateHTML = ` <div class="sticky-header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="sticky-note-cont">
            <textarea></textarea>
        </div>
    `;

    createSticky(stickyTemplateHTML);
})

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML

    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");

    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        if (event.target.classList.contains("remove") || event.target.classList.contains("minimize"))
            return;
        else
            dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}
function noteActions(minimize, remove, stickyCont) {
    // console.log("notes actions called!!");
    remove.addEventListener("click", (e) => {
        // console.log("close pressed");
        stickyCont.remove();
    });

    minimize.addEventListener("click", (e) => {
        // console.log("minimize pressed");
        let stickyNoteCont = stickyCont.querySelector(".sticky-note-cont");
        let display = getComputedStyle(stickyNoteCont).getPropertyValue("display");
        // console.log(display);
        if (display === "none") {
            // console.log("in if");
            stickyNoteCont.style.display = "block";
            // console.log("after work " + stickyNoteCont.style.display);
        }

        else {
            // console.log("in else");
            stickyNoteCont.style.display = "none";
            // console.log("after work " + stickyNoteCont.style.display);
        }
    });

}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };


}

