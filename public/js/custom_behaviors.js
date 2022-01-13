$(document).ready(function() {

	//SUBMIT BUTTON
	$("#subButt").click(function(){
		let f = $("#myForm")[0];
		if (f.checkValidity()){
			let data = new Object();
			data.name = $("#fname").val()+ " " + $("#lname").val(),
			data.email = $("#email").val(),
			data.password = $("#password").val(),
			data.occupation = $("#occupation").val(),
			data.state = $("#state").val()
			let jsonString = JSON.stringify(data);
			console.log(data)
			$.post({
				method: "POST",
				url: 'https://frontend-take-home.fetchrewards.com/form',
				data: jsonString,
				contentType: "application/json",
				error:function(){
					$("#failContainer").css({
						"display" : "block"
					});
				},
				success:function(){
					$("#succContainer").css({
						"display" : "block"
					});
				}
			})

		}
		else{
			$("#validContainer").css({
				"display" : "block"
			});
			for (let i = 0; i < $("#myForm input").length; i++){
				let id = "#" + $("#myForm input")[i].id;
				if($(id).is(':invalid')){
					$(id).addClass("invalid");
				}
				else{ $(id).removeClass("invalid"); }
			}
		}
	});

	$(".closeButt").click(function(){
		let id = "#" + $(this).attr('id');
		if(id == "#validClose"){
			$("#validContainer").css({
				"display" : "none"
			});
		}
		else{
			$("#succContainer").css({
				"display" : "block"
			});
		}
	});

	// INITIALIZATION
	function initialize(){

		$.get('https://frontend-take-home.fetchrewards.com/form', function(data){
			for(let i = 0; i < data.occupations.length; i++){
				let occupation = data.occupations[i];
				$("#occupation").append("<option value = '"+ occupation +"'>"+occupation+"</option>");
			}
			for (let j = 0; j < data.states.length; j++){
				let state = data.states[j].name;
				$("#state").append("<option value = '"+ state +"'>"+state+"</option>")
			}
		});
	}

	initialize();


});
