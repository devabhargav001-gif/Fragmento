const textarea = document.querySelector("#Fragments");

const counter = document.querySelector("#counter");

textarea.addEventListener("input", function(){
    counter.textContent = "Characters :" + textarea.value.length;
});
const clearbtn = document.querySelector("#clearbtn");
const organizebtn = document.querySelector("#organizebtn");

clearbtn.addEventListener("click",function (){
    textarea.value = "";
    counter.textContent = "Characters : 0";
});
organizebtn.addEventListener("click",function(){
    const text = textarea.value;
    const lines = text.split("\n");

    // making array for partitions of thoughts
const tasks = [];
const ideas = [];
const questions = [];
const notes = [];


    lines.forEach(function(line){
        const lowerLine = line.toLowerCase();
        if (lowerLine.includes("buy") || lowerLine.includes("call") || lowerLine.includes("gym")){
            tasks.push(line);
        }
        else if (lowerLine.includes("?")|| lowerLine.includes("how") || lowerLine.includes("what")){
            questions.push(line);
        }
        else if (lowerLine.includes("learn")|| lowerLine.includes("think")){
            ideas.push(line);
        }
        else {
            notes.push(line);
        }
     
    }
    
);
const organizedData = {Tasks : tasks, Ideas : ideas, Questions : questions, Notes : notes};
console.log(organizedData);
});
