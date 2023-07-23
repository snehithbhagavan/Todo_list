
var tasks=[];
var id=0;
var input=document.getElementById("input");
var list=document.getElementById("list");


//localStorage
tasks= JSON.parse(localStorage.getItem("todos"));
displayTasks();


function addTask(){
     if(input.value===''){
        alert("You must write something");
     }
     else{

     tasks.push({id:++id,task:input.value});
     
     displayTasks();
     input.value='';}
     
}



//For checkbox 
function checkTask(e){
     var ele = e.parentElement.nextElementSibling;
     if(e.checked)
     ele.style.textDecoration = 'line-through';
     else
     ele.style.textDecoration='none';
     
}

//For displaying tasks
function displayTasks(){
      list.innerHTML='';
     for(var i=0;i<tasks.length;i++){       
        let li=document.createElement("li");
       
        
        li.innerHTML=`<div class='flex'>
                          <div class='display'>
                          <div class='checkbox'>
                          <input type='checkbox' onclick='checkTask(event.target)'>
                          </div>
                         <div class='task'>${tasks[i].task}</div>
                         </div>
                         <div class='em'>
                         <span><button id=${tasks[i].id} class="editmain">Edit</button>
                         <button id=${tasks[i].id} class="del">Delete</button></span></div></div>`;


       list.append(li);
       var del = document.querySelectorAll('.del');
        var edit = document.querySelectorAll('.editmain');
        
        del[i].addEventListener("click", ()=>callDelete(event.target.id));
        edit[i].addEventListener("click", ()=>callEdit(event.target.id));
        
        localStorage.setItem("todos",JSON.stringify(tasks));


        
}
}




     
// For deleting task 
function callDelete(index){
     for(var i=0;i<tasks.length;i++){
        
                if(tasks[i].id==index){
                tasks.splice(i,1);
                break;}
            }
           
            displayTasks();
        }


// For editing task inline
function callEdit(index){
   for(var i=0;i<tasks.length;i++){
    if(tasks[i].id==index){
        list.children[i].innerHTML=`<div class="editbar"><input type="text" id="editInput"><span><button id=${tasks[i].id} class="edit">Save</button></div>`;
            
        var editSave=document.querySelector('.edit');
        var editInput=document.getElementById("editInput");
        editInput.setAttribute('value',tasks[i].task);
       editSave.addEventListener("click",()=>editTask(event.target.id));
    }
   }
  
}

//For changing the task in the array
function editTask(index){
   for(var i=0;i<tasks.length;i++){
    if(tasks[i].id==index){
        tasks[i].task=editInput.value;
        break;
    }
   }
   displayTasks();
   
}