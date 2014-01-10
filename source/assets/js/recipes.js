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
    alcohol.change(function(){ liqrmakr.updateAlcohol(); })
    flavoring.change(function(){ liqrmakr.updateFlavoring(); })
  }
  function roundAmount(amt) {
    return Math.round(amt);
  }
  function isBad(value) {
    return value === '' || isNaN(value);
  }
  function updateAlcohol() {
    var ratio, totalAmount, syrupToAdd, syrupCombined, sw, ss;
    ratio = percent.val() / target.val();
    totalAmount = roundAmount(ratio * alcohol.val());
    total.val(totalAmount);
    syrupToAdd = roundAmount(totalAmount - alcohol.val());
    syrupCombined = syrupToAdd * 1.164;
    sw = roundAmount(syrupCombined * 0.6135);
    ss = roundAmount(syrupCombined - sw);
    syrupWater.text(sw + "ml");
    syrupSugar.text(ss + "ml");
    flavoring.val(Math.ceil(alcohol.val()*0.01));
  }
  function updateFlavoring() {
    var ratio, totalAmount, syrupToAdd, syrupCombined, sw, ss;
    alcohol.val(flavoring.val() * 100);
    ratio = percent.val() / target.val();
    totalAmount = roundAmount(ratio * alcohol.val());
    total.val(totalAmount);
    syrupToAdd = roundAmount(totalAmount - alcohol.val());
    syrupCombined = syrupToAdd * 1.164;
    sw = roundAmount(syrupCombined * 0.6135);
    ss = roundAmount(syrupCombined - sw);
    syrupWater.text(sw + "ml");
    syrupSugar.text(ss + "ml");
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
    flavoring.val(Math.ceil(grainAmount*0.01));
  }
  function updateVia(field, value) {
    update();
  }
  return {
    init: initialize,
    updateVia: updateVia,
    updateAlcohol: updateAlcohol,
    updateFlavoring: updateFlavoring
  }
})(Zepto);

Zepto(function($){
  liqrmakr.init({total:750});
})