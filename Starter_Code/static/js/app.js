
// Create metadata Function For Demographic Info
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


// Create a trace object with the data 
function otu(sample) {

  // Read In File 
  d3.json('samples.json').then((Data) => {
      
      // Create Data Variable'
      var data = Data.samples;

      // Display to Console to Verify
      console.log(data)

      // Filter to Enter Array
      var sample_array = data.filter(i => i.id === sample);

      // Display to Console to Verify
      console.log(sample_array[0]);

      // Create otu_ids Variable
      var otu_ids = sample_array[0].otu_ids;

      // Display to Console to Verify
      console.log(otu_ids);

      // Create Labels Variable
      var otu_lables = sample_array[0].otu_labels;

      // Create sample_values Variable
      var sample_values = sample_array[0].sample_values;

      // Create Ticks
      var yticks = otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse();

      // Create Data for Bar Chart
      var trace = [
          {
          type: "bar",  
          x: sample_values.slice(0,10).reverse(),
          y: yticks,
          orientation:'h',
          text: otu_lables.slice(0,10).reverse(),
          }
      ];

      // Create Layout for Bar Chart
      var barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: {
            t: 30,
            l: 150
          }
      };

      // Draws Bar Chart
      Plotly.newPlot('bar', trace, barLayout);

      // Creates layout for Bubble Chart
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

      // Creates Data For Bubble Chart 
      var bubbleData = [{
          x: otu_ids,
          y: sample_values,
          text: otu_lables,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }];

        // Draws Bubble Chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

      });
};


// Create Guage Function For Hands Washed Guage
function guage(sample) {
  d3.json("samples.json").then((data) => {

        // Create Variable for Hands Washed Guage
        var metadata = data.metadata;

        // Filter Variable
        var demographic = metadata.filter(value => value.id == sample);

        // Filter Variable
        var wfreq = demographic[0].wfreq;   
        
        // Log to Console to Inspect
        console.log(wfreq)
        
        // Create Trace for Guage
        var traceGuage = [
          {
            type: "indicator",
            mode: "gauge+number+delta",
            value: wfreq,
            title: { text: "Scrubs Per Week", font: { size: 24 } },
          //   delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
            gauge: {
              axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
              bar: { color: "RebeccaPurple" },
              bgcolor: "white",
              borderwidth: 2,
              bordercolor: "RebeccaPurple",
              steps: [
                { range: [0, 10], color: "cyan" },
              
              ],

              }
            }

        ];
        
      var layout = {
          width: 500,
          height: 400,
          margin: { t: 25, r: 25, l: 25, b: 25 },
          paper_bgcolor: "lavender",
          font: { color: "darkblue", family: "Arial" }
        };
        
      Plotly.newPlot('gauge', traceGuage, layout)
  });
}


// Create init Function
function init() {

// Reference to dropdown select element 
var selector = d3.select('#selDataset');

// Read in file
d3.json("samples.json").then(function(data) {

// Create variables for data
var ids = data.names

// Create Change Loop
ids.forEach((sample) => {
  selector
  .append("option")
  .text(sample)
  .property("value", sample);
});

// Create Variable Instance For Change loop
var initial_sample = ids[0];

// Call metadata Function
metadata(initial_sample);

// Call otu function
otu(initial_sample);
guage(initial_sample);

});
}

init();

// Fetch new data each time a new sample is selected
function optionChanged(newSample) {

  // Display metadata Fucntion and Change
  metadata(newSample);

  // Display otu Function and Change 
  otu(newSample);
  guage(newSample);
}


