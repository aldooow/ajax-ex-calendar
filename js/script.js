/*
Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018 dando
la possibilità di cambiare mese, gestendo il caso in cui l’API non possa
ritornare festività. Il calendario partirà da gennaio 2018 e si concluderà a
dicembre 2018 (unici dati disponibili sull’API).

Ogni volta che cambio mese dovrò:
  1.Controllare se il mese è valido (per ovviare al problema che l’API non
    carichi holiday non del 2018)
  2.Controllare quanti giorni ha il mese scelto formando così una lista
  3.Chiedere all’api quali sono le festività per il mese scelto
  4.Evidenziare le festività nella lista.
*/

$(document).ready(function() {


      var baseDate = moment({
        date: 1,
        month: 0,
        year: 2018
      });
      printMonth(baseDate);
      printHolidays(baseDate);

      $(".next").click(function(){
        $(".wrapper-days").html("");
        var thisMonth = $("h2").attr("data-this-month");
        var momentThisMonth = moment(thisMonth)
        var nextMonth = momentThisMonth.add(1,'months');

        if(momentThisMonth.year()==2018){
          printMonth(nextMonth);
          printHolidays(nextMonth);
        }else{
          alert("Possiamo vedere soltanto il anno 2018.")
          printMonth(baseDate);
          printHolidays(baseDate);
        }
      });

      $(".prev").click(function(){
        $(".wrapper-days").html("");
        var thisMonth = $("h2").attr("data-this-month");
        var momentThisMonth = moment(thisMonth)
        var nextMonth = momentThisMonth.subtract(1,'months');

        if(momentThisMonth.year()==2018){
          printMonth(nextMonth);
          printHolidays(nextMonth);
        }else{
          alert("Possiamo vedere soltanto il anno 2018.")
          printMonth(baseDate);
          printHolidays(baseDate);
        }

      })


});



// FUNCTIONS

// FUNCTION: printMonth();
// Questa funzione stampa tutti gioni compresi in un mese.
//   --> baseDate: questo argomento deve essere un elemento
//       MOMENT in formato (YYYY-MM-DD) che rappresenta il primo giono del mes.
function printMonth(baseDate){
$(".month").text(baseDate.format("MMMM YYYY"));
$(".month").attr("data-this-month", baseDate.format("YYYY-MM-DD"))
  //Quantita di giorni compresi in un mese.
  var daysInMonth = baseDate.daysInMonth();

  var source = $("#day-template").html();
  var template = Handlebars.compile(source);

  //Ciclo FOR per stampare tutti giorni del mese.
  for(var i = 1; i <= daysInMonth; i++){
    var currentDay = moment({
      name: "",
      date: i,
      month: baseDate.month(),
      year: baseDate.year(),
    });
    var context = {
      // Giorno da stampare.
      date: currentDay.format("dd D"),
      // Attributo da stampare (nello stesso formato API dei giorni festivi.)
      day_attr: currentDay.format("YYYY-MM-DD")
    };
    var html = template(context);
    $('.wrapper-days').append(html);
    }
  };

// FUNCTION: printHolidays();
// Questa funzione stampa tutti gioni festivi compresi in un mese.
//   --> baseDate: questo argomento deve essere un elemento
//       MOMENT in formato (YYYY-MM-DD)
function printHolidays(baseDate){
  $.ajax(
    {
      url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
      method: 'GET',
      data: {
        year: baseDate.year(),
        month: baseDate.month(),
      },
      success: function(data){
        var holidays = data.response;

        // Ciclo FOR per individuare ogni "giorno festivo",
        for(var i = 0; i < holidays.length; i++){
          var currentHolidays = holidays[i];
          // che combaccia con il Attributo che ha ogni giorno.
          var  thisDate = $('.number-day[attr-current-data="' + currentHolidays.date + '"]');
          // Aggiunge Class Holyday.
          thisDate.parent().addClass("holyday");
          // Aggiunge Name Holyday.
          thisDate.siblings().append(currentHolidays.name);


        }
      },
      error: function(richiesta, stato, errore){
          alert('ERROR');
      }
      }
  );

};
