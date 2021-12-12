console.log("bonus.js is loaded");

// FUNCTION FOR THE GAUGE CHART


function gaugeChart(sampleID) {

    d3.json("samples.json").then(data => {

        let metadata = data.metadata;

        let filtered = metadata.filter(s => s.id === +sampleID);

        let result = filtered[0];

        let wfreq = result.wfreq;

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wfreq,
              title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9]},
                steps: [
                  { range: [0, 1], color: "lightgray" },
                  { range: [1, 2], color: "gray" },
                  { range: [2, 3], color: "lightgray" },
                  { range: [3, 4], color: "gray" },
                  { range: [4, 5], color: "lightgray" },
                  { range: [5, 6], color: "gray" },
                  { range: [6, 7], color: "lightgray" },
                  { range: [7, 8], color: "gray" },
                  { range: [8, 9], color: "lightgray" }

                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: wfreq
                }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data, layout);


    })

}