var mygun, enemy, wrapper;
var flag = "right", i = 0, shots = 25;

mygun = document.querySelector(".mygun");
enemy = document.querySelector(".enemy");
wrapper = document.querySelector(".wrapper");
result = document.querySelector(".result");

document.addEventListener("mousemove",mousemoveHandler);
document.addEventListener("mousedown",mousedownHandler);

function mousemoveHandler(e){
  var target = e.srcElement || e.target; 
  var parent = mygun.parentNode;
  var rect = parent.getBoundingClientRect();
  var mygunRect = mygun.getBoundingClientRect();
  //alert(mygunRect.left)
  if( e.clientX - 20 > rect.left )
    mygun.style.left = e.clientX - rect.left - 20  + "px";
  else 
    mygun.style.left = 0 + "px";
  
  
  if( e.clientX + 20  > rect.right )
    mygun.style.left = rect.width - 42 + "px";
}
function mousedownHandler(e){
  
  if( shots == 0) return;
  shots--;
  
  
  var target = e.srcElement || e.target;
  var clone = mygun.cloneNode();
  
  var enemyRect, cloneRect;
    
  clone.className = "shot";
  
  clone.style.left = mygun.getBoundingClientRect()["left"];
  clone.style.bottom = 0;  
  clone.i = 0;
  
  var height = wrapper.getBoundingClientRect()["height"];
  
  (function(){
    if( clone.i + 42 < height){
      clone.i++;
      clone.style.bottom = clone.i + "px";
      
      cloneRect = clone.getBoundingClientRect();
      enemyRect = enemy.getBoundingClientRect();
      
      if( 
      cloneRect.left > enemyRect.left &&  
      cloneRect.left < enemyRect.left + enemyRect.width &&
      parseInt(getComputedStyle(clone).top) < enemyRect.height
      ){
        enemy.style.border = "1px solid red"
        result.innerHTML = +result.innerHTML + 1;
        setTimeout(function(){
          enemy.style.border = "0";
        },500);
         if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      }
      
      setTimeout(arguments.callee, 10);
    } else {
       if (clone && clone.parentNode)  clone.parentNode.removeChild(clone);
    }

  })();
  
  document.querySelector(".wrapper").appendChild(clone);
}

function enemyMove(){
  var enemyRect = enemy.getBoundingClientRect();
  var parent = enemy.parentNode;
  var rect = parent.getBoundingClientRect();
  
  if( flag == "right" ) i++;
  if( flag == "left" ) i--;
  
  enemy.style.left = i + "px";
  
   if( i + 40 >  rect.width ){
    enemy.style.left = rect.width - 42  + "px";
    flag = "left" ;
   }  
  
  if( enemyRect.left < rect.left ){
    enemy.style.left = 0 + "px";
    flag = "right";  
  }  
  
  setTimeout(enemyMove , 5)
}
enemyMove()