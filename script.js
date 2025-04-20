$(document).ready(function () {
      $("#birthdate").datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0", 
        maxDate: 0 
      });

     
      $("#ageCalculatorForm").on("submit", function (e) {
        e.preventDefault();
        const { DateTime } = luxon;
        const birthdateInput = $("#birthdate").val();
        const errorDiv = $("#error");
        const resultDiv = $("#result");
        const ageOutput = $("#ageOutput");

  
        errorDiv.hide();
        resultDiv.hide();

        
        if (!birthdateInput) {
          errorDiv.text("Please select a birthdate.").show();
          return;
        }

        
        const birthdate = DateTime.fromFormat(birthdateInput, "MM/dd/yyyy");
        if (!birthdate.isValid) {
          errorDiv.text("Invalid date format. Please use MM/DD/YYYY.").show();
          return;
        }

        
        const now = DateTime.now();
        if (birthdate > now) {
          errorDiv.text("Birthdate cannot be in the future.").show();
          return;
        }

        
        const age = now.diff(birthdate, ["years", "months", "days"]).toObject();

        
        ageOutput.html(
          `You are <strong>${Math.floor(age.years)}</strong> years, ` +
          `<strong>${Math.floor(age.months)}</strong> months, and ` +
          `<strong>${Math.floor(age.days)}</strong> days old.`
        );
        resultDiv.show();
      });
    });
