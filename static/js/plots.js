// Code begun with Dom's office hours demonstration from 12/11/21

console.log("plots.js is loaded");

// FUNCTION FOR THE BAR CHART

function barChart(sampleID) {

    console.log(`Draw barchart for (${sampleID})`);

    d3.json("samples.json").then(data => {

        let samples = data.samples;

        let filterData = samples.filter(s => s.id === sampleID);

        let result = filterData[0]

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);

        console.log(otu_ids)
        console.log(otu_labels)
        console.log(sample_values)

        let plotData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };

        let barArray = [plotData];

        let barLayout = {
            Title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, 1: 50}
        }

    Plotly.newPlot("bar", barArray);


    })

}

// FUNCTION FOR THE BUBBLE CHART


function bubbleChart(sampleID) {

    console.log(`Draw bubblechart for (${sampleID})`);

}

// FUNCTION FOR THE DEMOGRAPHICS BOX


function demoBox(sampleID) {

    console.log(`Populate demographics for (${sampleID})`);

}


// FUNCTION FOR UPDATING BASED ON USER SELECTION

function optionChanged(id) {

    console.log(`An option was changed! (${id})`)

    barChart(id)

    bubbleChart(id)

    demoBox(id)

}

// FUNCTION FOR INITIALIZING THE DASHBOARD


function InitDashboard() {
    console.log("Initializing the dashboard...");

    let selector = d3.select("#selDataset");

    d3.json("../samples.json").then(data => {

        console.log(data);

        let sampleIDs = data.names;

        sampleIDs.forEach(ID => {
            
            selector.append("option")
                .text(ID)
                .property("value", ID);

        });

        let sampleID = sampleIDs[0]

        barChart(sampleID)

        bubbleChart(sampleID)
    
        demoBox(sampleID)    

    });

}



InitDashboard();