var inputName = document.querySelector(".inputName")
	var inputSername = document.querySelector(".inputSername")
	var inputOtch = document.querySelector(".inputOtch")
	var inputEmail = document.querySelector(".inputEmail")
	var inputNumber = document.querySelector(".inputNumber")
var changeData = document.querySelector(".changeData")
	var changeDataInputName = document.querySelector(".changeDataInputName")
	var changeDataInputSername = document.querySelector(".changeDataInputSername")
	var changeDataInputOtch = document.querySelector(".changeDataInputOtch")
	var changeDataInputEmail = document.querySelector(".changeDataInputEmail")
	var changeDataInputNumber = document.querySelector(".changeDataInputNumber")
	var changeDataButton = document.querySelector(".changeDataButton")
var add = document.querySelector(".add")
var FioAddLi = document.querySelector('.FioAddLi')

var FioArray = [];
add.addEventListener('click', addData)



function changeDatas(e){

	e.target.previousSibling.innerHTML = '';
			for(i=0;i<FioArray.length;i++){
				if (FioArray[i].id == e.target.previousSibling.id){
					changeDataInputName.value = FioArray[i].name
					changeDataInputSername.value = FioArray[i].sername
					changeDataInputOtch.value = FioArray[i].otch
					changeDataInputEmail.value = FioArray[i].email
					changeDataInputNumber.value = FioArray[i].number
				}}

	changeData.style.display = 'block';
	FioAddLi.style.display = 'none';

	changeDataButton.addEventListener('click', saveData)

	function saveData(){
		var FioDataObj = {
			name : changeDataInputName.value,
			sername : changeDataInputSername.value,
			otch : changeDataInputOtch.value,
			email : changeDataInputEmail.value,
			number : changeDataInputNumber.value,
			id : e.target.previousSibling.id}

		e.target.previousSibling.innerHTML = FioDataObj.name
			+ " " + FioDataObj.sername + " "	+ FioDataObj.otch
			+ " " + FioDataObj.email + " " + FioDataObj.number

		for(i=0;i<FioArray.length;i++){
			if (+e.target.previousSibling.id == +FioArray[i].id) {
				FioArray[i].name = FioDataObj.name;
				FioArray[i].sername = FioDataObj.sername;
				FioArray[i].otch = FioDataObj.otch;
				FioArray[i].email = FioDataObj.email;
				FioArray[i].number = FioDataObj.number;
			}}

		localStorage.setItem(FioDataObj.id, JSON.stringify(FioDataObj))

		changeDataInputName.value = "";
			changeDataInputSername.value = "";
			changeDataInputOtch.value = "";
			changeDataInputEmail.value = "";
			changeDataInputNumber.value = "";

	   changeData.style.display = 'none';
	   FioAddLi.style.display = 'block';

		changeDataButton.removeEventListener('click', saveData)
		}
	}


function addData() {
	if (inputName.value.length > 0 && inputSername.value.length > 0 &&
		inputOtch.value.length > 0 &&	inputEmail.value.length > 0 &&
		inputNumber.value.length > 0)
	{
		var FioDataObj = {
			name : inputName.value,
			sername : inputSername.value,
			otch : inputOtch.value,
			email : inputEmail.value,
			number : inputNumber.value,
			id : Date.now(),
		}

		FioArray.push(FioDataObj)
		localStorage.setItem(FioDataObj.id, JSON.stringify(FioDataObj))

		var newLi = document.createElement('li')
		var newBut = document.createElement('button')
			newBut.innerHTML = 'Change';

		FioAddLi.appendChild(newLi)
		FioAddLi.appendChild(newBut)

		newLi.innerHTML = FioDataObj.name + " " + FioDataObj.sername + " "
			+ FioDataObj.otch + " " + FioDataObj.email + " " + FioDataObj.number
		newLi.id = FioDataObj.id;

		inputName.value = "";
		inputSername.value = "";
		inputOtch.value = "";
		inputEmail.value = "";
		inputNumber.value = "";
		newLi.addEventListener('click', removeData)
		newBut.addEventListener('click', changeDatas)

		}
	}


function timer(){
	for(var k = 0; k < localStorage.length; k++){
		var object =  localStorage.getItem(localStorage.key(k));
		FioArray[k] = JSON.parse(object);
		var newLi = document.createElement('li')
		newLi.innerHTML = FioArray[k].name + " " + FioArray[k].sername + " "
			+ FioArray[k].otch + " " + FioArray[k].email + " " + FioArray[k].number
		newLi.id = FioArray[k].id;
		FioAddLi.appendChild(newLi)

		var newBut = document.createElement('button')
			newBut.innerHTML = 'Change';
		FioAddLi.appendChild(newBut)

		newLi.addEventListener('click', removeData)
		newBut.addEventListener('click', changeDatas)
		}
	}
setTimeout(timer, 10)

function removeData(e){
	localStorage.removeItem(e.target.id)
	FioAddLi.removeChild(e.target.nextSibling)
	FioAddLi.removeChild(e.target)}