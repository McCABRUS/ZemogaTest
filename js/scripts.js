function init() {
	$(function() {
      	//Read the JSON data and add dynamically the cards
    	$.getJSON('assets/data.json', function(results) {

    		$( results.data ).each(function(dataIndex, info) {
				$("#previousRulingsContainer").append("<div class='card' id='card" + dataIndex + "'></div>");
				$("#card" + dataIndex).append("<div id='thumbCard" + dataIndex +"' class='thumbCard'></div>");
				if(info.votes.positive > info.votes.negative)
				{
					$("#thumbCard" + dataIndex).append("<img src='./assets/img/thumbs-up.svg' alt='thumbs up'>");
					$("#thumbCard" + dataIndex).attr("aria-label", "thumbs up");
				}
				else
				{
					$("#thumbCard" + dataIndex).append("<img src='./assets/img/thumbs-down.svg' alt='thumbs down'>");
					$("#thumbCard" + dataIndex).attr("aria-label", "thumbs down");
				}

				var lastTimeVoted;

				//Checked last time voted for given card data
				if(localStorage.getItem("lastTimeVoted" + dataIndex))
				{
					lastTimeVoted = jQuery.timeago(parseInt(localStorage.getItem("lastTimeVoted" + dataIndex)));
				}
				else
				{
					lastTimeVoted = jQuery.timeago(info.lastUpdated);
				}
				$("#card" + dataIndex).append("<span class='cardName'>"+ info.name +"</span><span class='cardDescrip'>" + info.description + "</span><span property='Updated' class='timeCategoryCard' id='timeCategoryCard" + dataIndex + "'>"+ lastTimeVoted + " in " + info.category  + "</span>");
				$("#card" + dataIndex).append("<div id='photoCard" + dataIndex +"' class='photoCard'></div>");
				$("#photoCard" + dataIndex).append("<img src='./assets/img/people/" + info.picture + "' alt='" + info.name + "'>");
				$("#card" + dataIndex).append("<div id='votesContainer" + dataIndex +"' class='votesContainer'></div>");
				$("#votesContainer" + dataIndex).append("<div id='positiveVotes" + dataIndex +"' class='positiveVotes'></div>");
				$("#votesContainer" + dataIndex).append("<div id='negativeVotes" + dataIndex +"' class='negativeVotes'></div>");
				

				localStorage.setItem("category" + dataIndex, info.category)
				var votesUp = info.votes.positive + returnLocalVotes("Up", dataIndex);
				var votesDown = info.votes.negative + returnLocalVotes("Down", dataIndex);
				localStorage.setItem("VotesUp" + dataIndex, info.votes.positive);
				localStorage.setItem("VotesDown" + dataIndex, info.votes.negative);
				updateGauge(dataIndex);
	
				$("#card" + dataIndex).append("<div id='voteContainer" + dataIndex +"' class='voteContainer'></div>");
				$("#voteContainer" + dataIndex).append("<div id='voteUp" + dataIndex +"' class='voteUp'><img src='./assets/img/thumbs-up.svg' alt='thumbs up'></div>");
				$("#voteContainer" + dataIndex).append("<div id='voteDown" + dataIndex +"' class='voteDown'><img src='./assets/img/thumbs-down.svg' alt='thumbs down'></div>");
				$("#voteContainer" + dataIndex).append("<button id='voteButton" + dataIndex +"' class='voteButton disabled' disabled='true'>Vote Now</button>");
				$("#voteUp" + dataIndex).click(function() {
					onVoteClicked(this, "Up", "Down", dataIndex, "voteButton" + dataIndex);
				});
				$("#voteDown" + dataIndex).click(function() {
					onVoteClicked(this, "Down", "Up",  dataIndex, "voteButton" + dataIndex);
				});

			});
        	

    		$('#dropdownbtn').click(function() {
				dropdown();
			});
        	$('#gridSelection').click(function() {
				gridView();
			});

			$('#listSelection').click(function() {
				listView();
			});

			// Forced Grid View if with is less than 1100 px (Mobile)
			if ($(window).width() <= 1100) {
				gridView();
			}
       });
    });
           

}


//Displays dropdown items
function dropdown(){
	$(function() {
		$("#dropDownItems")[0].classList.toggle("show");
	});
}


//If clicked ouside dropdown -> It is closed
window.onclick = function(event) {
  if (!event.target.matches('.dropdownbtn')) {
    var dropdowns = document.getElementsByClassName("dropdownContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}

//Adding specific classes for grid view
function gridView(){
	$(function() {
		$(".card").each(function() {
			$(this).addClass("cardGrid");
		});
		$(".cardName").each(function() {
			$(this).addClass("cardNameGrid");
		});
		$(".photoCard").each(function() {
			$(this).addClass("photoCardGrid");
		});
		$(".votesContainer").each(function() {
			$(this).addClass("votesContainerGrid");
		});
		$(".positiveVotes").each(function() {
			$(this).addClass("positiveVotesGrid");
		});
		$(".negativeVotes").each(function() {
			$(this).addClass("negativeVotesGrid");
		});
		$(".cardDescrip").each(function() {
			$(this).addClass("cardDescripGrid");
		});
		$(".thumbCard").each(function() {
			$(this).addClass("thumbCardGrid");
		});
		$(".voteContainer").each(function() {
			$(this).addClass("voteContainerGrid");
		});
		$(".voteUp").each(function() {
			$(this).addClass("voteUpGrid");
		});
		$(".voteDown").each(function() {
			$(this).addClass("voteDownGrid");
		});
		$(".voteButton").each(function() {
			$(this).addClass("voteButtonGrid");
		});
		$(".timeCategoryCard").each(function() {
			$(this).addClass("timeCategoryCardGrid");
		});
		$("#dropDownText").html("Grid");
	});
}


//Removed specific classes related to Grid View
function listView(){
	$(function() {
		$(".card").each(function() {
			$(this).removeClass("cardGrid");
		});
		$(".cardName").each(function() {
			$(this).removeClass("cardNameGrid");
		});
		$(".photoCard").each(function() {
			$(this).removeClass("photoCardGrid");
		});
		$(".votesContainer").each(function() {
			$(this).removeClass("votesContainerGrid");
		});
		$(".positiveVotes").each(function() {
			$(this).removeClass("positiveVotesGrid");
		});
		$(".negativeVotes").each(function() {
			$(this).removeClass("negativeVotesGrid");
		});
		$(".cardDescrip").each(function() {
			$(this).removeClass("cardDescripGrid");
		});
		$(".thumbCard").each(function() {
			$(this).removeClass("thumbCardGrid");
		});
		$(".voteContainer").each(function() {
			$(this).removeClass("voteContainerGrid");
		});
		$(".voteUp").each(function() {
			$(this).removeClass("voteUpGrid");
		});
		$(".voteDown").each(function() {
			$(this).removeClass("voteDownGrid");
		});
		$(".voteButton").each(function() {
			$(this).removeClass("voteButtonGrid");
		});
		$(".timeCategoryCard").each(function() {
			$(this).removeClass("timeCategoryCardGrid");
		});
		$("#dropDownText").html("List");
	});
}

// Check each time the window size and if is less than 1100 px witdh the Grid View is Forced
$(function() {
	$(window).resize(function(){
		if ($(window).width() <= 1100) {
			gridView();
		}
	});
});

function onVoteClicked(button, buttonCls, invertVote, index, btnVoteId){
	$("#"+button.id).addClass("selectedVote" + buttonCls);
	$("#vote"+invertVote + index).removeClass("selectedVote" + invertVote);
	$("#"+btnVoteId)[0].disabled = false;
	$("#"+btnVoteId).removeClass("disabled");
	$("#"+btnVoteId).click(function() {
		onVoteBtnClicked(index, buttonCls);
		$("#"+ this.id).unbind(); // Removed listener
		$("#"+ this.id).html("Vote Again");
		$("#voteUp" + index).hide();
		$("#voteDown" + index).hide();
		$("#"+ this.id).click(function() { // Added new listener related to Vote Again
			$("#"+ this.id).unbind();
			$("#voteUp" + index).show();
			$("#voteDown" + index).show();
			$("#"+ this.id).html("Vote Now");
			$("#"+ this.id).disabled = true;
			$("#"+ this.id).addClass("disabled");
			$("#voteUp" + index).removeClass("selectedVoteUp");
			$("#voteDown" + index).removeClass("selectedVoteDown");
			$("#timeCategoryCard" + index).html(jQuery.timeago(parseInt(localStorage.getItem("lastTimeVoted" + index))) + " in " + localStorage.getItem("category" + index)); // Added last time the voted locally
		});
	});
}

function onVoteBtnClicked(index, vote){
	
	var votes = returnLocalVotes(vote, index) + 1;
	localStorage.setItem("localVotes" + vote + index, votes);
	localStorage.setItem("lastTimeVoted" + index, Date.now());
	updateGauge(index);
	$("#timeCategoryCard" + index).html("Thank you for your vote!");

}


//Checked local votes
function returnLocalVotes(vote, index){
	if(localStorage.getItem("localVotes" + vote + index))
	{
		return parseInt(localStorage.getItem("localVotes" + vote + index));
	}
	else
	{
		return 0;
	}
}

//Called when page is loaded and when there's a new vote
function updateGauge(dataIndex){
	var votesUp = returnLocalVotes("Up", dataIndex) + parseInt(localStorage.getItem("VotesUp" + dataIndex));
	var votesDown = returnLocalVotes("Down", dataIndex) + parseInt(localStorage.getItem("VotesDown" + dataIndex));
	$("#positiveVotes" + dataIndex).css("width",((votesUp * 100)  /  (votesUp + votesDown))  + "%");
	$("#negativeVotes" + dataIndex).css("width",((votesDown * 100)  /  (votesUp + votesDown)) + "%");
	$("#positiveVotes" + dataIndex).html("");
	$("#negativeVotes" + dataIndex).html("");
	$("#positiveVotes" + dataIndex).append("<img src='./assets/img/thumbs-up.svg' alt='thumbs up'><span>" + ((votesUp * 100)  /  (votesUp + votesDown)).toFixed(1)  + "%</span>");
	$("#negativeVotes" + dataIndex).append("<img src='./assets/img/thumbs-down.svg' alt='thumbs down'><span>" + ((votesDown * 100)  /  (votesUp + votesDown)).toFixed(1)  + "%</span>");
}
