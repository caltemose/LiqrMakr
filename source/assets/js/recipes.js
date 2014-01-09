var liqrmakr = (function($) {
  var total, percent, target, alcohol, flavoring, syrupWater, syrupSugar;

  function initialize(options) {
    console.log('init liqrmakr');
    getInputs();
    if (options.total) total.val(options.total);
    bindInputs();
    update();
  }
  function getInputs() {
    total = $('#total');
    percent = $('#percent');
    target = $('#target');
    alcohol = $('#alcohol');
    flavoring = $('#flavoring');
    syrupWater = $('#syrupWater');
    syrupSugar = $('#syrupSugar');
  }
  function bindInputs() {
    total.change(function(){ liqrmakr.updateVia('total'); });
    percent.change(function(){ liqrmakr.updateVia('percent'); });
    target.change(function(){ liqrmakr.updateVia('target'); });
  }
  function roundAmount(amt) {
    return Math.round(amt);
  }
  function isBad(value) {
    return value === '' || isNaN(value);
  }
  function update() {
    var grainAmount, syrupToAdd, syrupCombined, sw, ss;
    grainAmount = total.val() / (percent.val()/target.val());
    syrupToAdd = total.val() - grainAmount;
    alcohol.val(roundAmount(grainAmount));
    syrupCombined = syrupToAdd * 1.164;
    sw = roundAmount(syrupCombined * 0.6135);
    ss = roundAmount(syrupCombined - sw);
    syrupWater.text(sw + "ml");
    syrupSugar.text(ss + "ml");
  }
  function updateVia(field, value) {
    update();
  }
  function recalc() {
    /*
    if ( !isBad(flavored.val()) ) {
      if ( !isBad(target.val()) && !isBad(percent.val()) ) {         
        ratio = percent.val() / target.val();
        totalAmount = ratio * flavored.val();
        totalAmount = roundAmount(totalAmount);
        syrupToAdd = totalAmount - flavored.val();  
        syrupToAdd = roundAmount(syrupToAdd);
        syrup.val(syrupToAdd);
        total.val(totalAmount);
        syrupCombined = syrupToAdd * 1.164;
        syrupWater = syrupCombined * 0.6135;
        syrupSugar = syrupCombined - syrupWater;
        msg = "Mix " + roundAmount(syrupWater) +  " water with " + roundAmount(syrupSugar) + " sugar.";
      }
    */
  }
  return {
    init: initialize,
    updateVia: updateVia
  }
})(Zepto);

Zepto(function($){
  liqrmakr.init({total:750});
})