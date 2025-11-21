////////////////////////////// accessing all of the fields /////////////////////////////////
// intuitGetValue(3) gets the value of intuit3
// intuitSetValue(3,17) sets the value of intuit3 to 17

// totalGetValue(3) gets the value of total3
// totalSetValue(3,17) sets the value of total3 to 17
// totalRecalculate(3) recalculates the value of total3
//   and then request the recalculation of grandtotal

// totalGetValue(3) gets the value of total3
// totalSetValue(3,17) sets the value of total3 to 17
// totalRecalculate(3) recalculates the value of total3
//   and then request the recalculation of anything that depends on total3

// There are similar functions for intuit, sf, pc, actpc, total, rank, prices, types

// the first item is numbered 1 (e.g. pc1, total1)
// On the other hand, the arrays itemArray and unitsArray start with an index of 0
//  So we have an inconsistency to take into account.
//  We choose to make this array match the earlier arrays, starting at 0
//   This will force us to be careful about indexing into it
var itemNames = new Array('floor','window','table','countertop','wall','garden','fireplace','thickwall','stove','cabinetslow','cabinetshigh','lighting','wallsurface','chairs','stuff')
var numItems = 15;  // This must be set to the number of items
var maxNumberOfQualities = 20;  // set this to some number bigger than the number of
			        // different qualities that will ever be available for
				// a single item 
				// it's much better to make it too big than too small
function lookUpItemName(i)
  { return itemNames[i-1];
  }

function intuitElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform['intuit'+ix];
  }
function intuitGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseInt(intuitElt(ix).value,10);
  }
function intuitSetValue(ix,value)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('value',value,'non-negative number');
    intuitElt(ix).value = value;
  }

function sfElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform['sf'+ix];
  }
function sfGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseInt(sfElt(ix).value,10);
  }
function sfSetValue(ix,value)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('value',value,'non-negative number');
    sfElt(ix).value = value;
  }

function pcElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform['pc'+ix];
  }
function pcGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseInt(pcElt(ix).value,10);
  }
function pcSetValue(ix,value)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('value',value,'non-negative number');
    pcElt(ix).value = value;
  }

function actpcElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform['actpc'+ix];
  }
function actpcGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseInt(actpcElt(ix).value,10);
  }
function actpcSetValue(ix,value)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('value',value,'non-negative number');
    actpcElt(ix).value = value;
  }

function totalElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform['total'+ix];
  }
function totalGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseInt(totalElt(ix).value,10);
  }
function totalSetValue(ix,value)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('value',value,'non-negative number');
    totalElt(ix).value = value;
  }
function totalRecalculate(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    totalSetValue(ix,sfGetValue(ix)*pricesGetValue(ix));
    // propagate
    grandtotalRecalculate();
  }

function rankElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform['rank'+ix];
  }
function rankGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseInt(rankElt(ix).value,10);
  }
function rankSetValue(ix,value)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('value',value,'non-negative number');
    rankElt(ix).value = value;
  }

function pricesElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform[lookUpItemName(ix)+'prices'];
  }
function pricesGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseFloat(pricesElt(ix).value);
  }
function pricesSetValue(ix,value)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('value',value,'non-negative number');
    pricesElt(ix).value = value;
    // propagate
    totalRecalculate(ix);
  }
function pricesRecalculate(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    pricesSetValue(ix,typesGetValue(ix));
  }

function typesElt(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return document.orderform[lookUpItemName(ix)+'types'];
  }
function typesGetValue(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return parseInt(typesElt(ix).value,10);
  }
function typesGetSelectedIndex(ix)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    return typesElt(ix).selectedIndex;
  }
function typesSetSelectedIndex(ix,selected)
  { checkNumberOfParameters();
    checkParam('ix',ix,'item index');
    checkParam('selected',selected,'non-negative number');
    var e = typesElt(ix)
    if (selected < e.length)
      { e.selectedIndex = selected;
      }
    else
      { e.selectedIndex = e.length-1;
      }
    // alert('set ' + ix + ' ' + selected);
    // propagate value
    pricesRecalculate(ix);
  }

function grandtotalElt()
  { return document.orderform.grandtotal;
  }
function grandtotalGetValue()
  { return parseInt(grandtotalElt().value,10);
  }
function grandtotalSetValue(value)
  { checkNumberOfParameters();
    checkParam('value',value,'non-negative number');
    grandtotalElt().value = value;
  }
function grandtotalRecalculate()
  { var total = 0;
    for (var ix = 1; ix <= numItems; ix++)
      { total += totalGetValue(ix);
      }
    grandtotalSetValue(total);
  }

////////////////////////////////// functions to aid debugging ////////////////////////////////
function getFunctionName(fcn)
  { return fcn.toString().match(/function (\w*)/)[1];
  }

function checkNumberOfParameters()
  { var formal = arguments.caller.callee.length;
    var actual = arguments.caller.length;
    if (formal != actual)
      { fcnName = getFunctionName(arguments.caller.callee);
        alert('wrong number of parameters supplied in call to function "'+fcnName+'"\n' + formal + ' needed, but ' + actual + ' supplied' );
      }
  }

function checkParam(paramName,value,type)
  { // alert('check param ' + arguments.caller);
    var fcnName = '??';
    // alert('val ' + value + ' ' + (value-0) + ' '+ ((value-0) < 1));
    try
     { var error = '';
	if (typeof value == 'undefined')
	  { error = 'value is undefined'
	  }
	if (type == 'item index')
	  {  if (!( (value-0) >= 1 && (value-0) <= numItems))  // want to say NaN is bad
	       { error = 'value ('+value+') is not in the range 1 to numItems ('+numItems+')';
	       }
	  }
	else if (type == 'non-negative number')
	  {  if (!( (value-0) >= 0))  // want to say NaN is bad
	       { error = 'value ('+value+') is not a non-negative number';
	       }
	  }
	else
	  { alert('checkParam: unrecognized parameter type ('+type+') specified');
	  }
      }
    catch (e)
      { error = '(error occurred while trying to check the value)';
      }
    if (error)
      { fcnName = getFunctionName(arguments.caller.callee);
        alert('Error in the value of parameter "' + paramName + '" of function "' + fcnName + '":\n' + error);
      }
  }

//////////////////////////////// initialize the qualities //////////////////////////////
// Two alternative functions for initializing the qualities are given
// One or the other should be called
// Following a call of either of these call downgradeTilUnderBudget to get total under the budget

function initializeQualitiesA()
  { // This sets the initial qualities from low to high so that the highest
    // intuitive percents are given the top quality, and then down from there
    //  so that the bottom quality corresponds with intuitive percents near 0.
    var numQualities = 6;
    var maxpc = 0;
    for (var ix = 1; ix <= numItems; ix++)
      { var pc = pcGetValue(ix);
        if (pc > maxpc)
	  { maxpc = pc;
	  }
	// should we also check what min is??
      }
    // want quality indexes in range from 0 (best) to numQualities-1 (worst)
    for (var ix = 1; ix <= numItems; ix++)
      { var pc = pcGetValue(ix);
        var qual = pc/maxpc;  // here, best = 1, worst >= 0
	var qualIndex = Math.ceil((1-qual)*numQualities)-1;
	if (qualIndex < 0)
	  { qualIndex = 0;
	  }
	typesSetSelectedIndex(ix,qualIndex);
      }
  }


function initializeQualitiesB()
  { // This function initializes the qualities in an attempt to make the amount to be
    // spent on each item similar to the amount called for by the intuitive percent of
    //  of the budget
    var budget = parseInt(document.orderform.targetbudget2.value);
    for (var ix = 1; ix <= numItems; ix++)
      { var elt = typesElt(ix);
        var quantity = sfElt(ix).value;
	var pc = pcElt(ix).value;
	if (quantity == 0)
	    continue;
	var target = (pc/100)*budget/quantity;
	var selected = elt.length - 1; // set selected to least costly in case we don't find anything better
	for (var j = 0; j < elt.length; j++)
	  { if (elt.options[j].value < target)
	      { // we've found one less expensive than the target
	        // But don't start with this one, unless we have to...
		// alert('eee ' + j + ' ' + elt.options[j].value);
	        if (j > 0)
		   selected = j-1;  // Start with one at least as expensive as target, if possible
		else
		   selected = j;
	        break;
	      }
	  }
	typesSetSelectedIndex(ix,selected);
      }
  }

function downgradeQuality(ix)
// returns true if made a change
  { // var e = typesElt(ix);
    var cur = typesGetSelectedIndex(ix);
    var len = typesElt(ix).length;
    if (cur+1 < len)
      { typesSetSelectedIndex(ix,cur+1);
        // pricesElt(ix).value = typesElt(ix).value; // transfer info to prices
        return true;
      }
    else
        return false;
  }

// function xtest()
  // { sfSetValue(16,123);
  // }
// setTimeout(xtest,2000);

function sortbypc()
  { // do a simple insertion sort
    var r = new Array();
    for (var i = 1; i <= numItems; i++)
      { // alert('/' + pcElt(i).value + '/');
        var v = parseInt(pcElt(i).value);
        for (var j = i-1; j >= 0; j--)
	  { if (j == 0)
	      { r[j] = i;
	      }
	    else
	      { var k = r[j-1];
		var w = parseInt(pcElt(k).value);
		if (v > w)
		  { r[j] = i;
		    break;
		  }
		else
		  { r[j] = k;
		  }
	      }
	  }
        
      }
    return r;
  }

function downgradeTilUnderBudget()
  { 
    var sorted = sortbypc();
    var targetBudget = parseInt(document.orderform.targetbudget2.value);
    var changedSomething = true;
    var ok = false;
    var limit = numItems*maxNumberOfQualities;
    // limit is an extra check to make sure we don't get stuck forever here if something goes wrong
    while (changedSomething && !ok && limit >= 0)  // want to stop if go through everything without changing anything
      {  changedSomething = false;
         for (var i = 0; i < numItems; i++)
	  { if (grandtotalGetValue() <= targetBudget)
	      { ok = true;
	        // break;
		return;
	      }
	    if (downgradeQuality(sorted[i]))
	      { changedSomething = true;
	      }
	  }
        // for test:
	// if (changedSomething)
	  // { setTimeout(downgradeTilUnderBudget,4000);
	     // return;
	  // }
        limit--;
      }
    if (limit == 0)
      { alert('downgradeTilUnderBudget failed to finish');
      }
  }

///////////////////////////////// starting up ////////////////////////////////////
// Call this function when the main div is made visible

function startupMain()
  { 
    initializeQualitiesA();
    // initializeQualitiesB();  // alternative
    // alert('adjusted');
    downgradeTilUnderBudget();
    // setTimeout(downgradeTilUnderBudget,4000);
  }
