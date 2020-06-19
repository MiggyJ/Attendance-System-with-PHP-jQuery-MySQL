$(document).ready(function () {
	// Student Number
	$("#signNumber").on("keyup", function(){
		if ($(this).val().length == 10) { // If Student Number is 10 digits
			$("#signPass, #signPass2").attr("disabled", false) // Enable Password input
			$(this).addClass('valid').removeClass('invalid') // Mark this input field valid
		} else { // If not
			$(this).addClass('invalid').removeClass('valid') // Mark Invalid
			$("#signPass, #signPass2").val('') // Reset passwords input valuel
			$("#signPass, #signPass2").attr("disabled", true) // Disable Password input
			$("#signPass, #signPass2").removeClass("valid invalid") // Reset validation on password input
			$("#signBtn").addClass('disabled') // Disable sign up button
		}
	})

	// Password
	$("#signPass").on("keyup", function(e) {
			if ($(this).val() != $("#signPass2").val()) {
					$("#signPass2").removeClass("valid")
					if ($(this).val().length >= 8 && $("#signPass2").val() != '') {
						$("#signPass2").addClass("invalid")
					}
			} else {
					$("#signPass2").removeClass("invalid")
					if ($(this).val().length >= 8) {
						$("#signPass2").addClass("valid")
					}
			}
			
			if ($(this).val() == '') {
					$(this).removeClass("valid")
					$("#signPass2").removeClass("valid")
			}

			if ($(this).val().length >= 8) {
				$(this).removeClass("invalid").addClass("valid")
			} else {
				$(this).removeClass("valid").addClass("invalid")
			}
	})

	// Password Confirm
	$("#signPass2").on("keyup", function(e) {
			if ($("#signPass").val() == $(this).val()) {
					$(this).removeClass("invalid")
					if ($(this).val().length >= 8) {
						$('#signPass2').addClass("valid")
					}
			} else {
					$(this).removeClass("valid").addClass("invalid")
			}

			if ($(this).val() == '' && $("#signPass").val() == '') {
					$("#signPass2").removeClass("valid")
					$("#signPass").removeClass("valid")
			}
	})

	
	$("#signPass2").blur(function () {
		if ($(this).val() != $("#signPass").val() || ($(this).val().length < 8 && $("#signPass").val() != '')) {
			$(this).addClass('invalid').removeClass('valid')
		}
	})

	$("#signPass2, #signPass").on("keyup", function(e){
		if ($('#signPass2').val() == $('#signPass').val() && $(this).val() != '' &&  $(this).val().length >= 8) {
			$('#signBtn').removeClass('disabled')
		}
		else{
			$('#signBtn').addClass('disabled')
		}
	})
})