import yoga from "./Images/yoga.jpg"
import pilates from "./Images/pilates.jpg"
import strength from "./Images/strength.jpg"
import wellness from "./Images/wellness.jpg"
import yoga_tn from "./Images/yoga_tn.jpg"
import pilates_tn from "./Images/pilates_tn.jpg"
import strength_tn from "./Images/strength_tn.jpg"
import wellness_tn from "./Images/wellness_tn.jpg"
import offer1 from "./Images/offer1.jpg"
import offer2 from "./Images/offer2.jpg"
import offer3 from "./Images/offer3.jpg"
import offer4 from "./Images/offer4.jpg"
import offer1_tn from "./Images/offer1_tn.jpg"
import offer2_tn from "./Images/offer2_tn.jpg"
import offer3_tn from "./Images/offer3_tn.jpg"
import offer4_tn from "./Images/offer4_tn.jpg"

const users =  [ {"id":26,"first_name":"Joice","last_name":"Noteyoung","email":"jnoteyoungp@weibo.com","gender":"Female","image":"https://robohash.org/necessitatibusevenietsit.png?size=50x50&set=set1"},
    {"id":27,"first_name":"Sher","last_name":"Dodamead","email":"sdodameadq@soup.io","gender":"Female","image":"https://robohash.org/necessitatibusprovidentqui.png?size=50x50&set=set1"},
    {"id":28,"first_name":"Angelle","last_name":"Chadburn","email":"achadburnr@columbia.edu","gender":"Female","image":"https://robohash.org/earumsimiliqueet.png?size=50x50&set=set1"},
    {"id":29,"first_name":"Salomo","last_name":"Fleisch","email":"sfleischs@statcounter.com","gender":"Male","image":"https://robohash.org/rerumbeataearchitecto.png?size=50x50&set=set1"},
    {"id":30,"first_name":"Monika","last_name":"Simione","email":"msimionet@statcounter.com","gender":"Female","image":"https://robohash.org/accusamusnamdolorem.png?size=50x50&set=set1"},
    {"id":31,"first_name":"Leanna","last_name":"Iiannoni","email":"liiannoniu@pagesperso-orange.fr","gender":"Female","image":"https://robohash.org/nobisinmolestias.png?size=50x50&set=set1"},
    {"id":32,"first_name":"Jerrylee","last_name":"Petrolli","email":"jpetrolliv@diigo.com","gender":"Female","image":"https://robohash.org/voluptatenecessitatibussunt.png?size=50x50&set=set1"},
    {"id":33,"first_name":"Cozmo","last_name":"Olifard","email":"colifardw@joomla.org","gender":"Male","image":"https://robohash.org/molestiaeinratione.png?size=50x50&set=set1"},
    {"id":34,"first_name":"Konstantin","last_name":"Bohlmann","email":"kbohlmannx@sogou.com","gender":"Male","image":"https://robohash.org/undeoditnulla.png?size=50x50&set=set1"},
    {"id":35,"first_name":"Ray","last_name":"Juris","email":"rjurisy@sogou.com","gender":"Female","image":"https://robohash.org/aliasnullaadipisci.png?size=50x50&set=set1"},
    {"id":36,"first_name":"Jarib","last_name":"Fincham","email":"jfinchamz@mapy.cz","gender":"Male","image":"https://robohash.org/undequiid.png?size=50x50&set=set1"},
    {"id":37,"first_name":"Caspar","last_name":"Spellacy","email":"cspellacy10@devhub.com","gender":"Male","image":"https://robohash.org/etmaximenecessitatibus.png?size=50x50&set=set1"},
    {"id":38,"first_name":"Ollie","last_name":"De Biasi","email":"odebiasi11@unc.edu","gender":"Female","image":"https://robohash.org/nisivoluptatumfugiat.png?size=50x50&set=set1"},
    {"id":39,"first_name":"Reinald","last_name":"Roll","email":"rroll12@meetup.com","gender":"Male","image":"https://robohash.org/expeditasitmagnam.png?size=50x50&set=set1"},
    {"id":40,"first_name":"Ynez","last_name":"Wimbridge","email":"ywimbridge13@hatena.ne.jp","gender":"Female","image":"https://robohash.org/eosfacilisconsequatur.png?size=50x50&set=set1"},
    {"id":41,"first_name":"Yolane","last_name":"Whiscard","email":"ywhiscard14@nature.com","gender":"Female","image":"https://robohash.org/etminimaaut.png?size=50x50&set=set1"},
    {"id":42,"first_name":"Trudi","last_name":"Giraths","email":"tgiraths15@digg.com","gender":"Female","image":"https://robohash.org/laboriosameaqueoptio.png?size=50x50&set=set1"},
    {"id":43,"first_name":"Cinderella","last_name":"Paynes","email":"cpaynes16@google.de","gender":"Female","image":"https://robohash.org/exercitationemaliquidillo.png?size=50x50&set=set1"},
    {"id":44,"first_name":"Wildon","last_name":"Labrone","email":"wlabrone17@jigsy.com","gender":"Male","image":"https://robohash.org/ipsamfugiatea.png?size=50x50&set=set1"},
    {"id":45,"first_name":"Susi","last_name":"Attiwill","email":"sattiwill18@hatena.ne.jp","gender":"Female","image":"https://robohash.org/autemnontotam.png?size=50x50&set=set1"},
    {"id":46,"first_name":"Billi","last_name":"Baudain","email":"bbaudain19@xing.com","gender":"Female","image":"https://robohash.org/voluptasexplicabovoluptatem.png?size=50x50&set=set1"},
    {"id":47,"first_name":"Blake","last_name":"Strutton","email":"bstrutton1a@ted.com","gender":"Male","image":"https://robohash.org/autquibusdamet.png?size=50x50&set=set1"},
    {"id":48,"first_name":"Carey","last_name":"Rabbet","email":"crabbet1b@netscape.com","gender":"Male","image":"https://robohash.org/asperioresrerumqui.png?size=50x50&set=set1"},
    {"id":49,"first_name":"Aubrey","last_name":"Reisenberg","email":"areisenberg1c@printfriendly.com","gender":"Male","image":"https://robohash.org/quodblanditiisquibusdam.png?size=50x50&set=set1"},
    {"id":50,"first_name":"Maribeth","last_name":"Cafferky","email":"mcafferky1d@creativecommons.org","gender":"Female","image":"https://robohash.org/molestiaeautexplicabo.png?size=50x50&set=set1"},
    {"id":25,"first_name":"Sven","last_name":"Donnersberg","email":"sdonnersbergo@google.com","gender":"Male","image":"https://robohash.org/exercitationemconsequaturcum.png?size=50x50&set=set1"},
]

const events  = [
    {
        title: "YOGA",
        instructor: "Daniel David Shalibo",
        location: {building: "Adidas Head Office", room: "3rd floor, room 301"},
        time: "07:00",
        date: "2019-05-29T07:00:00.000Z",
        totalSpots: 20,
        takenSpots: 17,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: yoga,
        thumbnail: yoga_tn,
        id: "1"
    },
    {
        title: "PILATES",
        instructor: "Shiran Harel",
        location: {building: "Adidas Head Office", room: "Rooftop"},
        time: "19:00",
        date: "2019-05-29T19:00:00.000Z",
        totalSpots: 20,
        takenSpots: 10,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: pilates,
        thumbnail: pilates_tn,
        id: "2"
    },
    {
        title: "STRENGTH",
        instructor: "Daniel David Shalibo",
        location: {building: "Adidas Head Office", room: "3rd floor, room 301"},
        time: "15:00",
        date: "2019-05-29T15:00:00.000Z",
        totalSpots: 40,
        takenSpots: 27,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: strength,
        thumbnail: strength_tn,
        id: "3"
    },
    {
        title: "WELLNESS",
        instructor: "Shiran Harel",
        location: {building: "Adidas Head Office", room: "6th floor, room 605"},
        time: "17:00",
        date: "2019-05-29T17:00:00.000Z",
        totalSpots: 20,
        takenSpots: 18,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: wellness,
        thumbnail: wellness_tn,
        id: "4"
    },
    {
        title: "YOGA",
        instructor: "Daniel David Shalibo",
        location: {building: "Adidas Head Office", room: "3rd floor, room 301"},
        time: "07:00",
        date: "2019-05-29T07:00:00.000Z",
        totalSpots: 20,
        takenSpots: 17,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: yoga,
        thumbnail: yoga_tn,
        id: "1"
    },
    {
        title: "PILATES",
        instructor: "Shiran Harel",
        location: {building: "Adidas Head Office", room: "Rooftop"},
        time: "19:00",
        date: "2019-05-29T19:00:00.000Z",
        totalSpots: 20,
        takenSpots: 10,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: pilates,
        thumbnail: pilates_tn,
        id: "2"
    },
    {
        title: "STRENGTH",
        instructor: "Daniel David Shalibo",
        location: {building: "Adidas Head Office", room: "3rd floor, room 301"},
        time: "15:00",
        date: "2019-05-29T15:00:00.000Z",
        totalSpots: 40,
        takenSpots: 27,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: strength,
        thumbnail: strength_tn,
        id: "3"
    },
    {
        title: "WELLNESS",
        instructor: "Shiran Harel",
        location: {building: "Adidas Head Office", room: "6th floor, room 605"},
        time: "17:00",
        date: "2019-05-29T17:00:00.000Z",
        totalSpots: 20,
        takenSpots: 18,
        description: "Some short description about the workout, who is it intended for, what level is it going to be, etc.",
        image: wellness,
        thumbnail: wellness_tn,
        id: "4"
    },

]

const promotions = [
    {
        title: "Adidas Ultra",
        subtitle: "A Quality Yoga Outfit",
        price: 75.00,
        tag: "NEW OFFER",
        image: offer1,
        thumbnail: offer1_tn,
        id: "1"
    },
    {
        title: "Earth Juice",
        subtitle: "Free Bottle",
        price: 10.00,
        tag: "HOT OFFER",
        image: offer2,
        thumbnail: offer2_tn,
        id: "2"
    }, {
        title: "Lulu Lemon Yoga Mat",
        subtitle: "At 20% Off",
        price: 32.50,
        tag: "ALMOST FINISHED",
        image: offer3,
        thumbnail: offer3_tn,
        id: "3"
    },
    {
        title: "Nike HIT",
        subtitle: "Pro Running Shoes",
        price: 120.00,
        tag: "HOT OFFER",
        image: offer4,
        thumbnail: offer4_tn,
        id: "4"
    },

]

export const company2 = {name: "Nike", users: users, events: events, promotions: promotions, image:"https://www.businessinsider.com/image/53d29d5c6bb3f7a80617ada8-1200-924/nike-logo.png"  }
