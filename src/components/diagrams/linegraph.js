import React, {useContext} from "react";
import * as d3 from 'd3';
import { useD3 } from './useD3';
import './diagram.css';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import {ResultContext} from '../../features/custumer'

function Linegraph({ title, data}) {
  const [result, setResult] = useContext(ResultContext);
    const ref = useD3(
      (svg) => {
        // set the dimensions and margins of the graph
        const height = document.getElementById("line").offsetHeight-80;
        const width = document.getElementById("line").offsetWidth+100;
        const margin = { top: 30, right: 130, bottom: 30, left: 40 };

     //set width and height
       svg.attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          d3.select("#lineg")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
  var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){
        return d.date }))
    .range([0, width]);
  
  d3.select(".linex-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d => d.getFullYear()).ticks(data.length));
  
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){
      return d3.max(d.data, function(c){
        return c})})])
    .range([ height, 0 ]);

  d3.select(".liney-axis")
  .call(d3.axisLeft(y));
 
  // add the Y gridlines
d3.select(".linegrid")
  .attr("class", "grid")
  .call(d3.axisLeft(y)
      .ticks(10)
      .tickSize(-width)
      .tickFormat(""))

  // Define the div for the tooltip
  var div = d3.select("#lineToltip")
      .attr("class", "tooltip")				
      .style("visibility", "collapse");
  
  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(["Inkomst", "Utgift", "SInkomst", "SUtgift"])
    .range(['#00B309','#E00022','#008F07', '#B4001B',]);
  //text ovan
  d3.select("#linetext")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 4))
      .attr("text-anchor", "middle")  
      .style("font-size", "20px") 
      .text(title);
  //callculate the data
  var ds  = [];
  var line  = [];
  data.map(function(key) { 
      ds.push({date: key.date, value: key.data[1], color: "Inkomst"});
      ds.push({date: key.date, value: key.data[0], color: "Utgift"});
      line.push({
        Inkomst:{date: key.date, value: key.data[1], color: "Inkomst"},
        Utgift: {date: key.date, value: key.data[0], color: "Utgift"}
      });
      return true;
    }); 
  // create the lines
  //green
  d3.select(".lineplot-area")
    .append("path")
    .datum(data)
    //.transition().duration(result.duration)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.data[1]) })
    )
    .attr("stroke", color("Intäkt"))
    .attr("stroke-width", 3)
    .style("fill", "none") 
//red
 d3.select(".lineplot-area")
    .append("path")
    .datum(data)
    //.transition().duration(result.duration)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.data[0])})
    )
    .attr("stroke", color("Utgift"))
    .attr("stroke-width", 3)
    .style("fill", "none") 

//cirkels create 
d3.select(".lineplot-area")
  .selectAll('circle')
  .data(ds).enter()
  .append('circle')
    .attr("class", "pointer")
    .attr("cx", function(d) {return x(d.date) })
    .attr("cy", function(d) { return y(d.value) })
    .attr("r", 6)
    .style("stroke","#2A2D34")
    .style("fill", (function(d) { return color(d.color)}))

//uppdate cirkels
d3.select(".lineplot-area")
    .selectAll('circle')
    .data(ds)
    .attr("cx", function(d) {return x(d.date) })
    .attr("cy", function(d) { return y(d.value)})
    .attr("color", function(d) { return d.color})
    .attr("ar", function(d) { return d.date.getFullYear()})
    .attr("value", function(d) { return d.value})
    .on("mouseover", function(d) { 
      //change color 
      d3.select(this).style("fill",  color(("S"+d3.select(this).attr("color"))));	
      //Change tooltip
      div.transition()		
          .duration(200)		
          .style("visibility", "visible");	
      div.html("<b>" + d3.select(this).attr("color")+"</b><br>"+
          "År: " + d3.select(this).attr("ar")+ "<br>"+
          " Värde: " + d3.select(this).attr("value"))	
          .style("left", (d3.select(this).attr("cx")-10 +"px"))
          .style("top", (d3.select(this).attr("cy") + "px"));	  
    })					
    .on("mouseout", function(d) { 
        //Change tooltip
        div
          .transition()		
          .duration(500)		
          .style("visibility", "collapse");
        //change color 
        d3.select(this).style("fill", color((d3.select(this).attr("color"))));
    });

    svg.append("circle").attr("cx",width + 80).attr("cy",80).attr("r", 6).style("fill", color("Inkomst"))
    svg.append("circle").attr("cx",width + 80).attr("cy",100).attr("r", 6).style("fill",  color("Utgift"))
    svg.append("text").attr("x", width+100).attr("y", 80).text("Inkomst").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", width+100).attr("y", 100).text("Utgift").style("font-size", "15px").attr("alignment-baseline","middle")

     
  },
      [data]
    );
    function helpfunc(){
      setResult({
        enhet: result.enhet,
        duration: result.duration,
        popupVisible: true,
        title: "Linjegraf",
      })
    }
  
    return (
      <div className="card" id="line">
          <div id="lineToltip"></div>
          <div className="rightcorner">
            <IconButton  id="barhelp" aria-label="Filter" onClick={helpfunc} >
              <HelpIcon style={{fontSize: "small"}}   />
            </IconButton>
          </div>
          <svg
            className="linegraph"
            ref={ref}
          > <g id="lineg">
            
            <text id="linetext"/>
            <g className="linegrid" />
            <g className="lineplot-area" />
            <g className="linex-axis" />
            <g className="liney-axis" />
          </g>
          </svg>
      </div>
    );
  }
  
  export default Linegraph;