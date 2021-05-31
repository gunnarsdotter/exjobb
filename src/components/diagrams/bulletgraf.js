import React, {useContext} from "react";
import * as d3 from 'd3';
import { useD3 } from './useD3';
import './diagram.css';
import { ResultContext } from "../../features/custumer";

function Bulletgraph({object, v}) {
  const [result] = useContext(ResultContext);
  const ref = useD3(
    (svg) => {
      // set the dimensions and margins of the graph
      const height = (v*4);//document.getElementById("bulletgraph").offsetHeight-60;
      const width = document.getElementById("bulletCard").offsetWidth-150;
      const margin = { top: 5, right: 20, bottom: 10, left: 75 };
      svg.attr("height", (v*4 + 20));
      var div = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");
      createNewBulletGraph(div, object, height, width, margin, v, result)
      

    },[]);
    return (
      <div className="bulletContainer">
        <svg
          className="bulletgraph"
          ref={ref}
        >
        </svg>
      </div>
    );
  }
  
export default Bulletgraph

function createNewBulletGraph(div, object, height, width, margin, v, result){
  //x-axel
  var x = d3.scaleLinear()
    .domain([object.zero, object.high])
    .range([0, width-10]);
      
  div.append("g")
    .attr("class",".bulletx-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));
  
  // Add Y axis
  var y = d3.scaleBand()
    .domain(object.title)
    .range([ (height+margin.bottom), 0 ]);
  
  div.append("g")
      .attr("class",".bulllety-axis")
      .attr("visibility","hidden")
      .call(d3.axisLeft(y));

  //text Left size
  var title = div.append("g")
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + height / 2 + ")");

  title.append("text")
    .attr("class", "title")
    .style("font-size", "10px") 
    .text(object.title);

  title.append("text")
    .attr("class", "subtitle")
    .attr("dy", "1em")
    .style("font-size", "8px") 
    .text(object.subtitle);
  
 
  //Color
  var color = d3.scaleOrdinal()
    .domain(["low", "midd", "high","bar", "goal", "barback"])
    .range(['#E00022','#FFFF00','#00B309', '#2A2D34', "#FFD700", "#cbcbd4"]) //2A2D34
  //var bar = null;
  //Range bars
  div.append("g")
    .attr("class","plot-area")
    .selectAll("rect")
    .data([{key: "high", value:object.high},
          {key:"midd", value: object.midd},
          {key:"low", value: object.low}, 
          {key: "barback", value: object.high}, 
          {key: "bar", value: object.value}])
    .enter().append("rect")
      .attr("class", function(d) { 
        //if(d.key === "bar") bar = this;
        return d.key; } )
      .attr("x", 0)
      .attr("y", function(d) { 
        return (d.key === "bar" || d.key === "barback")? (v*2) : v; })
      .attr("height",  function(d) { return (d.key === "bar" || d.key === "barback")? v : (v*3); } )
      .attr("width",function(d) { return (d.key === "bar"? 0: x(d.value)); } )
      .attr("fill", function(d) { return color(d.key); })  
      .on("mouseover", function(d) { hovering(null, line, object, x, color)})					
      .on("mouseout", function(d) { hoveringBack(null, line, color)})
      //.transition().duration(result.duration*2)
      .attr("width",function(d) { return x(d.value)} )


  //Gold line 
  var line = div.append("path")
  .datum([v, height])
  .attr("d", d3.line()
    .x(x(object.mal))
    .y(function(d) { return d})
    )
  .attr("stroke-width", 5)
  .style("fill", "none") 
  .attr("class", "pointer")
  .on("mouseover", function(d) { hovering(null, line, object, x, color)})					
  .on("mouseout", function(d) {hoveringBack(null, line, color)})
  //.transition().duration(result.duration*3)
  .attr("stroke", "#2A2D34")
}

function hovering(bar, line, object, x, color){
  var place = object.mal;
  //change color 
  if(bar !== null){
    place = object.value;
    bar.style.fill = color("goal");}
  if(line !== null) {
    place = object.mal;
    line.attr("stroke", function(d) { return color("goal") });
  }
  // Define the div for the tooltip
  var hover = d3.select("#bulletToltip");
  var kvar = object.zero < object.high ? object.mal - object.value:object.value - object.mal ;
  var text = "Kvar till mål: "+ Math.round((kvar + Number.EPSILON) * 10000) / 10000;
  if(kvar <= 0){
    text = "Du har klarat ditt mål!";
    //hover.style("border","4px solid gold"); 
  }
  //Change tooltip
  hover.transition()		
      .duration(200)		
      .style("opacity",1);	
  hover.html( "<b>"+object.title+"</b><br>"+
        "Värde: " + object.value+" , "+
        "Mål: " + object.mal +"<br>"+ text)	
      .style("left", ((x(place) + 10)+"px"))
      .style("top", (object.id*70) + "px");	  
  
}

function hoveringBack(bar, line, color){
  //Change tooltip
  // Define the div for the tooltip
  d3.select("#bulletToltip")
    .transition()		
    .duration(500)		
    .style("opacity", 0)
    //.style("border","0px solid gold"); 
  //change color 
  if(bar !== null) bar.style.fill = color("bar");
  if(line !== null)  line.attr("stroke", function(d) { return color("bar") });	    
}