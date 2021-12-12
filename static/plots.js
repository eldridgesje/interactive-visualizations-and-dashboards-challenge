// Code begun with Dom's office hours demonstration from 12/11/21

url = "/interactive-visualizations-and-dashboards-challenge/samples.json"

// FUNCTION FOR THE BAR CHART

function barChart(sampleID) {

    d3.json(url).then(data => {

        let samples = data.samples;

        let filterData = samples.filter(s => s.id === sampleID);

        let result = filterData[0]

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);

        let plotData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks.reverse(),
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };

        let barArray = [plotData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, 1: 10}
        }

    Plotly.newPlot("bar", barArray, barLayout);


    })

}

// FUNCTION FOR THE BUBBLE CHART


function bubbleChart(sampleID) {

    d3.json(url).then(data => {

        let samples = data.samples;

        let filterData = samples.filter(s => s.id === sampleID);

        let result = filterData[0]

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let plotData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            },
            text: otu_labels
        };

        let barArray = [plotData];

        let barLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t: 30, 1: 10}
        }

    Plotly.newPlot("bubble", barArray, barLayout);


    })

}

// FUNCTION FOR THE DEMOGRAPHICS BOX


function demoBox(sampleID) {

    d3.json(url).then(data => {

        let metadata = data.metadata;

        let filtered = metadata.filter(s => s.id === +sampleID);

        let result = filtered[0];

        let ID = result.id;
        let ethnicity = result.ethnicity;
        let gender = result.gender;
        let age = result.age;
        let location = result.location;
        let bbtype = result.bbtype;
        let wfreq = result.wfreq;


    // Connect to the table in the HTML
    var demoPanel = d3.select(".panel-body");

    //Clear the table
    demoPanel.html("");

    //Create a row in the table for each record in the data
    demoPanel.append("p").html(
        `<strong>id:</strong> ${ID}<br>
        <strong>ethnicity:</strong> ${ethnicity}<br>
        <strong>gender:</strong> ${gender}<br>
        <strong>age:</strong> ${age}<br>
        <strong>location:</strong> ${location}<br>
        <strong>bbtype:</strong> ${bbtype}<br>
        <strong>wfreq:</strong> ${wfreq}`
    );

    })

}


// FUNCTION FOR UPDATING BASED ON USER SELECTION

function optionChanged(id) {

    barChart(id)

    bubbleChart(id)

    demoBox(id)

    gaugeChart(id)

}

// FUNCTION FOR INITIALIZING THE DASHBOARD


function InitDashboard() {

    let selector = d3.select("#selDataset");

    d3.json(url).then(data => {

        let sampleIDs = data.names;

        sampleIDs.forEach(ID => {
            
            selector.append("option")
                .text(ID)
                .property("value", ID);

        });

        let sampleID = sampleIDs[0]

        barChart(sampleID);

        bubbleChart(sampleID);
    
        demoBox(sampleID);

        gaugeChart(sampleID);

    });

}



InitDashboard();