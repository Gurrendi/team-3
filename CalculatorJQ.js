var hasDecimal = false;
var hasResultDisplayed = false;
//control the input
function display(value) {
   var currentValue = $("#output").val();
   var uniChar = currentValue.slice(-1);
   if (hasResultDisplayed && !isNaN(value)) {
      currentValue = "";
      hasResultDisplayed=false;
   }
   if (hasResultDisplayed && value == ".") {
      currentValue = "";
      hasResultDisplayed = false;
   }
   if (currentValue == "" && value == "0") {
      $("#output").val("0");
      hasDecimal = false;
      return;
   }
   if (currentValue == "" && value == ".") {
      $("#output").val("0.");
      hasDecimal = true;
      return;
   }
   if (value == "0" && (currentValue == "" || currentValue == "0")) return;
   if (isNaN(value)) {
      if (!isNaN(uniChar)) {
         if (value == ".") {
            if (!hasDecimal) {
               $("#output").val(currentValue + value);
               hasDecimal = true;
            }
         } else if (
            currentValue != "" &&
            (value == "+" ||
               value == "*" ||
               value == "/" ||
               value == "%" ||
               value == "-")
         ) {
            $("#output").val(currentValue + value);
            hasDecimal = false;
         }
      }else if (
         value == "+" ||
         value == "*" ||
         value == "/" ||
         value == "%" ||
         value == "-"
      ) {
        $("#output").val(currentValue.slice(0, -1) + value);
      }

   } else {
      if (value == "." && hasDecimal) {
         return;
      }
      if (currentValue.length >= 20) {
         return;
      }
      $("#output").val(currentValue + value);
      // $("#output").val(addCommas(currentValue + value));

      // if (value == '.') {
      //  hasDecimal = true;
      // }
      //replace operator
      //  var lastCharIsOperator = isNaN(currentValue.slice(-1)) && currentValue.slice(-1) !== '.';

      //  if (lastCharIsOperator) {
      //    // if the last character is an operator, replace it with the new operator
      //    $('#output').val(currentValue.slice(0, -1) + value);
      //  } else {
      //    // otherwise, append the value to the input
      //    $('#output').val(currentValue + value);
      //  }
   }
}
//clearScreen
function clearScreen() {
   $("#output").val("");
   hasDecimal = false;
}
// for delete 1 digit
function subtract() {
   var input = $("#output");

   if (input.val().substring(".")) {
      hasDecimal = false;
      input.val(input.val().substring(0, input.val().length - 1));
   }
}
//For +/- funtion
function toggleSign() {
   var currentValue = $("#output").val();
   if (currentValue != "") {
      if (currentValue.startsWith("-")) {
         $("#output").val(currentValue.substr(1));
      } else if (currentValue != "") {
         $("#output").val("-" + currentValue);
      } else {
         $("#output").val("-");
      }
   }
}
//For onclick diaplay value
function calculate() {
   try {
      var p = $("#output").val();
      var q = eval(p);
      var result = q;
      if (result.length > 20) {
         result = result.substring(0, 20);
      }
      if (result === Infinity || result === -Infinity) {
         result = "Cannot divide by zero";
      }
      $("#output").val(result);
      if ((currentValue = "")) {
         result = "0";
      }
      hasResultDisplayed = true;
   } catch (error) {
      $("#output").val("Error");
   }
}
// function addCommas(str){
//    return str.replace(/\W/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
// load the document=HTML&CSS
$(document).ready(function () {

   //for keyboard
   $(document).on("keydown", function (e) {
      var key = e.key;
      if (
         $.isNumeric(key) ||
         key == "+" ||
         key == "-" ||
         key == "*" ||
         key == "/" ||
         key == "." ||
         key == "%"
      ){
         display(key);
      } else if (key == "Enter") {
         calculate();
      } else if (key == "Backspace") {
         subtract();
      } else if (key == "Delete") {
         $("#output").val("");
         clearScreen();
      }
   });

});







