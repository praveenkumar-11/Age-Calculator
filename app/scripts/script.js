const btn= document.querySelector("button");

const today= new Date();
const this_date= today.getDate();
const this_month= (today.getMonth()) + 1;
const this_year= today.getFullYear();
btn.addEventListener("click", () => {
    const day= document.querySelector(".Day").value;
    const month= document.querySelector(".Month").value;
    const year= document.querySelector(".Year").value;
    const inputs= document.querySelectorAll("input");
    const errors= document.querySelectorAll("p.error");
    const labels= document.querySelectorAll("label");

    let isValid= true;
    
    const user_date= new Date(year, month -1 , day);
    console.log(user_date.getDate());

    for(let i=0 ; i<inputs.length ; i++){ 
        
        //Removing error states
        inputs[i].classList.remove("error");
        labels[i].classList.remove("error");
        errors[i].innerHTML= "";

        if(inputs[i].value == ""){
            //labels[i].style.color= "#ff5757";
            inputs[i].classList.add("error");
            labels[i].classList.add("error");
            errors[i].innerHTML= "This field is required";
            isValid= false;
            /*inputs[i].style.border= '1px solid hsl(0, 100%, 67%)'; */
            console.log(this_date+","+ this_month+","+this_year);

        }
        /* else{
            inputs[i].classList.remove("error");
            labels[i].classList.remove("error");
            errors[i].innerHTML= "";
        } */
    }

    if(this_year < year){
        errors[2].innerHTML= "Must be in the past";
        inputs[2].classList.add("error");
        labels[2].classList.add("error");
        isValid= false;
    }

    if(this_year == year && this_month < month){
        errors[1].innerHTML= "Must be in the past";
        inputs[1].classList.add("error");
        labels[1].classList.add("error");
        isValid= false;
    }

    if(this_year == year && this_month == month && this_date < day){
        errors[0].innerHTML= "Must be in the past";
        inputs[0].classList.add("error");
        labels[0].classList.add("error");
        isValid= false;
    }

    if(day != "" && day != user_date.getDate()){
        errors[0].innerHTML= "Must be a valid date";
        inputs[0].classList.add("error");
        labels[0].classList.add("error");
        isValid= false;
    }

    if((month != "") && (month > 12 || month < 1)){
        errors[1].innerHTML= "Must be a valid month";
        inputs[1].classList.add("error");
        labels[1].classList.add("error");
        isValid= false;
    }

    if(isValid){
        calc_diff(user_date)
    }
})

function calc_diff(user_date){

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
            /* if(prev_month <= 6 && prev_month % 2 == 0){
                diff_days= ((31 - user_date.getDate()) + today.getDate()) + 1;
            }
            else{
                diff_days= ((30 - user_date.getDate()) + today.getDate()) + 1;
            }
            
            if(prev_month > 6 && prev_month % 2 != 0){
                diff_days= ((31 - user_date.getDate()) + today.getDate()) + 1;
            }
            else{
                diff_days= ((30 - user_date.getDate()) + today.getDate()) + 1;
            } */
        }

        //If birth date is lesser than today date (Birthday is not finished)
        /* if(today.getDate() > user_date.getDate()){
            diff_months= 11;
            diff_years= diff_years - 1;
            diff_days= (find_Total_Days_In_The_Month(today.getMonth() - 1)) - 1;
        } */
    }

    if(today.getMonth() > user_date.getMonth()){
        if(today.getDate() < user_date.getDate()){
            diff_months= diff_months - 1;
            diff_days= find_Total_Days_In_The_Month(today.getMonth() - 1);
        }
    }
    console.log("Pre : "+diff_days);



    /* result[0].innerHTML= diff_years;
    result[1].innerHTML= diff_months;
    result[2].innerHTML= diff_days; */
    let y= 0;
    let m= 0;
    let d= 0;
    let speed= 100;

    console.log("Speed: "+diff_days);

    const timerFn= () => {
        speed /= 10;
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
    //setTimeout(() => {clearInterval(timer);console.log("Cleared")}, 3000)
    //console.log("Diff: "+diff_days);

}



