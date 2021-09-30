function area_graph(div_id,csv_location){
	//we set the location of the dataset
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
		let akron = [];
		let peoria = [];
		let south_bend = [];
		let dayton = [];
		let erie = [];
		let national = [];
		let peer = [];
		let rockford = [];
		let row;
	
		let i = 0;
		while (i < allRows.length) {
			row = allRows[i];
			date.push(row["DATE"]);
			akron.push(row["Akron"]);
			peoria.push(row["Peoria"]);
			south_bend.push(row["South Bend"])
			dayton.push(row["Dayton"]);
			erie.push(row["Erie"]);
			national.push(row["National"]);
			peer.push(row["Peer Average"]);
			rockford.push(row["Rockford"]);
			i += 1;
		}
		
		makePlotly(date, akron, peoria, south_bend, dayton, erie, national, peer, rockford);
		console.log(date, akron, peoria, south_bend, dayton, erie, national, peer, rockford);
	}//end of processData

	function makePlotly(date, akron, peoria, south_bend, dayton, erie, national, peer, rockford){
		let rockford_color = 'rgb(38,112,184)';
		let peer_color = 'rgb(67,59,57)';
		let national_color = 'RGBA(29, 195, 29, 0.38)';
		regular_color = "#aaaaaa";
		let traces =[
			{x: date,
			y: national,
			name: "National Unemployment",
			mode: "none",
			type: "scatter",
			fill: "tozeroy",
			fillcolor: national_color,
			line: {
				color: national_color,
			},
			hovertemplate: 'National Unemployment<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: akron,
			name: "Akron",
			mode: "lines",
			line: {
				color: regular_color
			},
			hovertemplate: 'Akron, OH<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: peoria,
			name: "Peoria",
			mode: "lines",
			line: {
				color: regular_color
			},
			hovertemplate: 'Peoria, IL<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: south_bend,
			name: "South Bend",
			mode: "lines",
			line: {
				color: regular_color
			},
			hovertemplate: 'South Bend, IN<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: dayton,
			name: "Dayton",
			mode: "lines",
			line: {
				color: regular_color
			},
			hovertemplate: 'Dayton, OH<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: erie,
			name: "Erie",
			mode: "lines",
			line: {
				color: regular_color
			},
			hovertemplate: 'Erie, PA<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: peer,
			name: "Peer Average",
			mode: "markers+lines",
			line: {
				color: peer_color
			},
			hovertemplate: 'Peer Average<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			},//end of trace_1
			{x: date,
			y: rockford,
			name: "Rockford",
			mode: "markers+lines",
			line: {
				color: rockford_color
			},
			hovertemplate: 'Rockford, IL<br><b>%{y}%</b><br><br>' + '%{x}' + "<extra></extra>",
			}//end of trace_1
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
				showgrid: true,
				showline: false,
				gridcolor: "#E9EAEB",
				type: 'date'
			},
			yaxis: {
				range: [0, 20],
				automargin: true,
				showgrid: true,
				gridcolor: "#E9EAEB",
				title: 'Unemployment (%)'
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

}//end of area_graph()