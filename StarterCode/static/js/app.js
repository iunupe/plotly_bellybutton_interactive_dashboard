// function person(name, favColor) {
//     console.log("Hello, my name is " + name + " and my favorite color is " + favColor + ".");
// }

// var johnName = "John Doe";
// var johnFavColor = "blue";

// person("John Doe", "blue");
// person("Jane Smith", "green");

// Import Data using ".then"
d3.json(`samples.json`).then(data => {

    // Create Dropdown Menu
    var dropdown = d3.select("#selDataset")

    // Use For Each Command To Cycle Through Data
    data.names.forEach(entry => {

        // Append Value Into Dropdown Menu
        dropdown.append('option').attr('value', entry).text(entry).property('value')
    })

    // ---------------------------------------------------------

    // Update Page on New Data Inputs
    function updatePage(meta, sample) {

        // Select Sample Metadata
        var sampleData = d3.select(`#sample-metadata`)

        // Clear HTML From Data Inputs
        sampleData.html("")

        // Use For Each Again To Cycle Through Key, Value Pairs
        Object.entries(meta).forEach(function ([key, value]) {

            // Append Value Into Paragraph Tag
            sampleData.append('p').text(`${key}:${value}`)

        })

        // ------------------------------------------------------------- 

        // Create X Values
        var xBar = sample.sample_values.slice(0, 10).reverse()

        // Create Y Values
        var yBar = sample.otu_ids.slice(0, 10).reverse().map(d => "OTU " + d)

        // Create Text Values
        var textBar = sample.otu_labels.slice(0, 10).reverse()

        // Create Bar Chart Data
        var barData = {
            x: xBar,
            y: yBar,
            text: textBar,
            marker: {
                color: 'rgba(78,42,132,1)'
            },
            type: 'bar',
            orientation: 'h'
        }
        // Create Bar Chart Layout
        var barLayout = {
            yaxis: {
                autorange: true,
                type: 'category',
            },
            margin: {
                l: 100,
                r: 100,
                t: 0,
                b: 50
            }
        }

        // Plot Bar Chart 
        Plotly.newPlot("bar", [barData], barLayout, responsive = true)

        // Create Bubble Chart Data
        var bubbleData = [{
            x: sample.otu_ids,
            y: sample.sample_values,
            mode: "markers",
            marker: {
                size: sample.sample_values,
                colorscale: 'Earth',
                color: sample.otu_ids
            },
            text: sample.otu_labels
        }]
        // Create Bubble Chart Layout 
        var bubbleLayout = {
            xaxis: {
                title: "OTU ID"
            },

        }
        // Plot Bubble Chart 
        Plotly.newPlot("bubble", bubbleData, bubbleLayout, responsive = true)

        // Create Gauge Chart Data
        var gaugeData = [{
            value: parseFloat(meta.wfreq),
            title: "<strong>Belly Button Washing Frequency</strong> <br> Scrubs per Week",
            rotation: 90,
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {
                    range: [null, 9]
                },
                bar: {
                    color: "black"
                },
                steps: [{
                        range: [0, 1],
                        color: "rgba(11,156,49,0.2)"
                    },
                    {
                        range: [1, 2],
                        color: 'rgba(11,156,49,0.4)'
                    },
                    {
                        range: [2, 3],
                        color: 'rgba(11,156,49,0.6)'
                    },
                    {
                        range: [3, 4],
                        color: 'rgba(11,156,49,0.8)'
                    },
                    {
                        range: [4, 5],
                        color: 'rgba(11,156,49,1)'
                    },
                    {
                        range: [5, 6],
                        color: 'rgba(219,36,140,1)'
                    },
                    {
                        range: [6, 7],
                        color: 'rgba(219,36,160,1)'
                    },
                    {
                        range: [7, 8],
                        color: 'rgba(219,36,180,1)'
                    },
                    {
                        range: [8, 9],
                        color: 'rgba(219,36,200,1)'
                    }
                ]
            }
        }]

        // Create Gauge Chart Layout
        var gaugeLayout = {
            width: 500,
            height: 400
        }

        // Plot Gauge Chart
        Plotly.newPlot('gauge', gaugeData, gaugeLayout, responsive = true)

    }

    // Create Function To Set Starting Page
    function init() {

        // Create First Metadata
        var firstMetadata = data.metadata[0]

        // Create First Sample
        var firstSample = data.samples[0]

        // Set Starting Page
        updatePage(firstMetadata, firstSample)

        // Prevent Page From Refreshing
        // d3.event.preventDefault();

        // Update Page on New Data Input
        d3.selectAll("#selDataset").on("change", function () {

            // Update Metadata 
            var meta = data.metadata.find(d => d.id == this.value)

            // Update Sample
            var sample = data.samples.find(d => d.id == this.value)

            // Update Page
            updatePage(meta, sample)
        });
    }
    // Deploy Functon
    init()
})