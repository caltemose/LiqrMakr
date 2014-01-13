var liqrmakr = (function($) {
  var total, proof, target, percent, 
      bottleCount, bottleSize, bottleLabel,
      alcohol, flavorings, 
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
    flavorings = $('.flavoring');
    syrupWater = $('#syrupWater');
    syrupSugar = $('#syrupSugar');
  }

  function bindInputs() {
    total.change(function(){ liqrmakr.update('total', this); });
    percent.change(function(){ liqrmakr.update('percent', this); });
    target.change(function(){ liqrmakr.update('target', this); });
    alcohol.change(function(){ liqrmakr.update('alcohol', this); })
    flavorings.each(function(){
      $(this).change(function(){ liqrmakr.update('flavoring', this); })
    });
  }

  function update(fieldType, field) {
    var grainAmount, ratio, totalAmount, syrupToAdd, syrupCombined, sw, ss, bottles;

    if (fieldType==="alcohol" || fieldType==="flavoring") {
      //update alcohol value if needed
      if (fieldType==="flavoring")
        alcohol.val($(field).val() / $(field).attr('data-multiplier'));
      //update flavorings
      flavorings.each(function(){
        var field = $(this),
            fieldRatio = field.attr('data-multiplier');
        if (field.attr('data-ceiling') === 'false')
          field.val((alcohol.val()*fieldRatio).toFixed(1));
        else
          field.val(Math.ceil(alcohol.val()*fieldRatio));
      });
      //update total amount
      ratio = percent.val() / target.val();
      totalAmount = roundAmount(ratio * alcohol.val());
      total.val(totalAmount);

    } else {
      grainAmount = total.val() / (percent.val()/target.val());
      //update alcohol amount
      alcohol.val(roundAmount(grainAmount));
      //update flavoring
      flavorings.each(function(){
        var field = $(this),
            fieldRatio = field.attr('data-multiplier');
        if (field.attr('data-ceiling') === 'false')
          field.val((alcohol.val()*fieldRatio).toFixed(1));
        else
          field.val(Math.ceil(alcohol.val()*fieldRatio));
      });

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