// Create metadata function for 
function metadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var demographic = metadata.filter(value => value.id == sample);
        var variableResult = demographic[0];
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(variableResult).forEach(([key, value])=> {
           // PANEL.append("h6").text(key, value);
           PANEL.append("h6").text(`${key}:${value}`);
        });
    
});
}



// // Create a trace object with the data 
// function otu(sample) {
//     d3.json('samples.json').then((Data) => {
//         // Create Data Variable
//         var data = Data.samples;
//         var sample_values = data[0].sample_values.slice(0,10);
//         var otu_ids = data[0].otu_ids.slice(0,10)
//         // Sort Data
//         console.log(data[0].sample_values.slice(0,10), data[0].otu_ids.slice(0,10));
//         var data = [
//             {
//             type: "bar",  
//             x: sample_values,
//             y: otu_ids,
//             orientation:'h'
//             }
//         ];
//         Plotly.newPlot('bar', data);
//         });
// }


// Create a trace object with the data 
function otu(sample) {
    d3.json('samples.json').then((Data) => {
        
        // Create Data Variable'
        var data = Data.samples;
        console.log(data)
        var sample_array = data.filter(i => i.id === sample);
        console.log(sample_array[0]);
        var otu_ids = sample_array[0].otu_ids;
        console.log(otu_ids);
        var otu_lables = sample_array[0].otu_labels;
        var sample_values = sample_array[0].sample_values;



        // Draws Bar Chart
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var trace = [
            {
            type: "bar",  
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            orientation:'h',
            text: otu_lables.slice(0,10).reverse(),
            }
        ];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {
              t: 30,
              l: 150
            }
        };

        Plotly.newPlot('bar', trace, barLayout);

        });

        // Draws Bubble Chart
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {
                t: 0
            },
            hovermode: "closest",
            xaxis: {
                title: "Otu ID",
            },
            margin: {
                t: 30
            }
            
        };
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
            }
          }];
          // Draws Bubble
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);

};





function init() {
    // Reference to dropdown select element 
var selector = d3.select('#selDataset');
// Read in file
d3.json("samples.json").then(function(data) {
// Create variables for data
var names = data.names

names.forEach((sample) => {
    selector
    .append("option")
    .text(sample)
    .property("value", sample);
});

var initial_sample = names[0];
metadata(initial_sample);
otu(initial_sample);
});
}

init();

// Fetch new data each time a new sample is selected
function optionChanged(newSample) {
    metadata(newSample);
    otu(newSample);
}
