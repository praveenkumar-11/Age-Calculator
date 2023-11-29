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

    for(let i=0 ; i<inputs.length ; i++){ 
        if(inputs[i].value == ""){
            //labels[i].style.color= "#ff5757";
            inputs[i].classList.add("error");
            labels[i].classList.add("error");
            errors[i].innerHTML= "This field is required";
            /*inputs[i].style.border= '1px solid hsl(0, 100%, 67%)'; */
            console.log(this_date+","+ this_month+","+this_year);

        }

        if(this_year < year){
            errors[2].innerHTML= "Must be in the past";
            inputs[i].classList.add("error");
            labels[i].classList.add("error");
        }

        if(this_year == year && this_month < month){
            errors[1].innerHTML= "Must be in the past";
            inputs[i].classList.add("error");
            labels[i].classList.add("error");
        }

        else{
            inputs[i].classList.remove("error");
            labels[i].classList.remove("error");
            errors[i].innerHTML= "";
        }
    }
})