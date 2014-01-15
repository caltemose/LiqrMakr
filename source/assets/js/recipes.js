var liqrmakr = (function($) {
  var total, proof, target, percent, 
      bottleCount, bottleSize, bottleLabel,
      alcohol, flavorings, 
      syrupWater, syrupSugar, sweetness = 0.6135,
      waterToAlc, sugarToAlc, alcWaterMultiplier;

  function initialize(options) {
    getInputs();
    bindInputs();
    //liqrmakr.init({total:750, target: 38, waterToAlc: 1.73, sugarToAlc: 1.18, alcWaterMultiplier: 1.0061});
    if (options.total) total.val(options.total);
    if (options.target) target.val(options.target);
    if (options.sweetness) sweetness = options.sweetness;
    if (options.waterToAlc) waterToAlc = options.waterToAlc;
    if (options.sugarToAlc) sugarToAlc = options.sugarToAlc;
    if (options.alcWaterMultiplier) alcWaterMultiplier = options.alcWaterMultiplier;
    update('total', null);
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
      sw = alcohol.val() * waterToAlc;
      total.val(alcWaterMultiplier * (parseInt(alcohol.val()) + sw));

    } else {
      //update alcohol amount
      grainAmount = target.val()*(total.val()/alcWaterMultiplier) / percent.val();
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

      sw = alcohol.val() * waterToAlc;
    }

    //update syrup information
    syrupWater.text(roundAmount(sw) + "ml");
    syrupSugar.text(roundAmount(alcohol.val()*sugarToAlc) + "ml");

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

