import React from "react";

function MainContent() {
  const firstName = "Gnój głupi"
  const secondName = "Ćwok jakich mało"
  
  const date = new Date()
  const hours = date.getHours()
  let timeOfDay

  if (hours < 12) {
    timeOfDay = "morning"
  } else if (12 <= hours ) {
    timeOfDay = "afternoon"
  } else {
    timeOfDay = "night"
  }

  return (
  <main className="MainContent">
    <p1> Witaj osobo: {firstName + "|" + secondName} </p1> <br/>
    <p2 style={{color:"00FFFF"}}> Good {timeOfDay} my lovley amigo </p2> 

    <div>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
      <label for="vehicle1"> I have a bike</label><br/>
      <input type="checkbox" id="vehicle2" name="vehicle2" value="Rollerblades"/>
      <label for="vehicle1"> I have a rollerblades</label><br/>
      <input type="checkbox" id="vehicle3" name="vehicle3" value="Scooter"/>
      <label for="vehicle1"> I have a scooter</label> <br/>
    </div>  
  </main>
  ) 
}

export default MainContent
