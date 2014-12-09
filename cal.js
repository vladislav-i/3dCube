

//Calculator
//returns array of all buttons in this page

function init () {
	var buttons = document.getElementsByTagName("button");
	for (var button = 0; button < buttons.length; button++) {
		buttons[button].addEventListener("click", buttonHandler);
	}
	document.getElementById("display").value="";
}

window.addEventListener("load",init);
var flag = false;
//called when button pressed
var stack =[]; //total value
function buttonHandler (e) {
	var display = document.getElementById("display");
	console.log(e.target.innerHTML);
	//allow only numbers and dot(once)
	if ( e.target.innerHTML.match(/[0-9\.]/)) {
		//enable equal button when user enters number.
		document.getElementById("equal").disabled = false;
		
		if (flag) {
			flag =false;
			display.value = e.target.innerHTML;
			
		} else {
		   display.value += e.target.innerHTML;
		}
			if(e.target.innerHTML === "."){
			e.target.disabled = true;
			} 
	} else if(e.target.id != "clear"){
		//operator
	 		if (e.target.id != "equal") {
					if (stack.length === 0) {
						stack.push(display.value);
						stack.push(e.target.id);
						display.value="";
					} else {
						stack.push(display.value);
						display.value = operation(stack);
						flag = true;
						stack.push(e.target.id);
					}
			} else {
				stack.push(display.value)
				display.value = operation(stack);
				//disable equal button when pressed
				e.target.disabled = true;
				//disable op
				flag = true;			
			}
	} else {
		//clear
		if (e.target.id ==="clear") {
			display.value=""; //clear display
			stack =[];	//clear stack
			
				
		}
		
	}
	 
}

function operation(stack) {
	//parseDouble converts into number from string
	var num1 = parseFloat(stack.pop()); //returns first element (number)
	var op = stack.pop();   //returns operator (such as plus, minus...)
	var num2 = parseFloat(stack.pop()); //returns third element (number)
	switch (op) {
					case "plus":
					
							stack.push(num2 + num1);
							return num2 + num1;
					case "minus": 
							stack.push(num2 - num1);
							return num2 - num1;
					case "divide":
							stack.push(num2 / num1);
							return num2 / num1;
					case "times":
							stack.push(num2 * num1);
							return num2 * num1;
				}
}


