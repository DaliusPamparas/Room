$(document).ready(function() {
  /* var local = moment()
    .local()
    .format("HH:mm:ss"); */

  function updateTime() {
    /*  var local = moment()
      .local()
      .format("HH:mm");
    $("#time").html(local); 
    
        
    */
  }
  function add0ToHour(timenow){
    if (timenow.getHours() < 10)
    {
      return hours = '0' + timenow.getHours();
    }
  }
  function generateMomentBtnCont(timenow) {
    
    if (timenow.getMinutes() <= 30) {
      $("#momentBtn1").html(
        timenow.getHours() + ":00 - " + timenow.getHours() + ":30"
      );
      $("#momentBtn2").html(
        timenow.getHours() + ":30 - " + (timenow.getHours() + 1) + ":00"
      );
      $("#momentBtn3").html(
        timenow.getHours() + 1 + ":00 - " + (timenow.getHours() + 1) + ":30"
      );
      $("#momentBtn4").html(
        timenow.getHours() + 1 + ":30 - " + (timenow.getHours() + 2) + ":00"
      );
    } else {
      $("#momentBtn1").html(
        timenow.getHours() + ":30 - " + (timenow.getHours() + 1) + ":00"
      );
      $("#momentBtn2").html(
        timenow.getHours() + 1 + ":00 - " + (timenow.getHours() + 1) + ":30"
      );
      $("#momentBtn3").html(
        timenow.getHours() + 1 + ":30 - " + (timenow.getHours() + 2) + ":00"
      );
      $("#momentBtn4").html(
        timenow.getHours() + 2 + ":00 - " + (timenow.getHours() + 2) + ":30"
      );
    }
  }

  function ledigOrUpptagen(json, timenow) {
    for (i = 0; i < json.length; i++) {
       var startData = new Date(json[i].Start.PresentableDate);
       var endData = new Date(json[i].End.PresentableDate)
     console.log("start---" + startData);
     console.log("end ----" + endData );
      //date imitation
   /*    var startData = new Date(
        "Fri Nov 16 2017 11:00:00 GMT+0100 (W. Europe Standard Time)"
      );
      var endData = new Date(
        "Fri Nov 16 2017 11:30:00 GMT+0100 (W. Europe Standard Time)"
      ); */

      if (timenow.getDate() == startData.getDate()) {
        //check if  we have same day

        if (
          startData.getTime() <= timenow.getTime() &&
          endData.getTime() > timenow.getTime()
        ) {
          $("#roomState").html("Upptagen");
          $("#roomState").css("color", "#d31f31");
          $("#momentBtn1").addClass("timebtnBooked");
          $("#momentBtn1").removeClass("timebtn");

          var endCell = new Date(timenow.valueOf());

          if (endCell.getMinutes() <= 30) {
            endCell.setMinutes(00);
          } else {
            endCell.setMinutes(30);
          }
          endCell.setSeconds(00);
          endCell.setMilliseconds(00);
          endCell.setHours(endCell.getHours() + 1);
          console.log(
            "time 2 ----" +
              endCell.getHours() +
              endCell.getMinutes() +
              "  end time--" +
              endData.getHours() +
              endData.getMinutes()
          );
          if (endCell <= endData) {
            $("#momentBtn2").addClass("timebtnBooked");
            $("#momentBtn2").removeClass("timebtn");
            endCell.setMinutes(endCell.getMinutes() + 30);
            if (endCell <= endData) {
              $("#momentBtn3").addClass("timebtnBooked");
              $("#momentBtn3").removeClass("timebtn");
              endCell.setMinutes(endCell.getMinutes() + 30);
              if (endCell <= endData) {
                $("#momentBtn4").addClass("timebtnBooked");
                $("#momentBtn4").removeClass("timebtn");
                endCell.setMinutes(endCell.getMinutes() + 30);
              }
            }
          }
        }
      }
    }
  }

  function hideBokaTid() {
    $("#bokaTid").hide();
  }

  function existsCheckedElements() {
    if ($(".timebtnChecked").length > 0) return true;

    return false;
  }

  function checkedTidCells() {
    $(".timebtn").click(function() {
      $(this).toggleClass("timebtn");

      $(this).toggleClass("timebtnChecked");

      if ($(this).hasClass("timebtnChecked")) {
        $("#bokaTid").show();
      } else if (!existsCheckedElements()) {
        $("#bokaTid").hide();
      }
    });
  }

  /* updateTime();
  setInterval(function() {
    updateTime();
  }, 600); */
  function clockTimeNow() {
    var timenow = new Date();
    
    var hours = timenow.getHours();
    var minutes = timenow.getMinutes();
    
   /*  if (timenow.getHours() < 10)
    { hours = '0' + timenow.getHours();} */
    if(timenow.getMinutes() <10)
    { minutes = '0' + timenow.getMinutes(); }
    $("#time").html(hours + ":" + minutes);
    return timenow;
  }
  function todayWithoutTime(){
   // var startdate = new Date();

  // startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate();
    //startdate.startdate.getDate() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getFullYear();
    var MyDate = new Date();
    var MyDateString;
        
    
    //return MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
    return MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/' + MyDate.getFullYear() ;
  }


  function bookTid (celltid){
    if(celltid.length < 13){
      var startTime = celltid.substring(0, 4);
      var endTime = celltid.slice(7, 13);
    }else{
      var startTime = celltid.substring(0, 5);
      var endTime = celltid.slice(8, 13);
    }
    
    

    var StartDate = todayWithoutTime() + " " + startTime + ":00" ;
    var EndDate = todayWithoutTime() + " " + endTime + ":00" ;
    console.log("startTid:----" + StartDate);
    console.log("endtid:----" + EndDate);



    

    var urlVariableWithParams = "http://considconferancebooker.azurewebsites.net/Create?start="+ StartDate + "&end=" + EndDate;
    $.ajax({
      type: 'PUT',
      
      url: urlVariableWithParams,
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("some error");
     },
      success:function(response) {

        var responseJson = jQuery.parseJSON(response);

        alert("time booked" +responseJson);
    }
  });
  }

  function showMesseage(){
    $(".medelande").html('<span class="alert alert-info">Din tid är booked</span>');
  }

  function clickBokaTid() {
    $("#bokaTid").click(function() {
      // take all with class timebtnChecked and send
      if ($("#momentBtn1").hasClass("timebtnChecked")) {
        bookTid($("#momentBtn1").text());
      }
      if ($("#momentBtn2").hasClass("timebtnChecked")) {
        bookTid($("#momentBtn2").text());
      }
      if ($("#momentBtn3").hasClass("timebtnChecked")) {
        bookTid($("#momentBtn3").text());
      }
      if ($("#momentBtn4").hasClass("timebtnChecked")) {
        bookTid($("#momentBtn4").text());
      }
    });
  }

  $.ajax({
    type: "GET",
    url: "https://considconferancebooker.azurewebsites.net/getevents",
    data: { get_param: "value" },
    dataType: "json",
    success: function(data) {
      var json = jQuery.parseJSON(data);
      var timenow = clockTimeNow();
      ledigOrUpptagen(json, timenow);
      generateMomentBtnCont(timenow);
      hideBokaTid();
      checkedTidCells();
      clickBokaTid();
    }
  });
});
