function unemployment_graph_simple(csv_location, div_id){
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

	//this processes the data into a format plotly can use
	function processData(allRows){
		let date = [];
		let peer = [];
		let rockford = [];
		let row;
	
		let i = 0;
		while (i < allRows.length) {
			row = allRows[i];
			date.push(row["DATE"]);
			peer.push(row["Peer Average"]);
			rockford.push(row["Rockford"]);
			i += 1;
		}
		
		makePlotly(date, peer, rockford);
		console.log(date, peer, rockford);
	}//end of processData

	function makePlotly(date, peer, rockford){
		let peer_color = '#222222';
		let traces =[{x: date,
			y: rockford,
			mode: "none",
			type: "scatter",
			fill: "tozeroy",
			name: "Rockford",
			fillcolor: 'rgba(40,255,255,0.5)',
			hovertemplate: 'Rockford, IL<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: peer,
			name: "Peer Average",
			mode: "markers+lines",
			line: {
				color: peer_color
			},
			hovertemplate: 'Peer Average<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			}//end of peer trace
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
			paper_bgcolor: "#266fb8",
			plot_bgcolor: "#266fb8",
			xaxis: {
				range: ['2010-01-01', '2021-01-01'],
				showgrid: true,
				showline: false,
				gridcolor: "#266fb8",
				type: 'date'
			},
			yaxis: {
				range: [-1, 7],
				automargin: true,
				showgrid: true,
				gridcolor: "#266fb8",
				title: 'Additional Unemployment (pp)'
			},
			showlegend: true,
			legend: {
				orientation: "h"
				}
	
		}; //end of layout
	
		let config = { responsive: true, editable: false };
	
		Plotly.newPlot(div_id, traces, layout, config);

	}//end of makePlotly

	plotFromCSV(); //make the plot

}//end of unemployment_graph_simple()