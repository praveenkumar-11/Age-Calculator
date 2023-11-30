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
    const diff_years= today.getFullYear() - user_date.getFullYear();
    const diff_months= today.getMonth() - user_date.getMonth();
    const diff_days= today.getDate() - user_date.getDate();

    const op= [diff_years, diff_months, diff_days];

    /* result[0].innerHTML= diff_years;
    result[1].innerHTML= diff_months;
    result[2].innerHTML= diff_days; */
    let y= 0;
    let m= 0;
    let d= 0;
    const timer= setInterval(() => {
        if(y <= diff_years){
            result[0].innerHTML= y;
            y++;
        }
        if(m <= diff_months){
            result[1].innerHTML= m;
            m++
        }
        if(d <= diff_days){
            result[2].innerHTML= d;
            d++
        }

    }, 50);
    //console.log("Diff: "+diff_days);

}