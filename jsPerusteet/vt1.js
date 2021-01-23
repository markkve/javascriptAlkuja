"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen leimaamat rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin
// voit vapaasti luoda data-rakenteen pohjalta omia aputietorakenteita

// Kirjoita tästä eteenpäin oma ohjelmakoodisi

// Seuraavilla voit tutkia selaimen konsolissa käytössäsi olevaa tietorakennetta. 

console.log(data);

console.dir(data);

log("-------------------------------------------------------------");

// Vaihe 1
// Tulosta joukkueet funktio
/**
 * Tulostetaan joukkueet ja sarjojen nimet datarakenteesta
 * @param {Object} data 
 */
function tulostaJoukkueet(data) {
    
    //log(data.alkuaika);

    let teams = data.joukkueet;
    let teamsArr = [];
    // For silmukalla pusketaan taulukkoon nimet ja sarjat
    for (let i = 0; i < teams.length; i++) {
        //tässä viimeinen välilyönti pois, ensimmäinen vastaavasti
        let teamName = teams[i].nimi;
        if (teamName.endsWith(" ")) {
            teamsArr.push(teamName.substring(0, teamName.length-1) + " " + teams[i].sarja.nimi);
        }
        else { teamsArr.push(teams[i].nimi + " " + teams[i].sarja.nimi); }
        //log(teams[i].nimi + ": " + teams[i].sarja.nimi);
    }

    console.log(teamsArr);

    // Järjestetään taulukko aakkosjärjestykseen sort funktiolla
    let sortArr = teamsArr.sort(function (a,b){
        let nameA = a.toUpperCase();
        let nameB = b.toUpperCase();
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1; }
        return 0;
    });

    // Tulostetaan jokainen elementti omalle rivilleen järjestetystä taulukosta
    for (let elem of sortArr) {
        log(elem);
    }   
    
}
    // Luodaan uusi joukkue
  let joukkue =  { 
         "nimi": "Mallijoukkue",
         "jasenet": [
           "Lammi Tohtonen",
            "Matti Meikäläinen"
         ],
      "leimaustapa": [0,2],
      "rastit": [],
      "sarja": "",
         "id": 99999
    };

    // Kutsutaan lisääJoukkue funktiota
lisaaJoukkue(data, joukkue, data.sarjat[2]);

    
/**
 * Määritetään uuden joukkueen sarja parametrin arvoksi ja lisätään joukkue tietorakenteeseen
 * @param {Object} data 
 * @param {Object} joukkue 
 * @param {Object} sarja 
 */
function lisaaJoukkue (data, joukkue, sarja) {
        
    joukkue.sarja = sarja;
    data.joukkueet.push(joukkue);
    //console.log(data);
}



//kutsutaan muutaSarjanNimi funktiota
muutaSarjanNimi(data, "8h", "10h");
// käydään alkiot läpi ja jos löytyy vanhan nimen omaava sarja, muutetaan sen nimi parametrin uusinimi arvoon
/**
 * 
 * @param {Object} data 
 * @param {String} vanhanimi 
 * @param {String} uusinimi 
 */
function muutaSarjanNimi(data, vanhanimi, uusinimi) {
    for (let i = 0; i < data.sarjat.length; i++) {
        if (data.sarjat[i].nimi == vanhanimi) {data.sarjat[i].nimi = uusinimi;}
    }
    
}


/**
 * Tulostetaan rastit jotka alkavat numerolla
 * @param {Object} data 
 */
function tulostaRastit(data) {
    let lista = [];
    //lisätään rastit jotka alkavat numerolla uuteen listaan.
    for (let i = 0; i < data.rastit.length; i++) {
        let code = data.rastit[i].koodi;
        if (isNumeric(code.charAt(0))) { lista.push(data.rastit[i].koodi + ";");}
       
    }
    // Järjestetään uuusi lista ja muutetaan se stringiksi. Tämän jälkeen vaihdetaan pilkut pois
    let jarjLista = lista.sort().toString();
    let ilmanPilkkuja = jarjLista.replace(/,/g,'');
    log(ilmanPilkkuja);
}

// Tarkistetaan onko rasti alkava numerolla.
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


console.log(data);
tulostaJoukkueet(data);
log(" ");
tulostaRastit(data);
log("-----------------------------------------------------------");
log("Vaihe 3");
log("-----------------------------------------------------------");
log(" ");

//---------------------------------------------------------
// Vaihe  3

poistaJoukkue(data, "Vara 1");
poistaJoukkue(data, "Vara 2");
poistaJoukkue(data, "Vapaat");
// Yleiskäyttöinen poista funktio Joukkuelille
function poistaJoukkue(data, nimi){
    for (let i = 0; i < data.joukkueet.length; i++) {
        if (data.joukkueet[i].nimi == nimi) {data.joukkueet.splice(i,1);}
    }
}



/**
 * etsii annetun joukkueen indeksin data.joukkueet taulukossa joukkueen nimen perusteella. 
 * palauttaa -1 jos ei löydy.
 * @param {Object} data 
 * @param {string} joukkueNimi
 * @returns {number} 
 */
function etsiJoukkue(data, joukkueNimi){
    if(data === undefined || joukkueNimi === undefined){
        return -1;
    }

    let joukkueet = data.joukkueet;

    for(let joukkue of joukkueet){
        if(joukkue.nimi.toLowerCase().trim() == joukkueNimi.toLowerCase().trim()){
            //log(joukkue.nimi);
            return joukkueet.indexOf(joukkue);
            
        }
    }

    return -1;

}


/**
 * Etsii joukkeen rastileimauksista rastin sen koodin perusteella.
 * @param {Object} joukkue 
 * @param {number} rastiNum 
 * @returns {number}
 */
function etsiJRasti(joukkue, rastiNum){
    if (joukkue === undefined || rastiNum === undefined){ //tarkastetaan onko joukkuetta tai rastia olemassa
        return -1;
    }


   let leimaukset = joukkue.rastit;
   for (let leimaus of leimaukset){
       if(leimaus.rasti == undefined || leimaus.rasti == "0"){ //Tarkastetaan onko rasti viable
           continue;
       }

       //log(leimaus.rasti.koodi);
       // palautetaan leimauksen index
       if(leimaus.rasti.koodi == rastiNum){
           return leimaukset.indexOf(leimaus);
       }
   }

   return -1;
}



log(" ");
//console.log("Testejä alla");
//haetaan Dynamic duo jonka rasti haluttiin vaihtaa, sekä vaihdettavan rastin index
let joukkue1 = data.joukkueet[etsiJoukkue(data, "Dynamic Duo ")];
let rastinIdx = etsiJRasti(joukkue1, "93");
//var uusiRasti = haeUusiRasti(data, "32");
//var uusiRasti = data.rastit[1].koodi;
//haetaan uusi rasti rastit tietorakenteesta
var uusiRasti = haeUusiRasti(data, "32");

function haeUusiRasti (data, koodi) {
    for (let rasti of data.rastit) {
        if (rasti.koodi == koodi) { return rasti; }
    }
}


//kutsutaan vaihdarasti funktiota yllä määritellyin parametrein, aika jätetään tyhjäksi.
vaihdaRasti(joukkue1, rastinIdx, uusiRasti, "");

/**
 * Vaihtaa pyydetyn rastileimauksen sijalle uuden rastin
 * @param {Object} joukkue1
 * @param {number} rastinIdx - rastin paikka joukkue.rastit-taulukossa
 * @param {Object} uusirasti
 * @param {string} Aika - Rastileimauksen aika. Jos tätä ei anneta, käytetään samaa aikaa kuin vanhassa korvattavassa leimauksessa
 */
function vaihdaRasti(joukkue1, rastinIdx, uusiRasti, aika) {
    //log(joukkue1.rastit[rastinIdx].rasti.koodi);
    console.log(joukkue1.nimi + ": vaihdettu rasti koodilla: " + joukkue1.rastit[rastinIdx].rasti.koodi + " koodiin: " + uusiRasti.koodi);
    joukkue1.rastit[rastinIdx].rasti = uusiRasti;
    if (aika !== "") {joukkue1.rastit[rastinIdx].aika = aika;}
       
}


console.log(data.joukkueet[1].rastit);

//tulostaPisteet(data.joukkueet[2].rastit);



//Haetaan datarakenteesta joukkueiden pisteet. Kutsutaan operaation aloittavaa funktiota
joukkueidenPisteet(data);

/**
 * Lasketaan joukkueiden pisteet data rakenteesta.
 * Lisätään ne taulukkoon tulostaPisteet funktion avulla
 * @param {object} data 
 */
function joukkueidenPisteet (data) {
  
    let summaArr = []; 
    for (let elem of data.joukkueet) {
       
       summaArr.push(tulostaPisteet(elem, elem.rastit));
       
    }

    /**
     * Sort pistejärjestykseen ja jos samat kutsutaan vanhaa aakkosjärjestykseen sorttia
     */
    summaArr.sort(function(a, b) {
        //if (a < b) {return -1;}
        //if (a < b) {return 1;}
        let atonum = parseInt(a);
        let btonum = parseInt(b);
        if (atonum < btonum) {return 1;}
        if (atonum > btonum) {return -1;}

        else {return nimenMukaan(a, b);}
        //return return 1;

    });
    /**
     * Lopuksi kutsutaan fixaaString funktiota, tulostuksen viimeistelyksi
     */
    for (let elem of summaArr) {

        fixaaString(elem);

        //log(elem);
    }


}

/**
 * Korjataan stringin järjestys
 * @param {String} elem 
 */
function fixaaString(elem) {
    
    let sekasin = elem;
   
    let pisteet = sekasin.match(/(\d+)/); 
    console.log(pisteet);
    //Kutsutaan  haeNimi funktiota joka poistaa turhat pisteet stringin alusta
    let nimi = haeNimi(sekasin);
    //let nimi =  sekasin.replace(/[0-9]/g, '');
    //pisteet[0] koska tähän vaiheeseen tuli mukana kahdet pisteet koska numeroita oli nimen molemmin puolin.
    let korjattu = nimi + " (" + pisteet[0] + " p)";
    log(korjattu);
    //log(summa);
}

/**
 * Sort
 * Aakkosjärjestys jos pisteet ovat samat
 * @param {String} a 
 * @param {String} b 
 */
function nimenMukaan (a, b) {

    
        let nameA = a.toUpperCase();
        let nameB = b.toUpperCase();
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1; }
        return 0;
    
}

/**
 * Poistaa pisteet ja turhat välilyönnit stringin alusta sekä lopusta
 * @param {String} sekasin 
 * palauttaa pelkän nimen.
 */
function haeNimi(sekasin) {
    if (sekasin.endsWith(" ")) {
        sekasin = sekasin.substring(0, sekasin.length-1);
    }
    for (let i = 0; i < sekasin.length; i++) {
    if(sekasin.charAt(0) != " ") {sekasin = sekasin.substring(1);}
    else { sekasin = sekasin.substring(1); break; }
    }
    
    return sekasin;
}

/**
 * Katsotaan että rasteissa ei ole duplikaatteja, poistetaan rastit joiden arvot eivät käy pisteisiin
 * ja tarkastetaan että laskenta alkaa lähdöstä ja päättyy maaliin.
 * @param {Object} joukkue 
 * @param {Array} jRastit 
 * Palauttaa stringing mallia: pisteet + " " + joukkueen nimi
 */
function tulostaPisteet(joukkue, jRastit) {
   
    let rastiSet = new Set();
    let joukkueenNimi = joukkue.nimi;
    
    for (let elem of jRastit) {
        

        if (onkoValidi1(elem.rasti)) { continue; }
    //elem.rasti == "Tuntematon rasti" || elem.rasti == "0" || elem.rasti == "F" || elem.rasti == undefined
        else { 
            rastiSet.add(elem.rasti.koodi);
                                                                 
        }       
    }

    let summa = 0;
    //suoritetaan rastiSetin sisällölle
    for (let item of rastiSet) {
        let pisteet = item;
        let lahto = false;
        if (pisteet == "LAHTO") {summa = 0; lahto = true;}
        if (lahto == true && pisteet == "MAALI") {break;}

        let pisteidenEka = pisteet.charAt(0);

                if (/\d/.test(pisteet.charAt(0))) { 
               
                //log(pisteet.charAt(0)); 
                let piste = parseInt(pisteidenEka);
                summa += piste;
                }
    }

    //log(summa);
    //let rastiArr = Array.from(rastiSet);
    //log(rastiArr);
    console.log(rastiSet);
    return (summa + " " + joukkueenNimi);
}

/**
 * Kolme eri versiota jotka tarkastaavat onko kyseinen rasti käyttökelpoinen.
 * @param {Object} kyseinenRasti 
 */
function onkoValidi (kyseinenRasti) {
    if (kyseinenRasti == "Tuntematon rasti" || kyseinenRasti == "0" || kyseinenRasti == "F" || kyseinenRasti == undefined ) {
        return true;
    }
    else {return false;}
}

function onkoValidi1 (kyseinenRasti) {
    if (kyseinenRasti === undefined || data.rastit.indexOf(kyseinenRasti) == -1) {
        return true;
    }
    else {return false;}
}

/**
 * Tarkistaa löytyykö valittua rastia rastit rakenteesta. 
 * @param {Object} data 
 * @param {Object} rasti 
 * @returns {boolean}
 */
function onkoValidiRasti(data, rasti){
    if( data === undefined || rasti === undefined){
        return false;
    }

    if(data.rastit.indexOf(rasti) == -1) {return false; }
    return true;
}

console.log(data);
log(" ");
log("-----------------------------------------------------------");
log("Vaihe 5");
log("-----------------------------------------------------------");
log(" ");



// Kutsutaan vaihe 5 toteutuksen aloittavaa funktiota
matkaJaAika1(data);

/**
 * Funktio Rakentaa uuden objectin joka koostuu joukkueista.
 * Joukkueiden sisällöstä tallennetaan nimi, pisteet, kuljettu matka ja kilpailuun kulunut aika
 * Taulukko järjestetään ja tulostetaan pyydetyt tiedot.
 * @param {Object} data 
 */
function matkaJaAika1(data) {

    let joukkueetArr = [];

    for (let elem of data.joukkueet) {
        //log(laskeMatka(elem));
        //log(laskeAika(elem));
        let joukkueenMatka = laskeMatka(elem);
        //log(joukkueenMatka + " km,");
        //log(" ");
        let joukkueenAika = laskeAika(elem);
        //log(joukkueenAika);

        let jPist = tulostaPisteet(elem, elem.rastit);
        let jPisteet = jPist.substring(0, jPist.indexOf(" "));

       // if (teamName.endsWith(" ")) {
       //     teamsArr.push(teamName.substring(0, teamName.length-1) + " " + teams[i].sarja.nimi);
       // }

        if (elem.nimi.endsWith(" ")) {
            elem.nimi = elem.nimi.substring(0, elem.nimi.length-1);
        }
        joukkueetArr.push({
            nimi : elem.nimi,
            pisteet : jPisteet,
            matka : joukkueenMatka,
            aika : joukkueenAika
        });
       
    }
    console.log(joukkueetArr);

    // sort funktio pisteiden, ajan, ja nimen mukaan
    joukkueetArr.sort(function (a, b) {
        let atonum = parseInt(a.pisteet);
        let btonum = parseInt(b.pisteet);
        if (atonum < btonum) {return 1;}
        if (atonum > btonum) {return -1;}
        if (a.joukkueenAika < b.joukkueenAika) {return 1;}
        if (a.joukkueenAika > b.joukkueenAika) {return -1;}
        if (a.nimi.toUpperCase() < b.nimi.toUpperCase()) {return -1;}
        if (a.nimi.toUpperCase() > b.nimi.toUpperCase()) {return 1;}
        return 0;
    });
    
    for (let elem of joukkueetArr) {
        log(elem.nimi + ", " + elem.pisteet + " p, " + elem.matka + " km, " + elem.aika);
    }
   
}

/**
 * Etsitään aloitus ja lopetus rastit
 * Viedään ne parametrina funktiolle joka laskee niiden erotuksen.
 * @param {Object} team 
 */
function laskeAika(team) {
    let alkuaika = "0";
    let loppuaika = "0";
    let lahtoKayty = false;

    
    for (let i = 0; i < team.rastit.length; i++) {

        if (!onkoValidiRasti(data, team.rastit[i].rasti)) {
            
            continue;
        }

        let rastinKoodi = team.rastit[i].rasti.koodi;
        if (rastinKoodi == "LAHTO") {lahtoKayty = true; alkuaika = team.rastit[i].aika; continue;}
        if (rastinKoodi == "MAALI" && lahtoKayty == true) {loppuaika = team.rastit[i].aika; break;}
    }
    return kasitteleKesto(alkuaika, loppuaika);
    //return (alkuaika + " --- " + loppuaika);
}

/**
 * Käsitellään kestot eli otetaan pvm ulos, ja lasketaan lopun ja alun erotus kellonajoista
 * @param {string} alku 
 * @param {string} loppu 
 */
function kasitteleKesto(alku, loppu) {

    if (alku == 0 && loppu == 0) { return "00:00:00";}

    let stAlku = alku;
        stAlku = stAlku.slice(stAlku.length - 8);
    let stTime = stAlku.split(":");
    //log(stTime);
    
    let fnLoppu = loppu;
        fnLoppu = fnLoppu.slice(fnLoppu.length - 8);
    let fnTime = fnLoppu.split(":");
    //log(fnTime);

    let alkuMs = parseInt(stTime[0]) * 3600000 + parseInt(stTime[1]) * 60000 + parseInt(stTime[2]) * 1000;
    //log(alkuMs);
    let loppuMs = parseInt(fnTime[0]) * 3600000 + parseInt(fnTime[1]) * 60000 + parseInt(fnTime[2]) * 1000;
    //log(loppuMs);
    //log("----------");

    let erotus = Math.abs(loppuMs - alkuMs);
    let tunnit = Math.floor(erotus / (1000 * 60 * 60));
    let minuutit = Math.floor(erotus / (1000 * 60)) - (tunnit * 60);
    let sekunnit = Math.floor(erotus / 1000) - (tunnit * 60 * 60) - (minuutit * 60);
    let todTunnit = String(tunnit).padStart(2, '0');
    let todMinuutit = String(minuutit).padStart(2, '0');
    let todSekunnit = String(sekunnit).padStart(2, '0');
    let todellinenErotus =  todTunnit + ":" + todMinuutit + ":" + todSekunnit;
    //log(todellinenErotus);
    return todellinenErotus;

}


/**
 * Laskee matkan edelliseltä validilta rastilta nykyiselle rastille ja lisää välimatkan summaan
 * @param {Object} team 
 */
function laskeMatka(team) {
    let matka = 0;
    let edellinenRasti = 0;
    let lahtoKayty = false;
    //console.log(team.rastit);
    //if (team.nimi == "Rennot 2") {
    for (let i = 0; i < team.rastit.length; i++) {

        if (!onkoValidiRasti(data, team.rastit[i].rasti)) {
            
            continue;
        }

        let rastinKoodi = team.rastit[i].rasti.koodi;
        if (rastinKoodi == "LAHTO") {lahtoKayty = true; matka = 0; edellinenRasti = team.rastit[i]; continue;}
               
        if(edellinenRasti == 0) {edellinenRasti = team.rastit[i]; continue;}
        
        else {
            
            let lat1 = edellinenRasti.rasti.lat;
            let lon1 = edellinenRasti.rasti.lon;
            let lat2 = team.rastit[i].rasti.lat;
            let lon2 = team.rastit[i].rasti.lon;
            

            matka += getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

            edellinenRasti = team.rastit[i];
            if (rastinKoodi == "MAALI" && lahtoKayty == true) {break;}
        }

    }

    return Math.round(matka);
    
}



/**
 * valmiit funktiot matkan laskemista varten
 * @param {kyseisen tai edellisen rastin leveys} lat1 
 * @param {kyseisen tai edellisen rastin pituus} lon1 
 * @param {seuraavan rastin leveys} lat2 
 * @param {seuraavan rastin pituus} lon2 
 */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    //log(d);
    return d;
  }
  
  //valmis asteet radiaaneiksi
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }



