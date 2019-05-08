let age = document.getElementById('age');
 
function showUser(surname, name) {
  alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

//showUser.apply(age, ['snow', 'john']);

showUser.call(age, 'snow', 'john');


// let double = showUser.bind(age);
// double('snow', 'john');