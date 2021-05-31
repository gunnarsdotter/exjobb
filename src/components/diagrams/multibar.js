import React, {useContext} from "react";
import * as d3 from 'd3';
import { useD3 } from './useD3';
import './diagram.css';
import { ResultContext, driftsgrenarnamn } from "../../features/custumer";
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

function Multibar({data, title, setPage}) {
  const [result, setResult] = useContext(ResultContext);
  
  const ref = useD3(
    (svg) => {
      // set the dimensions and margins of the graph
      const height = document.getElementById("multi").offsetHeight-50;
      const width = document.getElementById("multi").offsetWidth-74;
      const margin = { top: 20, right: 10, bottom: 15, left: 40 };
      
     d3.select(".multibar")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      d3.select("#g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// List of subgroups = header of the csv files = soil condition here
const subgroups = ["intakt", "utgift"];

  // Add X axis
var x = d3.scaleBand()
  .domain(d3.map(data, function(d){
    return(d.name)}))
  .range([0, width])
  .padding([0.2]);

d3.select(".x-axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSize(0));

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d){
    return Math.max(d.values.intakt, d.values.utgift)
  })]) 
  .range([ height, 0 ]);

d3.select(".y-axis")
.call(d3.axisLeft(y));

// add the Y gridlines
d3.select(".multigrid")
  .attr("class", "grid")
  .call(d3.axisLeft(y)
      .ticks(10)
      .tickSize(-width)
      .tickFormat(""))


// Define the div for the tooltip
var div = d3.select("#multiToltip")
    .attr("class", "tooltip")				
    .style("opacity", 0);
    
//test over
d3.select("#multitext")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 4))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text(title);

// Another scale for subgroup position?
var xSubgroup = d3.scaleBand()
.domain(subgroups)
.range([0, x.bandwidth()])
.padding([0.05])

// color palette = one color per subgroup
var color = d3.scaleOrdinal()
  .domain(subgroups)
  .range(['#00B309','#E00022','#2A2D34']) //green, red, gray
var shadowColor = d3.scaleOrdinal()
  .domain(subgroups)
  .range(['#008F07','#B4001B','#212329']) 

// Show the bars create
d3.select(".plot-area")
  .selectAll("g")
  // Enter in data = loop group per group
  .data(data)
  .enter()
  .append("g")
    .attr("x2", function(d) { return x(d.name)  ; })
    .attr("gren", function(d) { return d.name; })
  .selectAll("rect")
  .data(function(d) {
    return subgroups.map(function(key) { 
      return {key: key, value: d.values[key]}; }); 
   })
  .enter().append("rect")
    .attr("fill", function(d) { return color(d.key); })
    //uppdates everytime
  d3.select(".plot-area")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data)
      .attr("transform", function(d) {return "translate(" + x(d.name) + ",0)"; })
      .selectAll("rect")
      .data(function(d) {
        return subgroups.map(function(key) { 
          return {key: key, value: d.values[key]}; }); 
      })
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(0); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) {return 0; })
      .attr("name", function(d) { return (d.key); })
      .attr("value", function(d) { return (d.value); })
      .on("mouseover", function(d) {
        d3.select(this)
          .attr("fill", function(d) {return shadowColor(d.key)});	
        div.transition()		
            .duration(200)		
            .style("opacity", .9);	
        div.html("<b>"+d3.select(this.parentNode).attr("gren") + "</b><br/>"+
          (d3.select(this).attr("name") === "utgift" ? "Utgift" : "Inkomst" )
              + " : " + d3.select(this).attr("value")+ result.enhet)	
            .style("left", (53 + Number(d3.select(this).attr("x"))
                  + Number(d3.select(this.parentNode).attr("x2"))) +"px")		
            .style("top",  d3.select(this).attr("y") + "px");	
        })					
      .on("mouseout", function(d) {		
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
          d3.select(this)
              .attr("fill", function(d) {
                return color(d.key) });	
      })
      .on("click", function(d) {return  findPage(this)})
      .transition().duration(result.duration)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) {return height - y(d.value); })
    },
    [data]
  );

  function findPage(d){
    var i = 0;
    driftsgrenarnamn.forEach(element => {
      if(d3.select(d.parentNode).attr("gren")=== element)setPage(i);
      i++;
    });
    
    
  }
  function helpfunc(){
    setResult({
      enhet: result.enhet,
      duration: result.duration,
      popupVisible: true,
      title: "Multi Stapeldiagram",
    })
  }
  return (
    <div className="card" id="multi">
        <div id="multiToltip"></div>
        <div className="rightcorner">
            <label >Beroende</label>
            <input type="checkbox" id="beroende" name="beroende"/>  
            <IconButton  id="barhelp" aria-label="Filter" onClick={helpfunc} >
              <HelpIcon style={{fontSize: "small"}}   />
            </IconButton>
        </div>
        <svg
        className="multibar"
        ref={ref}
        ><g id="g"> 
          <text id="multitext"/>
          <g className="multigrid" />
          <g className="plot-area pointer" />
          <g className="x-axis" />
          <g className="y-axis" />
        </g>
        </svg>
    </div>
  );
}
export default Multibar;