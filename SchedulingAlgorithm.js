//var classAry = ["CS111","Math120"];
//Credit:Steven
		var classMap = {1:"CS111",
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
			adjacencyMatrix[6][7] = 1;
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
			for(var i = 1; i <= 20; i++)
			{
				if(checkBoxArray[i] == 1){
					for(var j = 1; j <= 20; i++)
					{
						if(adjMatrix[j][i] != 0){
							alert("You do not have the correct prereq");
							return;
						}
					}
					for(var k = 1; k <= 20; k++)
					{
						adjMatrix[i][k] = 0;
					}
				}
			}
		}

/* Still needs work */
var toggleArray= new Array(22);
console.log(toggleArray);
var status = document.getElementById('customCheck1').checked;