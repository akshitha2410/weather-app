const weatherform=document.querySelector(".weatherapp");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="d68c58f7dbaca17aa50e340dc5c1f8bc";
weatherform.addEventListener("submit", async event=>
{
event.preventDefault();
const city=cityinput.value.trim();
if(city){
try{
const weatherdata=await getweatherdata(city);
displayweatherdata(weatherdata);
}
catch(error)
{
    console.error(error);
    displayerror(error)
}
}
else
{
    displayerror("please enter  a city");
}
}
);
async function getweatherdata(city)
{
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response=await fetch(apiurl);
    console.log(response);
    if(!response.ok)
    {
        throw new Error("could not fetch data");
    }
return await response.json();
}
function displayweatherdata(data)
{
console.log(data);
const {name:city,
    main:{temp,humidity},
    weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const weatheremoji=document.createElement("p");

    citydisplay.textContent=city;
    tempdisplay.textContent = `${temp.toFixed(1)}°C`;

    humiditydisplay.textContent=`humidity:${humidity}%`;
    descdisplay.textContent=description;
    weatheremoji.textContent=getweatheremoji(id);

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humidity");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
}
function getweatheremoji(weatherid)
{
switch(true){
    case(weatherid>=200&&weatherid<300):
    return "⚡";
    case(weatherid>=300&&weatherid<400):
    return " 🌦️";

case(weatherid>=500&&weatherid<600):
    return "❄️";

case(weatherid>=600&&weatherid<700):
    return "🏔️";
    case(weatherid>=700&&weatherid<800):
    return "⛄";
case(weatherid===800):
    return "☀️";
    case(weatherid>=801&&weatherid<810):
    return "☁️";
default:
    return "?";


}

}
function displayerror(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);


}