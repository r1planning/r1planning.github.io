function labor_force_bar(div_id, csv_location){
	const csv = csv_location;
	
	//we read in the dataset
	//this makes an array of objects
	//each object is a single row from the .csv
	function plotFromCSV(){
		d3.csv(csv, function(err, rows){
			//we are making a function inside a function
	
			console.log(rows)
			processData(rows);
		}
			);
	}//end of plotfromCSV()

	function processData(allRows){
		let city = [];
		let labor_force = [];
		let color =[];
		let row;
	
		let i = 0;
		while (i < allRows.length) {
			row = allRows[i];
			city.push(row["City"]);
			labor_force.push(row["Labor Force"]);
			color.push(row["Color"]);
			i += 1;
		}
		
		makePlotly(city, labor_force, color);
	}//end of processData

	function makePlotly(city, labor_force, color){
		let traces =[
			{
				x: city,
				y: labor_force,
				name: "Civilian Labor Force",
				type: "bar",
				marker:{
					color: color
				}
			}//end of trace 1
		];//end of traces

		let layout = {
			automargin: false,
			margin: {t:0, b:60, l:50, r:30},
			title: {text: "",
					x: .12,
					y: .9,
					font: {
						size: 17
					},
					xanchor: "right"

			},
			font: {
				color: "#171717"
			},
			hovermode: "closest",
			paper_bgcolor: "rgb(38,112,184)",
			plot_bgcolor: "rgb(38,112,184)",
			xaxis: {
				showgrid: false,
				showline: false,
				gridcolor: "#E9EAEB"
			},
			yaxis: {
				automargin: true,
				showgrid: false,
				gridcolor: "#E9EAEB",
				title: ''
			},
			showlegend: false,
			legend: {
				orientation: "h"
				},
			barmode: 'stack'
	
		}; //end of layout
	
		let config = { responsive: true, editable: false };
	
		Plotly.newPlot(div_id, traces, layout, config);

	}//end of makePlotly

	plotFromCSV(); //make the plot

};