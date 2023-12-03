//Function to calculate the age.
export default function calc_diff(today, user_date){

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
    let speed= 20;


    const timerFn= () => {

        //Reducing the speed by 0.1 everytime this function executes.
        speed= speed - 0.1;
        
        //Clearing the Interval if the variables d,m and y exceeds its corresponding limits(diff_days,diff_months,diff_years)
        if(y > diff_years && m > diff_months && d > diff_days){
            console.log("true")
            clearInterval(timer);
            return ; 
        }

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

    }
    
    const timer= setInterval(timerFn, speed);
}