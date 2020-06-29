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

  $.ajax(
    {
      url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
      method: 'GET',
      success: function(data){

        console.log(data.response[1])
        
        var meseDelAnno = 2018 + "-" + 1
        var giorniNelMese = moment(meseDelAnno, "YYYY-MM").daysInMonth();
        // console.log(moment(giorniNelMese));

        for(var i = 1; i <= giorniNelMese; i++){
          // var gg = moment("2018-01-01").format('D');
          var template = $('.template').find('.giorno').clone();
          template.text(i);
          $('.wrapper').append(template);
      }
           // Appendere TEMPLATE HTML nel Elemento desiderato.




         // }

      },
      error: function(richiesta, stato, errore){
          alert('ERROR');
      }
    }
  );



});
