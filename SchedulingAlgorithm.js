//var classAry = ["CS111","Math120"];
//Credit:Steven
		var totalClasses = 20;
		
			var classPerSemester = 5;
			var maximulTotalSemester = 20;

			var classesLeft = totalClasses;
			
			var scheduleTable = new Array(classPerSemester);
			for(var i = 0; i < classPerSemester; i++){
				scheduleTable[i] = new Array(maximulTotalSemester);
			}
			for(var i = 0; i < classPerSemester; i++){
				for(var j = 0; j < maximulTotalSemester; j++){
					scheduleTable[i][j] = 0;
				}
			}

			var classesMarked = [];
			for(var i = 1; i <= 21; i++){
				classesMarked.push(false);
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
						20:"CS340"};
		var adjacencyMatrix = new Array(21);
		for(var i = 0; i < adjacencyMatrix.length; i++){
			adjacencyMatrix[i] = new Array(21);
		}
		function listMap(){
			loadAdjacencyMatrix();
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
		}

//Created By: Brian
		function checkMatrix(checkBoxArray, adjMatrix)
			{
				for(var i = 1; i <= totalClasses; i++)
				{
					if(checkBoxArray[i] == 1){
						for(var j = 1; j <= totalClasses; i++)
						{
							if(adjMatrix[j][i] != 0){
								alert("You do not have the correct prereq");
								return;
							}
						}
						for(var k = 1; k <= totalClasses; k++)
						{
							adjMatrix[i][k] = 0;
						}
						classesLeft--;
						classesMarked[i] = true;
					}
				}
			}

/* Still needs work */
var toggleArray= new Array(22);
console.log(toggleArray);
var status = document.getElementById('customCheck1').checked;
var Submit = document.getElementById("Submit");
var cancel = document.getElementById("cancel");
var modal = document.getElementById('myModal');
var resultSection = document.getElementById('resultSection');

Submit.onclick = function(){
	printScheduleTable();
	modal.style.display = "block";
}
cancel.onclick = function() {
	modal.style.display = "none";
}		
		
		listMap();
		
		var currSem;
		
		var dummyNode = { data : -1,
						   next : null};
		
		var openLinkedList = { head : dummyNode }
		
		//console.log(openLinkedList);

		
		//console.log(openLinkedList);
		console.log(classesMarked);
		console.log(scheduleTable);
		//console.log(linkedList_getHead());
				
		function scheduling(){
			console.log(adjacencyMatrix);
			currSem = 1;
			
			var orphanId;
			var nextClass;
			
			var debugCounter = 25;
			var debugIteration = 0;
			
			while(classesLeft > 0){
				
				//Find all orphan nodes and put them
				//and put them in the linked list
				console.log("iteration " + ++debugIteration);
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
					console.log(openLinkedList);
					console.log(scheduleTable);
					console.log(classesMarked);
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
			
			//linkedList_isEmpty();
			
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
			scheduling();

			resultSection.innerHTML += "<br> <table id='myTable'> <tr> </tr> </table>"
			
			var SchTable = document.getElementById('myTable');
			
			for(var i = 1; i < currSem; i++){
				makeTable(i);
			}
		
		}
		function makeTable(theIndex){
			var SchTable = document.getElementById('myTable');
			
			var row = SchTable.insertRow(1);
			
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			
			cell1.innerHTML += classMap[scheduleTable[0][theIndex]];
			cell2.innerHTML += classMap[scheduleTable[1][theIndex]];
			cell3.innerHTML += classMap[scheduleTable[2][theIndex]];
			cell4.innerHTML += classMap[scheduleTable[3][theIndex]];
			cell5.innerHTML += classMap[scheduleTable[4][theIndex]];
		}
		
		function printLinkedList(){
							
			var spot = openLinkedList.head.next;
			
			while(spot != null){
				console.log(classMap[spot.data]);
			
				spot = spot.next;
			}
		
		}