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
   if (hasResultDisplayed && !isNaN(uniChar)) {
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
         } else if (currentValue != "" &&(value == "+" || value == "*" ||value == "/" ||value == "%" ||value == "-")) {
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
         // Check if the expression ends with an operator
      if (/[+\-*/]$/.test(p)) {
         // If it does, append the last operand to the end of the expression
         var lastOperand = p.match(/[\d.]+$/);
         p += lastOperand;
      }
      var q = eval(p);
      var result = q;
      $("#output").val(Number(result).toLocaleString('en-US'));
      if ((currentValue = "")) {
         result = "0";
      }
      hasResultDisplayed = true;
      if (result.length < 20) {
         result = result.substring(0, 20);
      }
      if (result === Infinity || result === -Infinity) {
         result = "Cannot divide by zero";
      }
   } catch (error) {
      $("#output").val("Error");
   }
}

// load the document=HTML&CSS
$(document).ready(function () {

   //for keyboard
   $(document).on("keydown", function (e) {
      var key = e.key;
      if ($.isNumeric(key) ||key == "+" ||key == "-" ||key == "*" ||key == "/" ||key == "." ||key == "%"){
         display(key);
      } else if (key == "Enter") {
         calculate();
      } else if (key == "Backspace") {
         subtract();
      } else if (key == "Delete") {
         clearScreen();
      }else if (key =="M"){
         toggleSign();
      }
   });

});







