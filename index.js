const myDiv = document.getElementById("myDiv");
let paragraphCount = 0;
let startPoint = null;
let endPoint = null;
let isSwapMode = false; // By default the Shiftinging wold be Active/Green first

function createParagraph() {
  // Add Paragraphs from the button
  paragraphCount++;
  const paragraph = document.createElement("div");
  paragraph.classList.add("paragraph");
  paragraph.innerText = `Item ${paragraphCount}`; // Text in Paragraph
  myDiv.appendChild(paragraph);
  paragraph.addEventListener("mousedown", mouseDown);
  paragraph.addEventListener("mouseup", mouseUp);
}

function shiftMode() {
  isSwapMode = false;
  const shiftBtn = document.getElementById("shiftBtn");
  const swapBtn = document.getElementById("swapBtn");
  shiftBtn.style.backgroundColor = "green";
  swapBtn.style.backgroundColor = "red";
}

function swapMode() {
  isSwapMode = true;
  const shiftBtn = document.getElementById("shiftBtn");
  const swapBtn = document.getElementById("swapBtn");
  shiftBtn.style.backgroundColor = "red";
  swapBtn.style.backgroundColor = "green";
}

function mouseDown(event) {
  startPoint = event.target;
}

function mouseUp(event) {
  endPoint = event.target;
  if (startPoint !== endPoint) {
    // Array.from(element.parentNode.children).indexOf(element)
    const startOrder = Array.from(myDiv.children).indexOf(startPoint); // MyDiv is the parent node
    const endOrder = Array.from(myDiv.children).indexOf(endPoint);
    if (startOrder !== -1 && endOrder !== -1) {
      if (isSwapMode) {
        // Swap mode: Swap positions of s1 and s2 only
        const s1 = myDiv.children[startOrder];
        const s2 = myDiv.children[endOrder];
        // console.log(s1); console.log(s2);

        if (s1 && s2) {
          const parent = s1.parentNode;
          const temp = s1.nextSibling;
          if (s2 !== temp) {
            parent.insertBefore(s1, s2); // syntax - insertBefore(newNode, referenceNode)
            parent.insertBefore(s2, temp);
          } else {
            parent.insertBefore(s2, s1);
          }
        }
      }
      // Replace Syntax - replaceChild(newChild, oldChild)
      else {
        //Shift mode: move the endPoint paragraph to the left of the startPoint
        const paragraphs = Array.from(myDiv.children);
        const startElement = paragraphs[startOrder];
        paragraphs.splice(startOrder, 1);
        paragraphs.splice(endOrder, 0, startElement);
        myDiv.innerHTML = "";
        paragraphs.forEach((paragraph) => myDiv.appendChild(paragraph));
      }
    }
  }
  startPoint = null;
  endPoint = null;
}
