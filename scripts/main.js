
let data=[];
let weights=[];
for(i=1;i<6;i++){weights.push(i*10)}


function buttonLog(button){
	let id=button.id;
	let t=Date.now();
	const time= new Date;
	const h=time.getHours(),m=time.getMinutes(),s=time.getSeconds();
	// console.log(button.id,t)
	switch(id){
		case "sleepingButton":
			data.push({x:t,y:weights[0],h:h,m:m,s:s});
			plotData();
			break;
		case "drowsyButton":
			data.push({x:t,y:weights[1],h:h,m:m,s:s});
			plotData();
			break;
		case "quietButton":
			data.push({x:t,y:weights[2],h:h,m:m,s:s});
			plotData();
			break;
		case "activeButton":
			data.push({x:t,y:weights[3],h:h,m:m,s:s});
			plotData();
			break;
		case "cryingButton":
			data.push({x:t,y:weights[4],h:h,m:m,s:s});
			plotData();
			break
	}


}


function manualEntry(){
	// NEED TO STORE THE TIMESTAMP FOR EACH ENTRY!!! WANT DATE PORTION STORED IN DATA ALSO!!!
	const timestamp=new Date;
	const time=document.getElementById("manualTime").value;
	const index= time.search(':');
	const hour=parseInt(time.substring(0,index));
	const minute=parseInt(time.substring(index+1,time.length));
	timestamp.setHours(hour);
	timestamp.setMinutes(minute);
	const state = parseInt(document.getElementById('manualStateEntry').value);
	data.push({x:timestamp.getTime(),y:weights[state],h:timestamp.getHours(),m:timestamp.getMinutes(),s:timestamp.getSeconds()});
	plotData();

}



// set the dimensions and margins of the graph
function plotData(){
	let margin = {top: 10, right: 40, bottom: 30, left: 30},
	    width = 1200 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	let svG = d3.select("#scatter_area")
	svG.selectAll('*').remove();

	svG=d3.select("#scatter_area")
	  .append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform",
	          "translate(" + margin.left + "," + margin.top + ")");

	// Create data
	// data = [ {x:10, y:20}, {x:40, y:90}, {x:80, y:50} ];
	// X scale and Axis
	let x = d3.scaleLinear()
	    .domain([0, 24])         // This is the min and the max of the data: 0 to 100 if percentages
	    .range([0, width]);       // This is the corresponding value I want in Pixel
	svG
	  .append('g')
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x));

	// X scale and Axis
	let y = d3.scaleLinear()
	    .domain([5, weights[weights.length-1]+5])         // This is the min and the max of the data: 0 to 100 if percentages
	    .range([height, 0]);       // This is the corresponding value I want in Pixel
	svG
	  .append('g')
	  .call(d3.axisLeft(y));

	// Add 3 dots for 0, 50 and 100%
	svG
	  .selectAll("whatever")
	  .data(data)
	  .enter()
	  .append("circle")
	    .attr("cx", function(d){ return x(d.h+d.s/60) })
	    .attr("cy", function(d){ return y(d.y) })
	    .attr("r", 7)

}

function clearLastEntry(){
	if (data.length >=1){
		data.pop();
		plotData();
	}

}



//Delete last entry button!!!!!!!