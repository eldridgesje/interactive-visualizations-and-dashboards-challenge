// Code begun with Dom's office hours demonstration from 12/11/21

console.log("plots.js is loaded");

// FUNCTION FOR THE BAR CHART

function barChart(sampleID) {

    console.log(`Draw barchart for (${sampleID})`);

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