const hero = document.querySelector("#hero");
const workspace = document.querySelector("#workspace");
const startbtn = document.querySelector("#startbtn");



// home button feature 
const homeBtn = document.querySelector("#homeBtn");
homeBtn.addEventListener("click", function () {
    localStorage.setItem("fragmento-screen", "hero");

    workspace.classList.remove("show");
    workspace.style.display = "none";

    hero.style.display = "flex";

});


startbtn.addEventListener("click", function () {
    localStorage.setItem("fragmento-screen", "workspace");

    hero.classList.add("hide");

    setTimeout(function () {

        hero.style.display = "none";

        hero.classList.remove("hide");   //  Important

        workspace.style.display = "block";

        workspace.classList.add("show");

    }, 450);

});




const result = document.querySelector("#result");


const textarea = document.querySelector("#fragments");

const counter = document.querySelector("#counter");
  const MAX_CHARACTERS = 5000;

// globally declaring arrays
const tasks = [];
const ideas = [];
const questions = [];
const notes = [];



// creating cards via this function
  // edit button feature via index
   //delete button feature via index
function createCategoryCard(title, icon, items) {
    if(items.length === 0){

        return "";

    }

    const itemHTML = items.map(function (item, index) {
        return `
            <div class="task-card">
               <span> ${icon} ${item} </span>
               <div class = "modify" > 


             
              <button class="editbtn" 
              data-category="${title.toLowerCase()}"
               data-index="${index}">✏️</button>


              
              <button class="deletebtn"
               data-category="${title.toLowerCase()}"
                data-index="${index}">🗑️</button>

            </div>
            </div>
        `;
    });

    return `
        <div class="category-card">

            <div class="card-header">
                <h2>${icon} ${title}</h2>
                <span>${items.length}</span>
            </div>

            <div class="card-body">
                ${itemHTML.join("")}
            </div>

        </div>
    `;

}
 
 
function render() {

    if (
    tasks.length === 0 &&
    ideas.length === 0 &&
    questions.length === 0 &&
    notes.length === 0
) {

    result.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">✨</div>

            <h2>Your fragments will appear here</h2>

            <p>
                Start writing above and click
                <strong>Organize</strong>
                to transform your thoughts.
            </p>

        </div>

    `;

    return;
}

    result.innerHTML = `
<div class="grid">

    ${createCategoryCard("Tasks", "📋   : ",  tasks)}

    ${createCategoryCard("Ideas", "💡   : ",  ideas)}

    ${createCategoryCard("Questions", "❓   : ",  questions)}

    ${createCategoryCard("Notes", "📝   : ",  notes)}

</div>
`;

    attachDeleteEvent();
    attachEditEvents();

}

//edit krne k liye function 
function attachEditEvents() {

    const editButtons = document.querySelectorAll(".editbtn");

    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.dataset.category;
            const index = Number(button.dataset.index);

            let currentText = "";

            if (category === "tasks") {
                currentText = tasks[index];
            }
            else if (category === "ideas") {
                currentText = ideas[index];
            }
            else if (category === "questions") {
                currentText = questions[index];
            }
            else if (category === "notes") {
                currentText = notes[index];
            }

            const newText = prompt("Edit your thought:", currentText);

            if (newText === null || newText.trim() === "") {
                return;
            }

            if (category === "tasks") {
                tasks[index] = newText;
            }
            else if (category === "ideas") {
                ideas[index] = newText;
            }
            else if (category === "questions") {
                questions[index] = newText;
            }
            else if (category === "notes") {
                notes[index] = newText;
            }

            savedata();
            render();

        });

    });

}


// delete button feature function banaya
function attachDeleteEvent() {
    const deleteButtons = document.querySelectorAll(".deletebtn");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.dataset.category;
            const index = Number(button.dataset.index);

            if (category === "tasks") {

                tasks.splice(index, 1);

            }
            else if (category === "ideas") {

                ideas.splice(index, 1);

            }
            else if (category === "questions") {

                questions.splice(index, 1);

            }
            else if (category === "notes") {

                notes.splice(index, 1);

            }

            savedata();

            render();

        });


    });

}



//textarea function 

 textarea.addEventListener("input", function () {

    const currentLength = textarea.value.length;

    counter.textContent = `Characters: ${currentLength} / ${MAX_CHARACTERS}`;

});

const clearbtn = document.querySelector("#clearbtn");
const organizebtn = document.querySelector("#organizebtn");
const themeBtn = document.querySelector("#themeBtn");

clearbtn.addEventListener("click", function () {
    textarea.value = "";
    counter.textContent = "Characters : 0/5000";
});




function savedata() {
    const data = {
        tasks: tasks,
        ideas: ideas,
        questions: questions,
        notes: notes
    };
    localStorage.setItem(
        "fragmento-data",
        JSON.stringify(data)
    );


}

// organize function
organizebtn.addEventListener("click", function (event) {
    
    event.preventDefault();
    tasks.length = 0;

    ideas.length = 0;

    questions.length = 0;

    notes.length = 0;

    const text = textarea.value;
   const lines = text.split(/\n|,/);

    // making array for partitions of thoughts


 lines.forEach(function (line) {

    if (line.trim() === "") return;

    const lowerLine = line.toLowerCase();

    // offline mode ke liye keywords set krna 

    const taskKeywords = [
    "buy",
    "book",
    "call",
    "gym",
    "go",
    "visit",
    "meet",
    "submit",
    "finish",
    "complete",
    "renew",
    "travel",
    "ticket",
    "passport",
    "jana",
    "lena",
    "karna"
];

const ideaKeywords = [
    "learn",
    "think",
    "idea",
    "build",
    "create",
    "design",
    "improve",
    "react",
    "backend",
    "sikhna",
    "project",
    "ai"

];

const questionKeywords = [
    "?",
    "how",
    "what",
    "why",
    "when",
    "where",
    "which",
    "should",
    "can",
    "kya",
    "kaise",
    "kyu",
    "kab"
];

 if (taskKeywords.some(keyword => lowerLine.includes(keyword))) {

    tasks.push(line);

}

else if (questionKeywords.some(keyword => lowerLine.includes(keyword))) {

    questions.push(line);

}

else if (ideaKeywords.some(keyword => lowerLine.includes(keyword))) {

    ideas.push(line);

}

else {

    notes.push(line);

}

});

    render();
    // data ko save krne ke liye function banaya
    savedata();

});



//data ko firse restore krna

function loadData() {

    const savedData = localStorage.getItem("fragmento-data");

    if (!savedData) return;

    const data = JSON.parse(savedData);

    tasks.push(...data.tasks);

    ideas.push(...data.ideas);

    questions.push(...data.questions);

    notes.push(...data.notes);
    render();
}

textarea.addEventListener("keydown", function (event) {

    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {

        event.preventDefault();

        organizebtn.click();

    }

});



//refresh wala bug 
const currentScreen = localStorage.getItem("fragmento-screen");

if (currentScreen === "workspace") {

    hero.style.display = "none";

    workspace.style.display = "block";

}

else {

    hero.style.display = "flex";

    workspace.style.display = "none";

}
// pura data firse load krna
loadData();
 

const savedTheme = localStorage.getItem("fragmento-theme");

if(savedTheme === "light"){

    document.body.classList.add("light");

    themeBtn.textContent = "🌙 Dark Mode";

}

else{

    themeBtn.textContent = "☀️ Light Mode";

}

themeBtn.addEventListener("click",function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("fragmento-theme","light");

        themeBtn.textContent = "🌙 Dark Mode";

    }

    else{

        localStorage.setItem("fragmento-theme","dark");

        themeBtn.textContent = "☀️ Light Mode";

    }

});
 