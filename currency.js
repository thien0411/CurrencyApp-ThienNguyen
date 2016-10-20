
function setValue(dollars, exchangeRate) {
  var result = dollars*exchangeRate;
  $('#outputCurrencyValue').val(result);
}

function getExchangeRate(from) {
    var to = $('#outputCurrency').val();

    var conversionData = {
        "from": "USD",
        "to": to
    };
    $.ajax({
      type: 'GET',
      url: 'http://cse.unl.edu/~cbourke/CSCE120/proxies/currency.php',
      data: conversionData,
      contentType: "application/json",
      success: function(json) {
          if('rate' in json) {
            var exchangeRate = json.rate;
            var inputValue = $('#inputCurrencyValue').val();
            setValue(inputValue, exchangeRate);
          } else {
            raiseError("Currency Exchange Service did not recognize your parameters...");
            $('#errMsg').css("display", "inline").html("error: unable to determine exchange rate");
          }
      },
      error: function(e) {
        raiseError("There was a problem connecting to the server!");
      }
    });
}

function raiseError(msg) {
  var errorDiv = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>ERROR!</strong> '+msg+'</div>';
  $('#errMsgArea').empty();
  $('#errMsgArea').append(errorDiv);
  $('#errMsgArea').hide().fadeIn("slow");
}
