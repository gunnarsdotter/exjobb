import React, {useContext} from "react";
import * as d3 from 'd3';
import { useD3 } from './useD3';

import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import './diagram.css';
import { ResultContext } from "../../features/custumer";

function CirkelCard({array, title, totalIntakt, vinst}) {
  const [result,setResult] = useContext(ResultContext);
  

  const ref = useD3(
    (svg) => {
       // set the dimensions and margins of the graph
       const height = document.getElementById("CirkelCard").offsetHeight-60;
       const width = document.getElementById("CirkelCard").offsetWidth-85;
       const margin = { top: 30, right: 10, bottom: 20, left: 10 };

      svg.attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
       d3.select("#cirkleg")
         .attr("transform",
               "translate(" + margin.left + "," + margin.top + ")");
      
      const radius = Math.min(width, height) / 2;
      const outerRadius = radius - 10;
      const innerRadius = radius - 10;
      d3.select(".cirkelplot-area")
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")") 

      // Create dummy data
var data = [
    {key: "Direkta", value: array.direkta},
    {key: "Indirekta1", value:  array.indirekta1},
    {key: "Indirekta2", value:   array.indirekta2},
    {key: "Arbete", value:  array.arbete},
    {key: "Avskrivningar", value:  array.avskrivningar},
    {key: "Finansiella", value:  array.finansiella},
    //{key: "Vinst", value:  vinst,}
]
// Define the div for the tooltip
var div = d3.select("#cirkelToltip")			
    .attr("class", "tooltip")	

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(data);

var arcGenerator = d3.arc()
	.innerRadius(radius/2)
	.outerRadius(radius);

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
d3.select(".cirkelplot-area")  
  .selectAll('path')
  .data(data_ready)
  .enter()
  .append('path')
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 1)

d3.select(".cirkelplot-area")  
  .selectAll('path')
  .data(data_ready)
  .attr('d', arcGenerator)
  .attr("name",function(d){ return((d.data.key)) })
  .attr("value",function(d){ return((d.data.value)) })
  .attr('fill', function(d){ 
    return(d.data.key !== "Vinst" ? color(d.data.key) : d.data.value > 0 ? "#00B309" : "#E00022")
  })
  .attr('centerx', function(d){ return arcGenerator.centroid(d)[0]})
  .attr('centery', function(d){ return arcGenerator.centroid(d)[1]})
  .attr("class", "pointer")
  .on("click", function(d, a){openL(a.name)})
  .on("mouseover", function(d) {
    d3.select(this)	
      .attr('fill', function(d){ 
        return(d.data.key !== "Vinst" ? "#fee5d9" : d.data.value > 0 ? "#00B309" : "#ffcdd2")
      })
    div.transition()		
        .duration(200)		
        .style("visibility","visible");	
    div.html( d3.select(this).attr("name") 
        +"<br> Värde: " + d3.select(this).attr("value")+ result.enhet
        +"<br> Brutto marginal: " + Math.round((d3.select(this).attr("value")/totalIntakt + Number.EPSILON) * 10000) /100 + "% "
    )	
        .style("left", ( Number(d3.select(this).attr("centerx"))+ width/2 )+"px")
        .style("top",  (Number(d3.select(this).attr("centery"))+ height/2) + "px" );	
    })					
  .on("mouseout", function(d) {		
        d3.select(this)
        .attr('fill', function(d){ 
          return(d.data.key !== "Vinst" ? color(d.data.key) : d.data.value > 0 ? "#00B309" : "#E00022")
        })
        div.transition()		
        .duration(200)		
        .style("visibility","collapse");	
    })
    
    //test over
  d3.select("#cirkeltext")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 4))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text(title) //+" - år" +year);


    const mitttext = [
      { name:"Direkta",       hi: 0   },
      { name:"Indirekta1",    hi: 15  },
      { name:"Indirekta2",    hi: 30  },
      { name:"Avskrivningar", hi: 45  },
      { name:"Finansiella",   hi: 60  },
    ]
      
      //ledgin
      d3.select("#cirkeltext2").selectAll("circle")
        .data(mitttext)
        .enter()
        .append("circle")
        .attr("r", 6)
        .style("fill", function(d){return color(d.name)} )
      
      d3.select("#cirkeltext2").selectAll("circle")
        .data(mitttext)
        .attr("cx",(width/2-35))
        .attr("cy",function(d){return (height/2 + d.hi)})

      d3.select("#cirkeltext2").selectAll("text")
        .data(mitttext)
        .enter()
        .append("text")
        .text(function(d){return d.name})
        .style("font-size", "15px")
        .attr("alignment-baseline","middle");
        
      d3.select("#cirkeltext2").selectAll("text")
        .data(mitttext)
        .attr("x", width/2-20)
        .attr("y", function(d){return height/2 + d.hi})
  },
    [title, array, vinst, totalIntakt]
  );
function helpfunc(){
  setResult({
    enhet: result.enhet,
    duration: result.duration,
    popupVisible: true,
    title: "Cirkeldiagram",
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
    <div className="card" id="CirkelCard">
      
        <div id="cirkelToltip"></div>
        <div className="rightcorner">
            <IconButton  id="barhelp" aria-label="Filter" onClick={helpfunc} >
              <HelpIcon style={{fontSize: "small"}}   />
            </IconButton>
        </div>
        <svg
          className="cirkelchart"
          ref={ref}
        ><g id="cirkeltext2"/>
          <g id="cirkleg"> 
          <text id="cirkeltext"/>
          
          <g className="cirkelplot-area"/>
        </g>
        </svg>
    </div>
  );
}

export default CirkelCard