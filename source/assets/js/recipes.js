var liqrmakr = (function($) {
  var total, proof, target, percent, 
      bottleCount, bottleSize, bottleLabel,
      alcohol, flavoring, 
      syrupWater, syrupSugar;

  function initialize(options) {
    getInputs();
    bindInputs();
    if (options.total) {
      total.val(options.total);
      update('total');
    }
  }

  function getInputs() {
    total = $('#total');
    proof = $('#proof');
    target = $('#target');
    percent = $('#percent');
    bottleCount = $('#bottleCount');
    bottleSize = $('#bottleSize');
    bottleLabel = $('#bottleLabel');
    alcohol = $('#alcohol');
    flavoring = $('#flavoring');
    syrupWater = $('#syrupWater');
    syrupSugar = $('#syrupSugar');
  }

  function bindInputs() {
    total.change(function(){ liqrmakr.update('total'); });
    percent.change(function(){ liqrmakr.update('percent'); });
    target.change(function(){ liqrmakr.update('target'); });
    alcohol.change(function(){ liqrmakr.update('alcohol'); })
    flavoring.change(function(){ liqrmakr.update('flavoring'); })
  }

  function update(field) {
    var grainAmount, ratio, totalAmount, syrupToAdd, syrupCombined, sw, ss, bottles;

    if (field==="alcohol" || field==="flavoring") {
      //update flavoring/alcohol values
      if (field==="alcohol") flavoring.val(Math.ceil(alcohol.val()*0.01));
      else alcohol.val(flavoring.val() * 100);
      //update total amount
      ratio = percent.val() / target.val();
      totalAmount = roundAmount(ratio * alcohol.val());
      total.val(totalAmount);
    } else {
      grainAmount = total.val() / (percent.val()/target.val());
      //update alcohol amount
      alcohol.val(roundAmount(grainAmount));
      //update flavoring
      flavoring.val(Math.ceil(grainAmount*0.01));
      //update proof
      proof.text(roundAmount(target.val()*2) + " ");
    }

    //update syrup information
    syrupToAdd = total.val() - alcohol.val();
    syrupCombined = syrupToAdd * 1.164;
    sw = roundAmount(syrupCombined * 0.6135);
    ss = roundAmount(syrupCombined - sw);
    syrupWater.text(sw + "ml");
    syrupSugar.text(ss + "ml");

    //update bottle count 
    bottles = total.val()/bottleSize.val();
    bottleCount.val(bottles);
    if (bottles >= 2) bottleLabel.text("ml containers");
    else bottleLabel.text("ml container");
  }

  function roundAmount(amt) {
    return Math.round(amt);
  }

  function isBad(value) {
    return value === '' || isNaN(value);
  }

  return {
    init: initialize,
    update: update
  }
  
})(Zepto);

Zepto(function($){
  liqrmakr.init({total:750});
})