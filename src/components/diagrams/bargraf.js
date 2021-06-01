import React, {useContext} from "react";
import * as d3 from 'd3';
import { useD3 } from './useD3';
import './diagram.css';
import { ResultContext } from "../../features/custumer";
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

function Bargraph({intakt, utgift, title}) {
  const [result,setResult] = useContext(ResultContext);
  //const [year] = useContext(YearContext);
  const ref = useD3(
    (svg) => {
      // set the dimensions and margins of the graph
      const height = document.getElementById("bar").offsetHeight-60;
      const width = document.getElementById("bar").offsetWidth-74;
      const margin = { top: 20, right: 5, bottom: 20, left: 45 };
     d3.select(".bargraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      d3.select("#barg")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
// List of subgroups = header of the csv files = soil condition here
var data = [
 {
    name: "Utgift",
    value: utgift
  }, {
    name: "Inkomst",
    value: intakt
  },
]
  // Add X axis
var x = d3.scaleLinear()
  .domain([0, Math.max(intakt, utgift)])
  .range([0, width]);

d3.select(".barx-axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSize(0));

// Add Y axis
var y = d3.scaleBand()
  .domain(d3.map(data, function(d){
    return(d.name)}))
  .range([ height, 0 ])
  .padding([0.2]);

d3.select(".bary-axis")
.call(d3.axisLeft(y));

//Grid x-axis
d3.select(".bargrid")	
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(d3.scaleLinear().range([0, (width + margin.left + margin.right)]))
          .ticks(10)
          .tickSize(-height)
          .tickFormat("")
)

// Define the div for the tooltip
var div = d3.select("#barToltip")			
    .attr("class", "tooltip")	
    .style("color", "#f5f5f5") 
    //.style("opacity", 0);barToltip1
var div1 = d3.select("#barToltip1")			
    .attr("class", "tooltip")	
    .style("color", "#f5f5f5") 

div.html("<b>Inkomst: " + intakt + result.enhet +"</b>")	
    .style("left", ((document.getElementById("bar").offsetLeft + 100) +"px"))
    .style("top", (y.bandwidth()+ margin.top/2)+"px");
    
div1.html("<b>Utgift: " + utgift + result.enhet+ "</b>")	
    .style("left", ((document.getElementById("bar").offsetLeft + 100 )+"px"))
    .style("top", (y.bandwidth()*1.9 + margin.top)+"px");

//test over
d3.select("#bartext")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 4))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text(title) //+" - år" +year);

// color palette = one color per subgroup
var color = d3.scaleOrdinal()
  .domain(d3.map(data, function(d){
    return(d.name)}))
  .range(['#E00022','#00B309','#2A2D34']) 
var shadowColor = d3.scaleOrdinal()
  .domain(d3.map(data, function(d){
    return(d.name)}))
  .range(['#B4001B','#008F07','#212329']) //red, green, gray


// Show the bars create
d3.select(".barplot-area")
  .selectAll("rect")
  .data(data)
  .enter().append("rect")
    .attr("x", function(d) { return 0; })
    .attr("fill", function(d) {return color(d.name); });

//Uppdate
d3.select(".barplot-area")
    .selectAll("rect")
    .data(data)
    .attr("y", function(d) { return y(d.name)})
    .attr("height", y.bandwidth())
    .attr("width",function(d) { return  0; }) 
    .attr("name", function(d) { return  d.name; })
    .attr("value", function(d) { return  d.value; })
    .attr("class", "pointer")
    .on("click", function(d, a){openL(a.name)})
    .on("mouseover", function(d) {
      d3.select(this)
        .attr("fill", function(d) { return shadowColor(d.name)});	
    /* div.transition()		
          .duration(200)		
          .style("opacity",1);	
      div.html( d3.select(this).attr("name") + ": " + d3.select(this).attr("value")+ result.enhet)	
          .style("left", (document.getElementById("bar").offsetLeft + 100 +"px")		)
          .style("top",  
          (Number(d3.select(this).attr("height")) +
          Number(d3.select(this).attr("y")) +
          "px"));	*/
      })					
   .on("mouseout", function(d) {		
        d3.select(this)
        .attr("fill", function(d) { return color(d.name) });
/*        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
        d3.select(this)
            .attr("fill", function(d) { return color(d.name) });	 */
    }).transition().duration(result.duration*2)	
    .attr("width",function(d) { return  x(d.value); }) 
   
  },
    [intakt, utgift]
  );
  function helpfunc(){
    setResult({
      enhet: result.enhet,
      duration: result.duration,
      popupVisible: true,
      popupTVisible: false,
      title: "Stapeldiagram",
    })
    
  }
  function openL(a){
    setResult({
      enhet: result.enhet,
      duration: result.duration,
      popupVisible: false,
      popupTVisible: true,
      title: a,
    })
    
  }
  return (
    <div className="card" id="bar" >
        <div id="barToltip"></div>
        <div id="barToltip1"></div>
        <div className="rightcorner">
            <IconButton  id="barhelp" aria-label="Filter" onClick={helpfunc} >
              <HelpIcon style={{fontSize: "small"}}   />
            </IconButton>
        </div>
        <svg
          className="bargraph"
          ref={ref}
        ><g id="barg"> 
          <text id="bartext"/>
          <g className="bargrid" />
          <g className="barplot-area"/>
          <g className="barx-axis" />
          <g className="bary-axis" />
        </g>
        </svg>
    </div>
  );
}
export default Bargraph;