function workforce_graph(div_id, csv_location){
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
		let notLooking = [];
		let looking =[];
		let working = [];
		let row;
	
		let i = 0;
		while (i < allRows.length) {
			row = allRows[i];
			city.push(row["City"]);
			notLooking.push(row["Not Looking"]);
			looking.push(row["Looking"]);
			working.push(row["Working"])
			i += 1;
		}
		
		makePlotly(city, notLooking, looking, working);
	}//end of processData

	function makePlotly(city, notLooking, looking, working){
		let traces =[
			{
				x: city,
				y: working,
				name: "Working",
				type: "bar",
				marker: {
					color: "rgb(38,112,184)"
				}
			},//end of trace 3
			{
				x: city,
				y: looking,
				name: "Looking for Work",
				type: "bar",
				marker: {
					color: "#222222"
				}
			},//end of trace 2
			{
				x: city,
				y: notLooking,
				name: "Not Looking for Work",
				type: "bar",
				marker: {
					color: "#123556"
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
			paper_bgcolor: "#ffffff",
			plot_bgcolor: "#ffffff",
			xaxis: {
				range: ['2010-01-01', '2021-01-01'],
				showgrid: false,
				showline: false,
				gridcolor: "#E9EAEB"
			},
			yaxis: {
				range: [0, 100],
				automargin: true,
				showgrid: false,
				gridcolor: "#E9EAEB",
				title: '(%)'
			},
			showlegend: true,
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