// Code begun with Dom's office hours code from 12/11/21

console.log("plots.js is loaded");

function InitDashboard()
{
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

    })



}

InitDashboard();