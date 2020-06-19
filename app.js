$(document).ready(function(){

		$('.modal').modal() // Initialize modals

		$("#uploadPhoto").modal({dismissible:false}) // Make modal button-only dismissible
		
		$('select').formSelect() // Initialize select

    $('#clickUpload').click(function(){ // Upload file without button
    	$('input[type=file]').click()
    })


		
	
	
 })


function logIn(credentials) {
	if (credentials[0] == '' || credentials[1] == '') // If username or password is empty
		M.toast({html: 'Enter Student Number and Password', displayLength: 5000})
	else {
		$("#cover").css("display", "flex")

		$.ajax({ // Request for logging in
			type: "POST",
			url: "php/users.php",
			data: { user: credentials[0], pass: credentials[1] },
			dataType: "json",
			success: function (response) {
				if (response == 0) { // Student is registered and haven't submitted attendance
					$("#uploadPhoto").modal('open')
				} else if (response == 1) { // Student number found but wrong password
					M.toast({html: 'Wrong Password!', displayLength: 5000})
				} else if (response == -1) { // Student Number not found
					M.toast({html: 'User not recognized', displayLength: 5000})
				} else if (response == 3) { // Admin
					window.location.href = 'admin/index.php'
				 } else { // Student is registered and has already submitted attendance
					M.toast({html: 'You already submitted your attendance.', displayLength: 5000})
				$("#StudentNumber, #userPass").val("")
				}
				$('#cover').hide()
			},
			error: (reject) => { // Error in Request
				$("#cover").hide()
				M.toast({html: 'Server Error', displayLength: 5000})
			}
		})
	}
}

$("#signBtn").on('click', () => {

	$("#signMain, .modal-footer").hide() // Hide main contents
	$("#signLoad").css('display', 'flex') // Show spinner
	
	$.ajax({ // Request for adding new student
		type: "post",
		url: "php/signup.php",
		data: {
			number: $('#signNumber').val(),
			firstName: $("#signFirstName").val(),
			lastName: $("#signLastName").val(),
			section: $("#signSection").val(),
			pass: $("#signPass").val()
		},
		dataType: "json",
		success: function (response) { // After successful request
			$("#signMain, .modal-footer").show() // Show main contents
			$("#signLoad").hide() // Hide spinner
			$("#signModal").modal('close')

			$(".modal-content").scrollTop(0) // Scroll to top of modal 
			// Reset Values
			$("#signNumber, #signFirstName, #signLastName, #signSection, #signPass, #signPass2").val('')
			$("#signNumber, #signFirstName, #signLastName, #signSection, #signPass, #signPass2").removeClass('valid invalid')
			$("#signBtn").addClass('disabled')

			M.toast({html: response, displayLength: 5000})
		},
		error: function (reject) {
			M.toast({html: "Server Error", displayLength: 5000})
			$("#signMain, .modal-footer").show()
			$("#signLoad").hide()
			$("#signModal").modal('close')

			$(".modal-content").scrollTop(0)
			$("#signNumber, #signFirstName, #signLastName, #signSection, #signPass, #signPass2").val('')
			$("#signNumber, #signFirstName, #signLastName, #signSection, #signPass, #signPass2").removeClass('valid invalid')
			$("#signBtn").addClass('disabled')
			
		}
	})
})

function preview() { // Show image preview if file is image
	if ($.inArray($("#attPhoto").prop('files')[0]["type"], ['image/jpg', 'image/jpeg', 'image/png']) < 0) {
		M.toast({html: "Please choose an image file!", displayLength: 5000})
		previewImg.src = "asset/Photo.png"
		return
	}
	previewImg.src = URL.createObjectURL(event.target.files[0])
	$('#previewImg').show()
}

function upload() { // Upload attendance photo
	$("#uploadSubmit").addClass('disabled')
	if($("#attPhoto")[0].files.length != 0){ // if file is inserted
		var myForm = new FormData()
		var imageForm = $("#attPhoto").prop('files')[0]
		var allowed = ['image/jpg', 'image/jpeg', 'image/png']

		// If image format is incorrect
		if ($.inArray($("#attPhoto").prop('files')[0]["type"], allowed) < 0) {
			M.toast({html: "Please choose an image file!", displayLength: 5000})
			previewImg.src = "asset/Photo.png"
			$("#uploadSubmit").removeClass('disabled')
			return
		}
		
		myForm.append('file', imageForm)

		$.ajax({ // Request to upload
			xhr: function() // Process of request
			{
				var xhr = new window.XMLHttpRequest()
				//Upload progress
				xhr.upload.addEventListener("progress", function(evt){
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total * 100
						//Do something with upload progress
						$(".determinate").css("width", percentComplete + "%")
					}
				}, false)
				// //Download progress
				// xhr.addEventListener("progress", function(evt){
				// 	if (evt.lengthComputable) {
				// 		var percentComplete = evt.loaded / evt.total
				// 		//Do something with download progress
				// 		console.log(percentComplete)
				// 	}
				// }, false)
				return xhr
			},
			type: 'POST',
			url: "php/upload.php",
			data: myForm,
			processData: false,
			contentType: false,
			success: function (data) {
				// Close modal
				$("#uploadPhoto").modal('close')
				// Reset input fields
				$("#StudentNumber, #userPass, #attPhoto").val("")
				$(".determinate").css("width", 0 + "%")
				previewImg.src = 'asset/Photo.png'
				$("#uploadSubmit").removeClass('disabled')
				if (data == 0) {		
					// Success Message
					M.toast({html: 'Proof of Attendance Sent!', displayLength: 5000})
					
				} else {
					// Error Message
					M.toast({html: 'Server Error', displayLength: 5000})
				}			
			}
		})
	} else { // if no file is inserted
		M.toast({html: 'No File Selected!', displayLength: 5000})
		$("#uploadSubmit").removeClass('disabled')
	}

}


