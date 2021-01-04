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

const users =  [    {"id":51,"first_name":"Cozmo","last_name":"Harler","email":"charler1e@opensource.org","gender":"Male","image":"https://robohash.org/etaccusantiumet.png?size=50x50&set=set1"},
    {"id":52,"first_name":"Durward","last_name":"Ransfield","email":"dransfield1f@sakura.ne.jp","gender":"Male","image":"https://robohash.org/praesentiumoditratione.png?size=50x50&set=set1"},
    {"id":53,"first_name":"Marnia","last_name":"Britto","email":"mbritto1g@liveinternet.ru","gender":"Female","image":"https://robohash.org/consequaturporrofacere.png?size=50x50&set=set1"},
    {"id":54,"first_name":"Bronnie","last_name":"Castanyer","email":"bcastanyer1h@va.gov","gender":"Male","image":"https://robohash.org/temporenequemollitia.png?size=50x50&set=set1"},
    {"id":55,"first_name":"Tasia","last_name":"Spyby","email":"tspyby1i@timesonline.co.uk","gender":"Female","image":"https://robohash.org/dolorsintut.png?size=50x50&set=set1"},
    {"id":56,"first_name":"Arlette","last_name":"Primmer","email":"aprimmer1j@multiply.com","gender":"Female","image":"https://robohash.org/evenietvoluptatefacere.png?size=50x50&set=set1"},
    {"id":57,"first_name":"Alexio","last_name":"Trett","email":"atrett1k@google.ca","gender":"Male","image":"https://robohash.org/inoditest.png?size=50x50&set=set1"},
    {"id":58,"first_name":"Chrisy","last_name":"Harner","email":"charner1l@squidoo.com","gender":"Male","image":"https://robohash.org/autquiarerum.png?size=50x50&set=set1"},
    {"id":59,"first_name":"Franz","last_name":"Jewar","email":"fjewar1m@prweb.com","gender":"Male","image":"https://robohash.org/earumipsumvel.png?size=50x50&set=set1"},
    {"id":60,"first_name":"Marcello","last_name":"Mallows","email":"mmallows1n@devhub.com","gender":"Male","image":"https://robohash.org/delectusreiciendisvitae.png?size=50x50&set=set1"},
    {"id":61,"first_name":"Andonis","last_name":"Baldery","email":"abaldery1o@devhub.com","gender":"Male","image":"https://robohash.org/nonetreiciendis.png?size=50x50&set=set1"},
    {"id":62,"first_name":"Kathleen","last_name":"Kopps","email":"kkopps1p@hao123.com","gender":"Female","image":"https://robohash.org/asperioresnonvoluptatem.png?size=50x50&set=set1"},
    {"id":63,"first_name":"Kikelia","last_name":"Dalglish","email":"kdalglish1q@tumblr.com","gender":"Female","image":"https://robohash.org/cupiditateconsequaturest.png?size=50x50&set=set1"},
    {"id":64,"first_name":"Franklin","last_name":"Dri","email":"fdri1r@t.co","gender":"Male","image":"https://robohash.org/distinctiodoloresearum.png?size=50x50&set=set1"},
    {"id":65,"first_name":"Oralla","last_name":"Dunrige","email":"odunrige1s@gmpg.org","gender":"Female","image":"https://robohash.org/voluptateliberovel.png?size=50x50&set=set1"},
    {"id":66,"first_name":"Isidoro","last_name":"Scones","email":"iscones1t@ox.ac.uk","gender":"Male","image":"https://robohash.org/quiquiaiure.png?size=50x50&set=set1"},
    {"id":67,"first_name":"Tova","last_name":"Quinnelly","email":"tquinnelly1u@tmall.com","gender":"Female","image":"https://robohash.org/fugitremeos.png?size=50x50&set=set1"},
    {"id":68,"first_name":"Ricki","last_name":"Gilogly","email":"rgilogly1v@live.com","gender":"Female","image":"https://robohash.org/ipsumautlaborum.png?size=50x50&set=set1"},
    {"id":69,"first_name":"Aimil","last_name":"Kenworthey","email":"akenworthey1w@prnewswire.com","gender":"Female","image":"https://robohash.org/laudantiumestipsam.png?size=50x50&set=set1"},
    {"id":70,"first_name":"Grady","last_name":"Renison","email":"grenison1x@go.com","gender":"Male","image":"https://robohash.org/similiquequisunt.png?size=50x50&set=set1"},
    {"id":71,"first_name":"Maressa","last_name":"Harlick","email":"mharlick1y@zimbio.com","gender":"Female","image":"https://robohash.org/errorquiaet.png?size=50x50&set=set1"},
    {"id":72,"first_name":"Asia","last_name":"O'Lagen","email":"aolagen1z@sohu.com","gender":"Female","image":"https://robohash.org/praesentiumquosnatus.png?size=50x50&set=set1"},
    {"id":73,"first_name":"Corenda","last_name":"Gauche","email":"cgauche20@ox.ac.uk","gender":"Female","image":"https://robohash.org/ipsaestqui.png?size=50x50&set=set1"},
    {"id":74,"first_name":"Mohammed","last_name":"Bogue","email":"mbogue21@webmd.com","gender":"Male","image":"https://robohash.org/asperioresetsunt.png?size=50x50&set=set1"},
    {"id":75,"first_name":"Daisy","last_name":"Auden","email":"dauden22@nhs.uk","gender":"Female","image":"https://robohash.org/consequaturarchitectoest.png?size=50x50&set=set1"}
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

export const company3 = {name: "fiverr", users: users, events: events, promotions: promotions, image:"https://assetsv2.fiverrcdn.com/assets/v2_globals/fiverr-logo-new-green-64920d4e75a1e04f4fc7988365357c16.png"  }
