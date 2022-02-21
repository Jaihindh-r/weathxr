var place = document.querySelector("input");
var button = document.querySelector("button");
var  div1=document.querySelector('div[class="top"]');

button.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(place.value);
    var data={Place: place.value};

    fetch('/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify(data) ,
      })
      .then(response=> {
        if(response.status==200){
          return response.json()
        }
        else{
          throw new Error("Oh Shit! Not Good!")
        }
        
      })
      .then(res=>{
        
        removeXtraDiv()
         
          var result=document.createElement('div')

          result.classList.add('after')
          var we=document.createElement('h4')
          we.innerText="Weather in"
          var temp=document.createElement('h1')
          temp.innerText=res.temp+"°C"
          var img=document.createElement('img')
          img.src=res.image
          var desc=document.createElement('h3')
          desc.innerText=res.desc.toUpperCase()
          var Place=document.createElement('h2')
          Place.innerText=res.place.toUpperCase()

          
          result.append(we)
          result.append(Place)
          result.append(img)
          result.append(temp)
          
          result.append(desc)
        

          div1.append(result)

          
          div1.classList.add('result')
        

      })
      .catch(er=>{
        console.log(er)
      removeXtraDiv();
        var r4=document.createElement('div')
        r4.classList.add("khaby")
          div1.classList.add("result")
          var i4=document.createElement('img')
          i4.src="404.png"
          var t4=document.createElement('h1')
          t4.innerText="Place Not Found !"
          r4.append(i4)
          r4.append(t4)
          div1.append(r4)
       }
      )

})

function removeXtraDiv(){
  if(div1.childElementCount>2){
    div1.removeChild(div1.lastChild)
  }
 
}