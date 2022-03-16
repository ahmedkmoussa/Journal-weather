/* Global Variables */

// inpute element zipe code 
const userZipCode = document.getElementById("zipcode");

// console.log(userZipCode.value)

// generate button
const butGen = document.getElementById("generate");
// console.log(butGen)

// user feelings 
const commetFeel = document.getElementById("feelings");
// console.log(commetFeel.value)
const htmlDate = document.getElementById("date")
const htmlTemp = document.getElementById("temp")
const htmlCommet = document.getElementById("content")
const apiKey = "9316a0a00ab04347b970d351094ade50";



// functions
// *************************************
function run (){
  htmlDate.innerHTML = "";
  htmlTemp.innerHTML = "";
  htmlCommet.innerHTML = "";
  htmlTemp.style.color = ""
  if ( Array.from(String(userZipCode.value)).length == 5 && commetFeel.value ){

    userWeatherdemand ()
  }else { 
          if ( Array.from(String(userZipCode.value)).length != 5 && ! commetFeel.value )  {
          htmlTemp.innerHTML = "please check all."} else { if (commetFeel.value) {htmlTemp.innerHTML = "please check your zipe code." } 
          else { htmlTemp.innerHTML = "please check  your feeling."
        }

      htmlTemp.style.color = "red"
    


  }
   
    htmlTemp.style.color = "red"
  }
}

// get zip code from user , immediately date and user comment 
async function userWeatherdemand () {


  
    // date 
    // Create a new date instance dynamically
    let day = new Date();
    // format date 
    const formatDate = `${day.getDate()} ${Intl.DateTimeFormat('en-US', { month: 'long'}).format(day)} ${day.getFullYear()}. ` ;
    //  console.log(formatDate)

    // api url 
    // console.log(userZipCode.value);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${userZipCode.value}&units=metric&appid=${apiKey}`
    // console.log(apiUrl);
    

    //  fetch
    const apiDemand = await fetch(apiUrl);

    // api data
    const apiAllData = await apiDemand.json();
    // console.log(apiAllData);
    if (apiAllData.cod != 200 ) {
      // console.log(apiAllData.message)
      htmlDate.innerHTML = formatDate;
      htmlTemp.innerHTML = apiAllData.message;
      htmlCommet.innerHTML = commetFeel.value
      htmlTemp.style.color = ""



    }else{
      apiTempData = apiAllData.main.temp;
    //handel data to post it in one object
    const userData = {temp : apiTempData , date : formatDate , commet : commetFeel.value  }
    // console.log(userData);
    
        // console.log(userData)
            await fetch ("http://localhost:8000/postuser" , {
              method: 'POST', 
              credentials: 'same-origin',
              headers: {'Content-Type': 'application/json'},
             // Body data type must match "Content-Type" header        
              body: JSON.stringify(userData) ,
            })
            // try {
              await updateUI()
              // console.log("done from udateui")

            // }catch (error) {
            //   console.log("error from udateui")

            // }
            


    }

   
  };

  const updateUI = async () => {
    const getFromServer = await fetch("http://localhost:8000/fromserver");
    // console.log(res);
    const serverData = await getFromServer.json();
    htmlDate.innerHTML = serverData.date;
    htmlTemp.innerHTML = `${serverData.temp}&deg;C`;
    htmlCommet.innerHTML = serverData.commet;
  
  };
  

// event when user click on generat 
butGen.addEventListener("click" ,  run ) ;
