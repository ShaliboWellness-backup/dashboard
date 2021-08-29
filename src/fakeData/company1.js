import yoga from './Images/yoga.jpg';
import pilates from './Images/pilates.jpg';
import strength from './Images/strength.jpg';
import wellness from './Images/wellness.jpg';
import yoga_tn from './Images/yoga_tn.jpg';
import pilates_tn from './Images/pilates_tn.jpg';
import strength_tn from './Images/strength_tn.jpg';
import wellness_tn from './Images/wellness_tn.jpg';
import offer1 from './Images/offer1.jpg';
import offer2 from './Images/offer2.jpg';
import offer3 from './Images/offer3.jpg';
import offer4 from './Images/offer4.jpg';
import offer1_tn from './Images/offer1_tn.jpg';
import offer2_tn from './Images/offer2_tn.jpg';
import offer3_tn from './Images/offer3_tn.jpg';
import offer4_tn from './Images/offer4_tn.jpg';

const users = [{
  id: 1, first_name: 'Thorn', last_name: 'Yarn', email: 'tyarn0@ed.gov', gender: 'Male', image: 'https://robohash.org/doloremquequassit.png?size=50x50&set=set1',
},
{
  id: 2, first_name: 'Lauri', last_name: 'Sego', email: 'lsego1@theatlantic.com', gender: 'Female', image: 'https://robohash.org/sedquibusdamdistinctio.png?size=50x50&set=set1',
},
{
  id: 3, first_name: 'Dee', last_name: 'Ganiford', email: 'dganiford2@bizjournals.com', gender: 'Female', image: 'https://robohash.org/rerumnonest.png?size=50x50&set=set1',
},
{
  id: 4, first_name: 'Franny', last_name: 'MacCallion', email: 'fmaccallion3@fastcompany.com', gender: 'Female', image: 'https://robohash.org/etsednihil.png?size=50x50&set=set1',
},
{
  id: 5, first_name: 'Sinclair', last_name: 'Tulleth', email: 'stulleth4@howstuffworks.com', gender: 'Male', image: 'https://robohash.org/laborequodlaboriosam.png?size=50x50&set=set1',
},
{
  id: 6, first_name: 'Francene', last_name: 'Chivrall', email: 'fchivrall5@cornell.edu', gender: 'Female', image: 'https://robohash.org/voluptatenonsed.png?size=50x50&set=set1',
},
{
  id: 7, first_name: 'Michal', last_name: 'Pleace', email: 'mpleace6@imdb.com', gender: 'Female', image: 'https://robohash.org/facilisvoluptasquibusdam.png?size=50x50&set=set1',
},
{
  id: 8, first_name: 'Melisa', last_name: 'Verryan', email: 'mverryan7@washingtonpost.com', gender: 'Female', image: 'https://robohash.org/laborumetqui.png?size=50x50&set=set1',
},
{
  id: 9, first_name: 'Friedrick', last_name: 'Jamison', email: 'fjamison8@vkontakte.ru', gender: 'Male', image: 'https://robohash.org/cumnobisincidunt.png?size=50x50&set=set1',
},
{
  id: 10, first_name: 'Scottie', last_name: 'Babbage', email: 'sbabbage9@pen.io', gender: 'Male', image: 'https://robohash.org/ducimusomnisomnis.png?size=50x50&set=set1',
},
{
  id: 11, first_name: 'Demott', last_name: 'Popping', email: 'dpoppinga@nyu.edu', gender: 'Male', image: 'https://robohash.org/placeatillumofficiis.png?size=50x50&set=set1',
},
{
  id: 12, first_name: 'Johanna', last_name: 'Yousef', email: 'jyousefb@columbia.edu', gender: 'Female', image: 'https://robohash.org/asperioresetdoloremque.png?size=50x50&set=set1',
},
{
  id: 13, first_name: 'Fancie', last_name: 'Cough', email: 'fcoughc@opera.com', gender: 'Female', image: 'https://robohash.org/debitisomnisvelit.png?size=50x50&set=set1',
},
{
  id: 14, first_name: 'Nappie', last_name: 'Pring', email: 'npringd@flavors.me', gender: 'Male', image: 'https://robohash.org/totamdoloribusnam.png?size=50x50&set=set1',
},
{
  id: 15, first_name: 'La verne', last_name: 'Davidow', email: 'ldavidowe@cam.ac.uk', gender: 'Female', image: 'https://robohash.org/aliasmagnamculpa.png?size=50x50&set=set1',
},
{
  id: 16, first_name: 'Zondra', last_name: 'Bottleson', email: 'zbottlesonf@apple.com', gender: 'Female', image: 'https://robohash.org/undequideleniti.png?size=50x50&set=set1',
},
{
  id: 17, first_name: 'Terri', last_name: 'Cunnah', email: 'tcunnahg@usda.gov', gender: 'Female', image: 'https://robohash.org/etipsumdolor.png?size=50x50&set=set1',
},
{
  id: 18, first_name: 'Alleyn', last_name: 'Toretta', email: 'atorettah@cnbc.com', gender: 'Male', image: 'https://robohash.org/quaeratnonofficiis.png?size=50x50&set=set1',
},
{
  id: 19, first_name: 'Napoleon', last_name: 'Bernakiewicz', email: 'nbernakiewiczi@acquirethisname.com', gender: 'Male', image: 'https://robohash.org/molestiasenimsit.png?size=50x50&set=set1',
},
{
  id: 20, first_name: 'Viv', last_name: 'Gladebeck', email: 'vgladebeckj@mysql.com', gender: 'Female', image: 'https://robohash.org/ducimuslaboriosamquos.png?size=50x50&set=set1',
},
{
  id: 21, first_name: 'Page', last_name: 'Ladon', email: 'pladonk@prlog.org', gender: 'Female', image: 'https://robohash.org/eosmolestiasnon.png?size=50x50&set=set1',
},
{
  id: 22, first_name: 'Berny', last_name: 'Rivel', email: 'brivell@zimbio.com', gender: 'Male', image: 'https://robohash.org/voluptatempraesentiumvelit.png?size=50x50&set=set1',
},
{
  id: 23, first_name: 'Norby', last_name: 'Loxton', email: 'nloxtonm@nps.gov', gender: 'Male', image: 'https://robohash.org/ipsacorporisenim.png?size=50x50&set=set1',
},
{
  id: 24, first_name: 'Morty', last_name: 'Tanswill', email: 'mtanswilln@ifeng.com', gender: 'Male', image: 'https://robohash.org/quisveloptio.png?size=50x50&set=set1',
},
{
  id: 25, first_name: 'Sven', last_name: 'Donnersberg', email: 'sdonnersbergo@google.com', gender: 'Male', image: 'https://robohash.org/exercitationemconsequaturcum.png?size=50x50&set=set1',
},
];

const events = [
  {
    title: 'YOGA',
    instructor: 'Daniel David Shalibo',
    location: { building: 'Adidas Head Office', room: '3rd floor, room 301' },
    time: '07:00',
    date: '2019-07-29T07:00:00.000Z',
    totalSpots: 20,
    takenSpots: 17,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: yoga,
    thumbnail: yoga_tn,
    id: '1',
  },
  {
    title: 'PILATES',
    instructor: 'Shiran Harel',
    location: { building: 'Adidas Head Office', room: 'Rooftop' },
    time: '19:00',
    date: '2019-07-29T19:00:00.000Z',
    totalSpots: 20,
    takenSpots: 10,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: pilates,
    thumbnail: pilates_tn,
    id: '2',
  },
  {
    title: 'STRENGTH',
    instructor: 'Daniel David Shalibo',
    location: { building: 'Adidas Head Office', room: '3rd floor, room 301' },
    time: '15:00',
    date: '2019-07-30T15:00:00.000Z',
    totalSpots: 40,
    takenSpots: 27,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: strength,
    thumbnail: strength_tn,
    id: '3',
  },
  {
    title: 'WELLNESS',
    instructor: 'Shiran Harel',
    location: { building: 'Adidas Head Office', room: '6th floor, room 605' },
    time: '17:00',
    date: '2019-07-31T17:00:00.000Z',
    totalSpots: 20,
    takenSpots: 18,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: wellness,
    thumbnail: wellness_tn,
    id: '4',
  },
  {
    title: 'YOGA',
    instructor: 'Daniel David Shalibo',
    location: { building: 'Adidas Head Office', room: '3rd floor, room 301' },
    time: '07:00',
    date: '2019-08-01T07:00:00.000Z',
    totalSpots: 20,
    takenSpots: 17,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: yoga,
    thumbnail: yoga_tn,
    id: '1',
  },
  {
    title: 'PILATES',
    instructor: 'Shiran Harel',
    location: { building: 'Adidas Head Office', room: 'Rooftop' },
    time: '19:00',
    date: '2019-05-29T19:00:00.000Z',
    totalSpots: 20,
    takenSpots: 10,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: pilates,
    thumbnail: pilates_tn,
    id: '2',
  },
  {
    title: 'STRENGTH',
    instructor: 'Daniel David Shalibo',
    location: { building: 'Adidas Head Office', room: '3rd floor, room 301' },
    time: '15:00',
    date: '2019-08-03T15:00:00.000Z',
    totalSpots: 40,
    takenSpots: 27,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: strength,
    thumbnail: strength_tn,
    id: '3',
  },
  {
    title: 'WELLNESS',
    instructor: 'Shiran Harel',
    location: { building: 'Adidas Head Office', room: '6th floor, room 605' },
    time: '17:00',
    date: '2019-08-07T17:00:00.000Z',
    totalSpots: 20,
    takenSpots: 18,
    description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
    image: wellness,
    thumbnail: wellness_tn,
    id: '4',
  },

];

const promotions = [
  {
    title: 'Adidas Ultra',
    subtitle: 'A Quality Yoga Outfit',
    price: 75.00,
    tag: 'NEW OFFER',
    image: offer1,
    thumbnail: offer1_tn,
    id: '1',
  },
  {
    title: 'Earth Juice',
    subtitle: 'Free Bottle',
    price: 10.00,
    tag: 'HOT OFFER',
    image: offer2,
    thumbnail: offer2_tn,
    id: '2',
  }, {
    title: 'Lulu Lemon Yoga Mat',
    subtitle: 'At 20% Off',
    price: 32.50,
    tag: 'ALMOST FINISHED',
    image: offer3,
    thumbnail: offer3_tn,
    id: '3',
  },
  {
    title: 'Nike HIT',
    subtitle: 'Pro Running Shoes',
    price: 120.00,
    tag: 'HOT OFFER',
    image: offer4,
    thumbnail: offer4_tn,
    id: '4',
  },

];

export const company1 = {
  name: 'Adidas', users, events, promotions, image: 'https://cdn2.bigcommerce.com/server1500/ac84d/products/1204/images/2688/Adidas_Logo_Flower__83153.1337144903.380.380.jpg?c=2',
};
