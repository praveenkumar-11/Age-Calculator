import calc_diff from "./calc.js";

const btn= document.querySelector("button");

//Creating date method and getting date,month,year.
const today= new Date();
const this_date= today.getDate();
const this_month= (today.getMonth()) + 1;
const this_year= today.getFullYear();

//Listening to an event when the button is clicked
btn.addEventListener("click", () => {

    //Getting elements to manipulate with DOM
    const day= document.querySelector(".Day").value;
    const month= document.querySelector(".Month").value;
    const year= document.querySelector(".Year").value;
    const inputs= document.querySelectorAll("input");
    const errors= document.querySelectorAll("p.error");
    const labels= document.querySelectorAll("label");

    const wish= document.querySelector(".wishing-msg")

    //Setting isValid to find whether there is error or not. 
    let isValid= true;
    
    //Creating another date method and setting user given date,month and year to it.  
    const user_date= new Date(year, month -1 , day);

    if(user_date.getDate() == today.getDate() && user_date.getMonth() == today.getMonth()){
        wish.style.display= "flex";
    }
    else{
        wish.style.display= "none";
    }

    for(let i=0 ; i<inputs.length ; i++){ 
        
        //Removing error states
        inputs[i].classList.remove("error");
        labels[i].classList.remove("error");
        errors[i].innerHTML= "";

        //Finding if there is any empty input fields.If present displaying an error.
        if(inputs[i].value == ""){
            inputs[i].classList.add("error");
            labels[i].classList.add("error");
            errors[i].innerHTML= "This field is required";
            isValid= false;

        }
    }

    //If the user gives coming years (future), displaying an error.
    if(this_year < year){
        errors[2].innerHTML= "Must be in the past";
        inputs[2].classList.add("error");
        labels[2].classList.add("error");
        isValid= false;
    }

    //If the user gives coming month (future), displaying an error.
    if(this_year == year && this_month < month){
        errors[1].innerHTML= "Must be in the past";
        inputs[1].classList.add("error");
        labels[1].classList.add("error");
        isValid= false;
    }

    //If the user gives coming days (future), displaying an error;
    if(this_year == year && this_month == month && this_date < day){
        errors[0].innerHTML= "Must be in the past";
        inputs[0].classList.add("error");
        labels[0].classList.add("error");
        isValid= false;
    }

    //If the user gives invalid dates ex.34
    if(day != "" && day != user_date.getDate()){
        errors[0].innerHTML= "Must be a valid date";
        inputs[0].classList.add("error");
        labels[0].classList.add("error");
        isValid= false;
    }

    //If the user gives invalid month ex.14
    if((month != "") && (month > 12 || month < 1)){
        errors[1].innerHTML= "Must be a valid month";
        inputs[1].classList.add("error");
        labels[1].classList.add("error");
        isValid= false;
    }

    //If isValid is true then calling the calc_date function which has the code to calculate the age.
    if(isValid){
        calc_diff(today, user_date);
    }
})

/* //Function to calculate the age.
function calc_diff(user_date){

    //Getting result div from html page to print the result.
    const result= document.querySelectorAll(".result span");

    let diff_years= today.getFullYear() - user_date.getFullYear();
    let diff_months= today.getMonth() - user_date.getMonth();
    let diff_days= today.getDate() - user_date.getDate(); 

    //Function to find total days in the given month
    function find_Total_Days_In_The_Month(prev_month){
        if(prev_month <= 6 && prev_month % 2 == 0){
            return ((31 - user_date.getDate()) + today.getDate());
        }
        else if(prev_month <= 6 && prev_month % 2 != 0){
            return ((30 - user_date.getDate()) + today.getDate());
        }
        else if(prev_month > 6 && prev_month % 2 != 0){
            return ((31 - user_date.getDate()) + today.getDate());
        }
        else if(prev_month > 6 && prev_month % 2 == 0){
            return ((30 - user_date.getDate()) + today.getDate());
        }
        else
            return -1;
    }


    if(today.getMonth() == user_date.getMonth()){

        //If birth date is higher than today date (Birthday finished)
        if(today.getDate() < user_date.getDate()){
            diff_months= 11;
            diff_years= diff_years - 1;
            const prev_month= today.getMonth() - 1;
            diff_days= find_Total_Days_In_The_Month(prev_month);
        }
    }

    if(today.getMonth() > user_date.getMonth()){
        if(today.getDate() < user_date.getDate()){
            diff_months= diff_months - 1;
            diff_days= find_Total_Days_In_The_Month(today.getMonth() - 1);
        }
    }

    //Declaring and initalizing some variables.It is going to animated to the final number from 0.
    let y= 0;
    let m= 0;
    let d= 0;
    let speed= 100;

    const timerFn= () => {

        //Dividing the speed by 10, so it will slow down when running
        speed /= 10;

        //Running from 0 to final number
        if(y <= diff_years){
            result[0].innerHTML= y;
            y++;
        }
        if(m <= diff_months){
            result[1].innerHTML= m;
            m++;
        }
        if(d <= diff_days){
            result[2].innerHTML= d;
            d++;
        }
        setTimeout(timerFn, speed);
    }

    const timer= setTimeout(timerFn, speed);
} */