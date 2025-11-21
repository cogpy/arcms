////FUNCTIONS FOR KGAME/////

//SET GLOBAL VARIABLES//

var f; 
var itemnumber = 0;
itemArray = new Array("Kitchen floor","Windows","Kitchen table","Counter top","new walls to be built","Small garden","Fireplace","Thick walls around the room","Stove, sink, refrigerator, etc","Cabinets below counter","Cabinets above counter","Lights and lighting","Plaster and paint","Chairs, soft and hard","Garden benches, flowerbeds etc");

unitsArray = new Array("square feet","total square feet of windows","area of table in square feet","length of counter in feet","length of new walls along floor in feet","area of garden in square feet","how many","running length in feet","number of appliances","running length in feet","running length in feet","number of light fixtures","surface area in square feet","number of chairs","length in feet of all items together");

guessArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);



//********************************************// 
function Units() {
document.orderform.floorprices.value=document.orderform.floortypes.options[document.orderform.floortypes.selectedIndex].value;
document.orderform.windowprices.value=document.orderform.windowtypes.options[document.orderform.windowtypes.selectedIndex].value;
document.orderform.tableprices.value=document.orderform.tabletypes.options[document.orderform.tabletypes.selectedIndex].value;
document.orderform.countertopprices.value=document.orderform.countertoptypes.options[document.orderform.countertoptypes.selectedIndex].value;

document.orderform.wallprices.value=document.orderform.walltypes.options[document.orderform.walltypes.selectedIndex].value;
document.orderform.gardenprices.value=document.orderform.gardentypes.options[document.orderform.gardentypes.selectedIndex].value;
document.orderform.fireplaceprices.value=document.orderform.fireplacetypes.options[document.orderform.fireplacetypes.selectedIndex].value;
document.orderform.thickwallprices.value=document.orderform.thickwalltypes.options[document.orderform.thickwalltypes.selectedIndex].value;

document.orderform.stoveprices.value=document.orderform.stovetypes.options[document.orderform.stovetypes.selectedIndex].value;
document.orderform.cabinetslowprices.value=document.orderform.cabinetslowtypes.options[document.orderform.cabinetslowtypes.selectedIndex].value;
document.orderform.cabinetshighprices.value=document.orderform.cabinetshightypes.options[document.orderform.cabinetshightypes.selectedIndex].value;
document.orderform.lightingprices.value=document.orderform.lightingtypes.options[document.orderform.lightingtypes.selectedIndex].value;

document.orderform.wallsurfaceprices.value=document.orderform.wallsurfacetypes.options[document.orderform.wallsurfacetypes.selectedIndex].value;
document.orderform.chairsprices.value=document.orderform.chairstypes.options[document.orderform.chairstypes.selectedIndex].value;
document.orderform.stuffprices.value=document.orderform.stufftypes.options[document.orderform.stufftypes.selectedIndex].value;


}
  
//***********************************************

function Monster() {

//alert("Monster");
document.orderform.targetbudget2.value=document.orderform.targetbudget.value;
Units();
CalculateTotals();
//alert("secondMonster");
//reCalculate();
overBudget();
//alert("thirdMonster");
//CalculatePercent();
Current();


document.orderform.yellowbudget.value=document.orderform.targetbudget2.value;
document.orderform.yellowtotal.value=document.orderform.grandtotal.value;
   setTimeout("Monster()",1000);

}

//********************************************//
 

function setZeros() {
if (f.pc1.value==0) {f.total1.value=0}; 
if (f.pc2.value==0) {f.total2.value=0};
if (f.pc3.value==0) {f.total3.value=0};
if (f.pc4.value==0) {f.total4.value=0};
if (f.pc5.value==0) {f.total5.value=0};
if (f.pc6.value==0) {f.total6.value=0};
if (f.pc7.value==0) {f.total7.value=0};
if (f.pc8.value==0) {f.total8.value=0};
if (f.pc9.value==0) {f.total9.value=0};
if (f.pc10.value==0) {f.total10.value=0};
if (f.pc11.value==0) {f.total11.value=0};
if (f.pc12.value==0) {f.total12.value=0};
if (f.pc13.value==0) {f.total13.value=0};
if (f.pc14.value==0) {f.total14.value=0};
if (f.pc15.value==0) {f.total15.value=0};

}

 



//********************************************//
 
function CalculateTotals() {
   f=document.orderform;
   f.total1.value=parseInt(f.sf1.value)*parseFloat(f.floorprices.value);
   f.total2.value=parseInt(f.sf2.value)*parseFloat(f.windowprices.value);
   f.total3.value=parseInt(f.sf3.value)*parseFloat(f.tableprices.value);
   f.total4.value=parseInt(f.sf4.value)*parseFloat(f.countertopprices.value);
   
f.total5.value=parseInt(f.sf5.value)*parseFloat(f.wallprices.value);
   f.total6.value=parseInt(f.sf6.value)*parseFloat(f.gardenprices.value);
   f.total7.value=parseInt(f.sf7.value)*parseFloat(f.fireplaceprices.value);
   f.total8.value=parseInt(f.sf8.value)*parseFloat(f.thickwallprices.value);

f.total9.value=parseInt(f.sf9.value)*parseFloat(f.stoveprices.value);
   f.total10.value=parseInt(f.sf10.value)*parseFloat(f.cabinetslowprices.value);
   f.total11.value=parseInt(f.sf11.value)*parseFloat(f.cabinetshighprices.value);
   f.total12.value=parseInt(f.sf12.value)*parseFloat(f.lightingprices.value);

f.total13.value=parseInt(f.sf13.value)*parseFloat(f.wallsurfaceprices.value);
   f.total14.value=parseInt(f.sf14.value)*parseFloat(f.chairsprices.value);
   f.total15.value=parseInt(f.sf15.value)*parseFloat(f.stuffprices.value);


//start new section on zeros

setZeros();



//end new section on zeros  



f.grandtotal.value=parseInt(f.total1.value)
                     +parseInt(f.total2.value)
                     +parseInt(f.total3.value)
                     +parseInt(f.total4.value)
 				     +parseInt(f.total5.value)
                     +parseInt(f.total6.value)
                     +parseInt(f.total7.value)
 				     +parseInt(f.total8.value)
                     +parseInt(f.total9.value)
                     +parseInt(f.total10.value)
					 +parseInt(f.total11.value)
                     +parseInt(f.total12.value)
                     +parseInt(f.total13.value)
 				     +parseInt(f.total14.value)
                     +parseInt(f.total15.value);
                    
}

//********************************************//

function overBudget() {
		if (parseInt(document.orderform.grandtotal.value) > parseInt(document.orderform.targetbudget2.value) ) 
{hideElement ("ok"); showElement("alertdiv") } else

{showElement ("ok"); hideElement("alertdiv") }
	}

	

//********************************************//
 
// (parseInt(document.orderform.grandtotal.value) > parseInt(document.orderform.targetbudget2.value) 



//********************************************//
//NOT USED RIGHT NOW

 function CalculatePercent(){
   f=document.orderform;
   f.percenttotal.value=parseInt(f.pc1.value)+parseInt(f.pc2.value)+parseInt(f.pc3.value)+parseInt(f.pc4.value)+parseInt(f.pc5.value)+parseInt(f.pc6.value)+parseInt(f.pc7.value)+parseInt(f.pc8.value)+parseInt(f.pc9.value)+parseInt(f.pc10.value)+parseInt(f.pc11.value)+parseInt(f.pc12.value)+parseInt(f.pc13.value)+parseInt(f.pc14.value)+parseInt(f.pc15.value);
   }



//********************************************//
 
 


function reCalcIntuits() {

f=document.orderform;
   f.intuitsum.value=parseInt(f.intuit1.value)+parseInt(f.intuit2.value)+parseInt(f.intuit3.value)+parseInt(f.intuit4.value)+parseInt(f.intuit5.value)+parseInt(f.intuit6.value)+parseInt(f.intuit7.value)+parseInt(f.pc8.value)+parseInt(f.intuit9.value)+parseInt(f.intuit10.value)+parseInt(f.intuit11.value)+parseInt(f.intuit12.value)+parseInt(f.intuit13.value)+parseInt(f.intuit14.value)+parseInt(f.intuit15.value);

f.intuit1.value=Math.round(100*parseInt(f.intuit1.value)/parseInt(f.intuitsum.value));
f.intuit2.value=Math.round(100*parseInt(f.intuit2.value)/parseInt(f.intuitsum.value));
f.intuit3.value=Math.round(100*parseInt(f.intuit3.value)/parseInt(f.intuitsum.value));
f.intuit4.value=Math.round(100*parseInt(f.intuit4.value)/parseInt(f.intuitsum.value));
f.intuit5.value=Math.round(100*parseInt(f.intuit5.value)/parseInt(f.intuitsum.value));
f.intuit6.value=Math.round(100*parseInt(f.intuit6.value)/parseInt(f.intuitsum.value));
f.intuit7.value=Math.round(100*parseInt(f.intuit7.value)/parseInt(f.intuitsum.value));
f.intuit8.value=Math.round(100*parseInt(f.intuit8.value)/parseInt(f.intuitsum.value));
f.intuit9.value=Math.round(100*parseInt(f.intuit9.value)/parseInt(f.intuitsum.value));
f.intuit10.value=Math.round(100*parseInt(f.intuit10.value)/parseInt(f.intuitsum.value));
f.intuit11.value=Math.round(100*parseInt(f.intuit11.value)/parseInt(f.intuitsum.value));
f.intuit12.value=Math.round(100*parseInt(f.intuit12.value)/parseInt(f.intuitsum.value));
f.intuit13.value=Math.round(100*parseInt(f.intuit13.value)/parseInt(f.intuitsum.value));
f.intuit14.value=Math.round(100*parseInt(f.intuit14.value)/parseInt(f.intuitsum.value));
f.intuit15.value=Math.round(100*parseInt(f.intuit15.value)/parseInt(f.intuitsum.value));


 setTimeout("reCalcIntuits()",5000);


}

//********************************************//
//NOT USED RIGHT NOW

 function reCalculate(){
   f=document.orderform;
   f.pc1.value=100*parseInt(f.pc1.value)/parseInt(f.percenttotal.value);
f.pc2.value=100*parseInt(f.pc2.value)/parseInt(f.percenttotal.value);
f.pc3.value=100*parseInt(f.pc3.value)/parseInt(f.percenttotal.value);
f.pc4.value=100*parseInt(f.pc4.value)/parseInt(f.percenttotal.value);
f.pc5.value=100*parseInt(f.pc5.value)/parseInt(f.percenttotal.value);
f.pc6.value=100*parseInt(f.pc6.value)/parseInt(f.percenttotal.value);
f.pc7.value=100*parseInt(f.pc7.value)/parseInt(f.percenttotal.value);
f.pc8.value=100*parseInt(f.pc8.value)/parseInt(f.percenttotal.value);
f.pc9.value=100*parseInt(f.pc9.value)/parseInt(f.percenttotal.value);
f.pc10.value=100*parseInt(f.pc10.value)/parseInt(f.percenttotal.value);
f.pc11.value=100*parseInt(f.pc11.value)/parseInt(f.percenttotal.value);
f.pc12.value=100*parseInt(f.pc12.value)/parseInt(f.percenttotal.value);
f.pc13.value=100*parseInt(f.pc13.value)/parseInt(f.percenttotal.value);
f.pc14.value=100*parseInt(f.pc14.value)/parseInt(f.percenttotal.value);
f.pc15.value=100*parseInt(f.pc15.value)/parseInt(f.percenttotal.value);


f.pc1.value=Math.round(f.pc1.value);
f.pc2.value=Math.round(f.pc2.value);
f.pc3.value=Math.round(f.pc3.value);
f.pc4.value=Math.round(f.pc4.value);
f.pc5.value=Math.round(f.pc5.value);
f.pc6.value=Math.round(f.pc6.value);
f.pc7.value=Math.round(f.pc7.value);
f.pc8.value=Math.round(f.pc8.value);
f.pc9.value=Math.round(f.pc9.value);
f.pc10.value=Math.round(f.pc10.value);
f.pc11.value=Math.round(f.pc11.value);
f.pc12.value=Math.round(f.pc12.value);
f.pc13.value=Math.round(f.pc13.value);
f.pc14.value=Math.round(f.pc14.value);
f.pc15.value=Math.round(f.pc15.value);

CalculatePercent();
   

}

//********************************************//

 function Current(){
   f=document.orderform;
   f.actpc1.value=Math.round(100*parseInt(f.total1.value)/parseInt(f.grandtotal.value));
   f.actpc2.value=Math.round(100*parseInt(f.total2.value)/parseInt(f.grandtotal.value));
   f.actpc3.value=Math.round(100*parseInt(f.total3.value)/parseInt(f.grandtotal.value));
   f.actpc4.value=Math.round(100*parseInt(f.total4.value)/parseInt(f.grandtotal.value));

f.actpc5.value=Math.round(100*parseInt(f.total5.value)/parseInt(f.grandtotal.value));
   f.actpc6.value=Math.round(100*parseInt(f.total6.value)/parseInt(f.grandtotal.value));
   f.actpc7.value=Math.round(100*parseInt(f.total7.value)/parseInt(f.grandtotal.value));
   f.actpc8.value=Math.round(100*parseInt(f.total8.value)/parseInt(f.grandtotal.value));

f.actpc9.value=Math.round(100*parseInt(f.total9.value)/parseInt(f.grandtotal.value));
   f.actpc10.value=Math.round(100*parseInt(f.total10.value)/parseInt(f.grandtotal.value));
   f.actpc11.value=Math.round(100*parseInt(f.total11.value)/parseInt(f.grandtotal.value));
   f.actpc12.value=Math.round(100*parseInt(f.total12.value)/parseInt(f.grandtotal.value));

f.actpc13.value=Math.round(100*parseInt(f.total13.value)/parseInt(f.grandtotal.value));
   f.actpc14.value=Math.round(100*parseInt(f.total14.value)/parseInt(f.grandtotal.value));
   f.actpc15.value=Math.round(100*parseInt(f.total15.value)/parseInt(f.grandtotal.value));
   


   f.actpercenttotal.value=parseInt(f.actpc1.value)
                     +parseInt(f.actpc2.value)
                     +parseInt(f.actpc3.value)
                     +parseInt(f.actpc4.value)
					+parseInt(f.actpc5.value)
                     +parseInt(f.actpc6.value)
                     +parseInt(f.actpc7.value)
					+parseInt(f.actpc8.value)
                     +parseInt(f.actpc9.value)
                     +parseInt(f.actpc10.value)
					+parseInt(f.actpc11.value)
                     +parseInt(f.actpc12.value)
                     +parseInt(f.actpc13.value)
					+parseInt(f.actpc14.value)
                     +parseInt(f.actpc15.value);               

}

//********************************************//
 
function hideAll() {
hideElement("table1");hideElement("table2");hideElement("table3");hideElement("table4");hideElement("black");hideElement("preamble");hideElement("intuitive");hideElement("main");hideElement("result");hideElement("feeling");hideElement("quantities");hideElement("money");hideElement("remember");
}

//********************************************//
 
function scoretoPercent() {
 if (parseInt(f.score1.value) < 16) {document.orderform.intuit1.value=16-parseInt(document.orderform.score1.value)} else {document.orderform.intuit1.value=0};
 if (parseInt(f.score2.value) < 16) {document.orderform.intuit2.value=16-parseInt(document.orderform.score2.value)} else {document.orderform.intuit2.value=0};
 if (parseInt(f.score3.value) < 16) {document.orderform.intuit3.value=16-parseInt(document.orderform.score3.value)} else {document.orderform.intuit3.value=0};
 if (parseInt(f.score4.value) < 16) {document.orderform.intuit4.value=16-parseInt(document.orderform.score4.value)} else {document.orderform.intuit4.value=0};
 if (parseInt(f.score5.value) < 16) {document.orderform.intuit5.value=16-parseInt(document.orderform.score5.value)} else {document.orderform.intuit5.value=0};
 if (parseInt(f.score6.value) < 16) {document.orderform.intuit6.value=16-parseInt(document.orderform.score6.value)} else {document.orderform.intuit6.value=0};
 if (parseInt(f.score7.value) < 16) {document.orderform.intuit7.value=16-parseInt(document.orderform.score7.value)} else {document.orderform.intuit7.value=0};
 if (parseInt(f.score8.value) < 16) {document.orderform.intuit8.value=16-parseInt(document.orderform.score8.value)} else {document.orderform.intuit8.value=0};
 if (parseInt(f.score9.value) < 16) {document.orderform.intuit9.value=16-parseInt(document.orderform.score9.value)} else {document.orderform.intuit9.value=0};
 if (parseInt(f.score10.value) < 16) {document.orderform.intuit10.value=16-parseInt(document.orderform.score10.value)} else {document.orderform.intuit10.value=0};
 if (parseInt(f.score11.value) < 16) {document.orderform.intuit11.value=16-parseInt(document.orderform.score11.value)} else {document.orderform.intuit11.value=0};
 if (parseInt(f.score12.value) < 16) {document.orderform.intuit12.value=16-parseInt(document.orderform.score12.value)} else {document.orderform.intuit12.value=0};
 if (parseInt(f.score13.value) < 16) {document.orderform.intuit13.value=16-parseInt(document.orderform.score13.value)} else {document.orderform.intuit13.value=0};
 if (parseInt(f.score14.value) < 16) {document.orderform.intuit14.value=16-parseInt(document.orderform.score14.value)} else {document.orderform.intuit14.value=0};
 if (parseInt(f.score15.value) < 16) {document.orderform.intuit15.value=16-parseInt(document.orderform.score15.value)} else {document.orderform.intuit15.value=0};


}

//********************************************//

function scoreConversion() {
 document.orderform.intuit1.value=3*parseInt(document.orderform.score1.value);
document.orderform.intuit2.value=3*parseInt(document.orderform.score2.value);
document.orderform.intuit3.value=3*parseInt(document.orderform.score3.value);
document.orderform.intuit4.value=3*parseInt(document.orderform.score4.value);
document.orderform.intuit5.value=3*parseInt(document.orderform.score5.value);
document.orderform.intuit6.value=3*parseInt(document.orderform.score6.value);
document.orderform.intuit7.value=3*parseInt(document.orderform.score7.value);
document.orderform.intuit8.value=3*parseInt(document.orderform.score8.value);
document.orderform.intuit9.value=3*parseInt(document.orderform.score9.value);
document.orderform.intuit10.value=3*parseInt(document.orderform.score10.value);
document.orderform.intuit11.value=3*parseInt(document.orderform.score11.value);
document.orderform.intuit12.value=3*parseInt(document.orderform.score12.value);
document.orderform.intuit13.value=3*parseInt(document.orderform.score13.value);
document.orderform.intuit14.value=3*parseInt(document.orderform.score14.value);
document.orderform.intuit15.value=3*parseInt(document.orderform.score15.value);


}





//********************************************//

function intuitConversion() {
 document.orderform.pc1.value=parseInt(document.orderform.intuit1.value);
document.orderform.pc2.value=parseInt(document.orderform.intuit2.value);
document.orderform.pc3.value=parseInt(document.orderform.intuit3.value);
document.orderform.pc4.value=parseInt(document.orderform.intuit4.value);
document.orderform.pc5.value=parseInt(document.orderform.intuit5.value);
document.orderform.pc6.value=parseInt(document.orderform.intuit6.value);
document.orderform.pc7.value=parseInt(document.orderform.intuit7.value);
document.orderform.pc8.value=parseInt(document.orderform.intuit8.value);
document.orderform.pc9.value=parseInt(document.orderform.intuit9.value);
document.orderform.pc10.value=parseInt(document.orderform.intuit10.value);
document.orderform.pc11.value=parseInt(document.orderform.intuit11.value);
document.orderform.pc12.value=parseInt(document.orderform.intuit12.value);
document.orderform.pc13.value=parseInt(document.orderform.intuit13.value);
document.orderform.pc14.value=parseInt(document.orderform.intuit14.value);
document.orderform.pc15.value=parseInt(document.orderform.intuit15.value);


}


//********************************************//



//********************************************//

function nextItem() {
itemnumber = itemnumber+1;
f.item.value = itemArray[itemnumber];
f.units.value = unitsArray[itemnumber];
guessArray[itemnumber]=document.orderform.amount.value;
place="sf"+itemnumber;
f[place].value = guessArray[itemnumber];
}

//********************************************//

//********************************************//

function fillCellswithGuesses() {
for (x = 1 ; x < 16; x++)
{place="sf"+x;

f[place].value = guessArray[x];
}
}

//********************************************//
 
function intuittoPc() {
   f=document.orderform;
   f.pc1.value=parseInt(f.intuit1.value);
   f.pc2.value=parseInt(f.intuit2.value);
   f.pc3.value=parseInt(f.intuit3.value);
   f.pc4.value=parseInt(f.intuit4.value);
   
f.pc5.value=parseInt(f.intuit5.value);
   f.pc6.value=parseInt(f.intuit6.value);
   f.pc7.value=parseInt(f.intuit7.value);
   f.pc8.value=parseInt(f.intuit8.value);

f.pc9.value=parseInt(f.intuit9.value);
   f.pc10.value=parseInt(f.intuit10.value);
   f.pc11.value=parseInt(f.intuit11.value);
   f.pc12.value=parseInt(f.intuit12.value);

f.pc13.value=parseInt(f.intuit13.value);
   f.pc14.value=parseInt(f.intuit14.value);
   f.pc15.value=parseInt(f.intuit15.value);
   
}

//********************************************//

//********************************************//
 
function scoretoPc() {
   f=document.orderform;
   f.pc1.value=parseInt(f.score1.value);
   f.pc2.value=parseInt(f.score2.value);
   f.pc3.value=parseInt(f.score3.value);
   f.pc4.value=parseInt(f.score4.value);
   
f.pc5.value=parseInt(f.score5.value);
   f.pc6.value=parseInt(f.score6.value);
   f.pc7.value=parseInt(f.score7.value);
   f.pc8.value=parseInt(f.score8.value);

f.pc9.value=parseInt(f.score9.value);
   f.pc10.value=parseInt(f.score10.value);
   f.pc11.value=parseInt(f.score11.value);
   f.pc12.value=parseInt(f.score12.value);

f.pc13.value=parseInt(f.score13.value);
   f.pc14.value=parseInt(f.score14.value);
   f.pc15.value=parseInt(f.score15.value);
   
}

//********************************************//
