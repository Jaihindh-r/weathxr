const express = require("express");
const https=require("https");

const app =express();
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(express.static('static'));

app.get('/',function(req,res){

  res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
   const Place=req.body.Place
   const url ="https://api.openweathermap.org/data/2.5/weather?q="+Place+"&appid=ef631ffac133416248d4546ae96ffb79&units=metric";
    try{
        https.get(url,function(response){
            if(response.statusCode==200){
                response.on("data",(x)=>{
                    const weatherData= JSON.parse(x);
                    const temp = weatherData.main.temp
                    const imageUrl=`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
                    const desc= weatherData.weather[0].description
                    res.json(
                            {
                                "place": Place,
                                "temp": temp,
                                "image":imageUrl,
                                "desc":desc
        
                            }
                        )
                })
            
            }
            else{
                res.status(404).json({"scode":404,"reason":"Place Not Found"})
            }
        })

           
    }catch(er){
        console.log(er)
    }
    

})





app.listen( process.env.PORT||300,(req,res)=>{
    console.log("i am Started");
})