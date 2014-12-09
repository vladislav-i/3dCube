//controls for cube
function control(e) {
	console.log(e.keyCode); //to tell which keys on key board are up down left right
	var cube = document.getElementById("cube");
	var xAngle = 0, yAngle = 0;
	switch(e.keyCode) {
		
		case 49:
		cube.className="show-front";
		break;
		
		
		case 50:
		cube.className="show-back";
		break;
		
		
		case 51:
		cube.className="show-right";
		break;
		
		
		case 52:	
		cube.className="show-left";
		break;
		
		
		case 53:	
		cube.className="show-top";
		break;
		
		
		case 54:	
		cube.className="show-bottom";
		break;
		
		
	}

}
//on key key press 
document.addEventListener('keydown',control,false);
