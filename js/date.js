$(document).ready(function () {
	$('.datepicker').datepicker({format: "yyyy-mm-dd", setDefaultDate: true, defaultDate: new Date()})

})

$('.datepicker, #fillSection').on('change', fillTable)

function fillTable() {
	document.querySelector("#total_reg").innerText = 'Total count:' // Count of attendance
	$('tbody').empty() // Reset Table data
	$.ajax({ // Request to get attendance
		type: "POST",
		url: "../php/fill.php",
		data: {date: $('.datepicker').val(), section: $("#fillSection").val()},
		dataType: "json",
		success: function (response) {
			response[0].forEach(element => { // Template Build for each row of data
				var build = `
				<tr>
					<td>${element.Name}</td>
					<td>${element.studentNumber}</td>
					<td><img src="../uploads/${element.post}" width="150px"></td>
				`
				if (element.late) { // if late
					build +=
						`
							<td><div class="red-text">LATE</div></td>
						</tr>	
						`
				} else {
					build +=
						`
							<td><div class="green-text">GOOD</div></td>
						</tr>	
						`
				}
				$('tbody').append(build) // Append Template to table body

			});
			document.querySelector("#total_reg").innerText += ' ' + response[1] // Number of rows of data
		}
	});
}