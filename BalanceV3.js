// form Reference
const selectedSigns = document.querySelector('#selection__sign');
const inputDescription = document.querySelector('#input__description-value');
const inputNumber = document.querySelector('#input__number-value');
const checkButtn = document.querySelector('.fa-check-circle');

// List Reference
const ulIncomeList = document.querySelector('.income__list ul');
const ulExpList = document.querySelector('.expenses__list ul');
let percentageAloneSpan;

// Header Reference
const incomeNumber = document.querySelector('.income__number');
const expensesNumber = document.querySelector('.expenses__number');
const balanceNumber = document.querySelector('.balance__number');
const expensesPercentage = document.querySelector('.expenses__percentage');
const dateText = document.querySelector('.date__text');


// Variables
let arrayObjIncome = [],
    arrayObjExp = [],
    sumIncome = 0,
    sumExp = 0,
    sumTotal = 0,
    counterInc = 0,
    counterExp = 0,
    calcPercentage, calcPercentageAlone;

//--------------------------------------------------------------------

// Function that put data Inside array of object
const putDataInObj = (arrayOfObject) => {
    arrayOfObject.push({
        description: inputDescription.value,
        value: Number(inputNumber.value),
        id: Number(counterInc)
    });
    return arrayOfObject
};

//--------------------------------------------------------------------

// Funcions that create li, div and span template (one for Income list, one for Exp list)

const liAndSpanIncomeTemp = (arrayObjIncome) => {
    ulIncomeList.innerHTML = "";
    arrayObjIncome.forEach((object) => {
        let liAndSpanTempInc = `<li id = '${object.id}'> <span>${object.description.trim()}</span> <div class = 'inner__div'> <span class = 'inputNumberSpanGreen'>+ ${object.value}</span> <span class = 'circle-green'><i class="far fa-times-circle circle-green-green"></i></span> </div> </li>`;
        ulIncomeList.innerHTML += liAndSpanTempInc
    });
};

const liAndSpanExpTemp = (arrayObjExp) => {
    ulExpList.innerHTML = "";
    arrayObjExp.forEach((object) => {
        let liAndSpanTempExp = `<li id = '${object.id}'> <span>${object.description.trim()}</span> <div class = 'inner__div'> <span class = 'inputNumberSpan'>- ${object.value}</span> <span class = 'percentageAlone'>%</span> <span class = 'circle-red'><i class="far fa-times-circle circle-red-red"></i></span> </div> </li>`;
        ulExpList.innerHTML += liAndSpanTempExp
    });
};

//--------------------------------------------------------------------

// Function that Calculate sum
const calcSum = (arrayOfObject, sum) => {
    arrayOfObject.forEach(obj => {
        sum += obj.value;
    });
    return sum;
};

//--------------------------------------------------------------------

// Calculate Percentages (total expenses from total income)
const calcPercentages = () => {
    calcPercentage = calcSum(arrayObjExp, sumExp) / (calcSum(arrayObjIncome, sumIncome) / 100);
    calcPercentage = Math.round(calcPercentage);
    return calcPercentage;
}

//--------------------------------------------------------------------

// Calculate Percentages (single expenses from total income)
const calcPercentagelonley = (arrayOfObjects)=> {
    for (let i=0; i<arrayOfObjects.length; i++) {
        calcPercentageAlone = (arrayOfObjects[i].value / (calcSum(arrayObjIncome, sumIncome) / 100))
        arrayOfObjects[i].percentage = Math.round(calcPercentageAlone);
    }
    return arrayOfObjects;
}

//--------------------------------------------------------------------

// Adding

checkButtn.addEventListener('click', () => {
    counterInc++
    if (selectedSigns.value == '+' && inputDescription.value.length > 0 && inputNumber.value > 0) {
        // Put data in the array obj Inc
        putDataInObj(arrayObjIncome);

        // Show data in the DOM
        liAndSpanIncomeTemp(arrayObjIncome);

        // Calc sum Inc and Put in the DOM
        incomeNumber.innerHTML = `+ ${calcSum(arrayObjIncome, sumIncome)}`;

        // Calc percentage for each expenses from total Inc
        arrayObjExp = calcPercentagelonley(arrayObjExp);
        percentageAloneSpan = document.querySelectorAll('.percentageAlone');
        for (let i=0; i< percentageAloneSpan.length; i++) {
            if (isNaN(arrayObjExp[i].percentage) || arrayObjExp[i].percentage === Infinity) {
                percentageAloneSpan[i].innerHTML = ` % `
            } else {
                percentageAloneSpan[i].innerHTML = `${arrayObjExp[i].percentage} %`
            }    
        }

    } else if (selectedSigns.value == '-' && inputDescription.value.length > 0 && inputNumber.value > 0) {
        percentageAloneSpan = document.querySelectorAll('.percentageAlone');
        percentageAloneSpan = Array.from(percentageAloneSpan);
        // Put data in the array obj Exp
        putDataInObj(arrayObjExp);

        // Show data in the DOM
        liAndSpanExpTemp(arrayObjExp);

        // Calc sum Exp and Put in the DOM
        expensesNumber.innerHTML = `- ${calcSum(arrayObjExp, sumExp)}`;

        // Calc percentage for each expenses from total Inc
        arrayObjExp = calcPercentagelonley(arrayObjExp);
        percentageAloneSpan = document.querySelectorAll('.percentageAlone');
        for (let i=0; i< percentageAloneSpan.length; i++) {
            if (isNaN(arrayObjExp[i].percentage) || arrayObjExp[i].percentage === Infinity) {
                percentageAloneSpan[i].innerHTML = ` % `
            } else {
                percentageAloneSpan[i].innerHTML = `${arrayObjExp[i].percentage} %`
            }    
        }
    }

    // Calc total sum and Put in the DOM
    sumTotal = calcSum(arrayObjIncome, sumIncome) - calcSum(arrayObjExp, sumExp);
    sumTotal > 0 ? balanceNumber.innerHTML = `+ ${sumTotal}` : balanceNumber.innerHTML = sumTotal;

    // Calculate Percentages total Exp from Inc
    theCalcPercentage = calcPercentages();
    if (isNaN(theCalcPercentage) || theCalcPercentage === Infinity) {
        expensesPercentage.innerHTML = ` % `;
    } else {
        expensesPercentage.innerHTML = `${theCalcPercentage}%`
    }

});

//--------------------------------------------------------------------

// Removing

ulIncomeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle-green-green')) {
        e.target.parentElement.parentElement.parentElement.remove();
        let LiRemovedInc = e.target.parentElement.parentElement.parentElement.id;

        for (let i = 0; i < arrayObjIncome.length; i++) {
            if (arrayObjIncome[i].id === Number(LiRemovedInc)) {
                arrayObjIncome.splice(i, 1);
            }
        }

        // Calc sum Inc and Put in the DOM
        incomeNumber.innerHTML = `+ ${calcSum(arrayObjIncome, sumIncome)}`;

        // Calculate Percentages total Exp from Inc
        theCalcPercentage = calcPercentages();
        if (isNaN(theCalcPercentage) || theCalcPercentage === Infinity) {
            expensesPercentage.innerHTML = ` % `;
        } else {
            expensesPercentage.innerHTML = `${theCalcPercentage}%`
        }

        // Calc percentage for each expenses from total Inc
        arrayObjExp = calcPercentagelonley(arrayObjExp);
        percentageAloneSpan = document.querySelectorAll('.percentageAlone');
        for (let i=0; i< percentageAloneSpan.length; i++) {
            if (isNaN(arrayObjExp[i].percentage) || arrayObjExp[i].percentage === Infinity) {
                percentageAloneSpan[i].innerHTML = ` % `
            } else {
                percentageAloneSpan[i].innerHTML = `${arrayObjExp[i].percentage} %`
            }    
        }

         // Calc total sum and Put in the DOM
        sumTotal = calcSum(arrayObjIncome, sumIncome) - calcSum(arrayObjExp, sumExp);
        sumTotal > 0 ? balanceNumber.innerHTML = `+ ${sumTotal}` : balanceNumber.innerHTML = sumTotal;

    }
});

ulExpList.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle-red-red')) {
        e.target.parentElement.parentElement.parentElement.remove();
        let LiRemovedExp = e.target.parentElement.parentElement.parentElement.id;

        for (let i = 0; i < arrayObjExp.length; i++) {
            if (arrayObjExp[i].id === Number(LiRemovedExp)) {
                arrayObjExp.splice(i, 1);
            }
        }
        // Calc sum Exp and Put in the DOM
        expensesNumber.innerHTML = `- ${calcSum(arrayObjExp, sumExp)}`

        // Calculate Percentages total Exp from Inc
        theCalcPercentage = calcPercentages();
        if (isNaN(theCalcPercentage) || theCalcPercentage === Infinity) {
            expensesPercentage.innerHTML = ` % `;
        } else {
            expensesPercentage.innerHTML = `${theCalcPercentage}%`
        }

        // Calc total sum and Put in the DOM
        sumTotal = calcSum(arrayObjIncome, sumIncome) - calcSum(arrayObjExp, sumExp);
        sumTotal > 0 ? balanceNumber.innerHTML = `+ ${sumTotal}` : balanceNumber.innerHTML = sumTotal;
    }
});

//----------------------------------------------------------

// Time

let timeDate = new Date();
let year =  dateFns.format(timeDate, 'YYYY');
let month =  dateFns.format(timeDate, 'MMM');

dateText.innerHTML = `Available Budget in ${month} ${year} :`

//----------------------------------------------------------

// Toggle between red and green border

selectedSigns.addEventListener("click", () => {
    if (selectedSigns.value == "-") {
        checkButtn.classList.add("icon-red");

        //border color
        selectedSigns.classList.add('turnToRed');
        inputDescription.classList.add('turnToRed');
        inputNumber.classList.add('turnToRed');

    } else {
        checkButtn.classList.remove("icon-red");

        // //border color
        selectedSigns.classList.remove('turnToRed');
        selectedSigns.classList.add('turnToGreen');

        inputDescription.classList.remove('turnToRed');
        inputDescription.classList.add('turnToGreen');

        inputNumber.classList.remove('turnToRed');
        inputNumber.classList.add('turnToGreen');
    }
});