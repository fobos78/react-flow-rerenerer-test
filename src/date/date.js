// const date = [
//     {
//         id:1,
//         name:'one'
//     },
//     {
//         id:2,
//         name:'two'
//     },
// ];

async function getUsers(){
const respons = await fetch('https://jsonplaceholder.typicode.com/users');
return respons.json();
// console.log('date1', date);
// return date;
}
// getUsers();
// console.log('date2', date);

export {getUsers};