//Credit:Steven
		var totalClasses = 22;
			var classPerSemester = 5;
			var maximulTotalSemester = 20;
			var countCheck = 0;
			var scheduleTable = new Array(classPerSemester);
			for(var i = 0; i < classPerSemester; i++){
				scheduleTable[i] = new Array(maximulTotalSemester);
			}
			var classesMarked = [];
			var classLeft;
		function init(){	
			classesLeft = totalClasses;
			countCheck = 0;
			for(var i = 0; i < classPerSemester; i++){
				for(var j = 0; j < maximulTotalSemester; j++){
					scheduleTable[i][j] = 0;
				}
			}

			for(var i = 1; i <= totalClasses; i++){
				classesMarked[i] = false;
			}
			loadAdjacencyMatrix();
		}	
		var classMap = {0:"Flexible",
						1:"CS111",
						2:"Math120",
						3:"Math141",
						4:"Math142",
						5:"Math143",
						6:"Math231",
						7:"Math241",
						8:"CS211",
						9:"CS212",
						10:"CS220",
						11:"CS240",
						12:"CS313",
						13:"CS320",
						14:"CS343",
						15:"CS323",
						16:"CS331",
						17:"CS355",
						18:"CS370",
						19:"CS316",
						20:"CS340",
						21:"Elective1",
						22:"Elective2"};
		var adjacencyMatrix = new Array(totalClasses+1);
		for(var i = 0; i < adjacencyMatrix.length; i++){
			adjacencyMatrix[i] = new Array(totalClasses+1);
		}
		
		function loadAdjacencyMatrix(){
			for(var i = 0; i < adjacencyMatrix.length; i++){
				for(var j = 0; j < adjacencyMatrix.length; j++){
					adjacencyMatrix[i][j] = 0;
				}
			}
			adjacencyMatrix[1][8] = 1;
			adjacencyMatrix[1][9] = 1;
			adjacencyMatrix[1][10] = 1;
			adjacencyMatrix[1][11] = 1;
			adjacencyMatrix[2][10] = 1;
			adjacencyMatrix[3][4] = 1;
			adjacencyMatrix[3][6] = 1;
			adjacencyMatrix[3][10] = 1;
			adjacencyMatrix[4][5] = 1;
			adjacencyMatrix[5][7] = 1;
			adjacencyMatrix[8][12] = 1;
			adjacencyMatrix[9][12] = 1;
			adjacencyMatrix[10][12] = 1;
			adjacencyMatrix[10][13] = 1;
			adjacencyMatrix[11][14] = 1;
			adjacencyMatrix[11][19] = 1;
			adjacencyMatrix[11][20] = 1;
			adjacencyMatrix[12][15] = 1;
			adjacencyMatrix[12][16] = 1;
			adjacencyMatrix[12][17] = 1;
			adjacencyMatrix[12][18] = 1;
			adjacencyMatrix[12][19] = 1;
			adjacencyMatrix[12][20] = 1;
			adjacencyMatrix[13][19] = 1;
			adjacencyMatrix[12][21] = 1;
			adjacencyMatrix[12][22] = 1;
		}
		
		var checkBoxArray = [];
		function checkToggle(){
			var toCheck = document.getElementsByTagName("input");
			for(var i = 1; i <= totalClasses; i++) {
				if(toCheck[i].type == "checkbox" && toCheck[i].checked == true){
					checkBoxArray[i] = 1;
				}
				else checkBoxArray[i] = 0;
			}
			return checkMatrix();
		}
		
		var selectedAll = document.getElementById("selectAll");
			
		//Check or uncheck all rows
		selectedAll.onclick = function() {
			var inputs = document.getElementsByTagName("input");
			if(inputs[0].checked == true){
				for(var i = 1; i < inputs.length; i++) {
					if(inputs[i].type == "checkbox") { 
						inputs[i].checked = true; 
					}  
				} 
			}
			else if(inputs[0].checked == false){
				for(var i = 1; i < inputs.length; i++) {
					if(inputs[i].type == "checkbox") {			
						inputs[i].checked = false;
					}
				}
			}
		}

//Created By: Brian
		function checkMatrix()
			{			
				for(var i = 1; i <= totalClasses; i++)
				{
					if(checkBoxArray[i] == 1){
						for(var j = 1; j <= totalClasses; j++)
						{
							if(adjacencyMatrix[j][i] != 0){

								alert("You do not have the correct prereq");
								return false;
							}
						}
						for(var k = 1; k <= totalClasses; k++)
						{
							adjacencyMatrix[i][k] = 0;
						}
						classesLeft--;
						classesMarked[i] = true;
					}
				}
				return true;
			}

var toggleArray= new Array(totalClasses);
var Submit = document.getElementById("Submit");
var cancel = document.getElementById("cancel");
var modal = document.getElementById('myModal');
var resultSection = document.getElementById('resultSection');

Submit.onclick = function(){
	init();
	var inputBool = checkToggle();
	if(!inputBool) return;
	scheduling();
	printScheduleTable();
	modal.style.display = "block";
}
cancel.onclick = function() {
	modal.style.display = "none";
}		
		
		var currSem;
		
		var dummyNode = { data : -1,
						   next : null};
		
		var openLinkedList = { head : dummyNode }
				
		function scheduling(){
			currSem = 1;
			
			var orphanId;
			var nextClass;
			
			var debugCounter = 25;
			var debugIteration = 0;
			
			while(classesLeft > 0){
				
				//Find all orphan nodes and put them
				//and put them in the linked list
				while(true){

					orphanId = getOrphanClass();
					
					//means no more orphan
					
					if(orphanId == -1){
						break;
					}
					classesMarked[orphanId] = true;
					
					linkedList_insert(orphanId);
				}
				//All possible orphan is collected
				
				//Assign classes to the schedule timeslots
				for(var i = 0; i < classPerSemester; i++){
					if(linkedList_isEmpty()){
						break;
					}
					else{
						//get first class on the linked list
						nextClass = linkedList_getHead();
						
						//Assign class to the scheduleTable
						scheduleTable[i][currSem] = nextClass;
						
						//Cut off dependency 
						//(remove this node as parent from other node)
						for(var j = 1; j <= totalClasses; j++){
							
							adjacencyMatrix[nextClass][j] = 0;

						}
						classesLeft--;
					}
					
				}				
				//Either open is empty, or all timeslot is filled
				

				//Go to next semester
				currSem++;
				
				//This section is only for debugging
				//This is likely to happen if there is an infinite loop
				debugCounter--;
				if(debugCounter <= 0){
					printLinkedList();
					return;
				}
				//This section is only for debugging
				
			}
			
		}
		
		
		
		//Below are all functions
		function getOrphanClass(){
			var orphanFound;
			for(var i = 1; i <= totalClasses; i++){
				if(classesMarked[i] == false){
					orphanFound = true;
					for(var j = 1; j <= totalClasses; j++){
						//check columns
						if(adjacencyMatrix[j][i] > 0){
							orphanFound = false;
							continue;
						}
					}
					if(orphanFound){
						return i;
					}
				}
			}
			return -1;
		}		
		
		function linkedList_insert(newNodeData){
			var newNode = { data : newNodeData,
							next : null};
							
			var spot = openLinkedList.head;
			
			while(spot.next != null){
				spot = spot.next;
			}
			
			spot.next = newNode;

		}
		
		function linkedList_getHead(){
			if(linkedList_isEmpty()){
				alert("Requesting head from empty list");
				return;
			}
			//The data
			var temp = openLinkedList.head.next.data;
			
			openLinkedList.head.next = openLinkedList.head.next.next;
						
			return temp;
			
		}
		
		
		function linkedList_isEmpty(){
			if(openLinkedList.head.next == null){
				return true;
			}
			else{
				return false;
			}
		}
		
		
		function printScheduleTable(){

			resultSection.innerHTML = "<br> <div class='table-responsive'> <table id='myTable' class='table table-striped'> <tr> </tr> </table> </div>"
			
			var SchTable = document.getElementById('myTable');
			var needHeader = document.getElementsByTagName("input");
			for(var i = 1; i<=totalClasses; i++){
				if(needHeader[i].type == "checkbox" && needHeader[i].checked == true){
					countCheck++;
				}
			}

			if(countCheck == totalClasses){
				SchTable.innerHTML = "Congratulations!";
				return;
			}
				var row = SchTable.insertRow(1);
				var cells;
			
				for(var j = 0; j<= classPerSemester; j++){
					cell = row.insertCell(j);
					if(j!=0)cell.innerHTML = "Class " + j;
				}
			
			
			for(var i = 1; i < currSem; i++){
				makeTable(i);
			}
		
		}
		function makeTable(theIndex){
			var SchTable = document.getElementById('myTable');
			
			var row = SchTable.insertRow(-1);
			
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			var cell3 = row.insertCell(3);
			var cell4 = row.insertCell(4);
			var cell5 = row.insertCell(5);
			
			cell0.innerHTML += "Semester " + theIndex;
			cell1.innerHTML += classMap[scheduleTable[0][theIndex]];
			cell2.innerHTML += classMap[scheduleTable[1][theIndex]];
			cell3.innerHTML += classMap[scheduleTable[2][theIndex]];
			cell4.innerHTML += classMap[scheduleTable[3][theIndex]];
			cell5.innerHTML += classMap[scheduleTable[4][theIndex]];
		}
		
		function printLinkedList(){
							
			var spot = openLinkedList.head.next;
			
			while(spot != null){
			
				spot = spot.next;
			}
		
		}