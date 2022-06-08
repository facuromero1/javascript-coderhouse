const Container = require("./contenedor");


(async () => {
    const containerTwo = new Container("/tps/project/objetos.txt")
    
    const newProduct = {
      title: 'Heladera',
      price: 8000,
      thumbnail: 'url',
      
    }
    const newProductOne = {
        title: 'Televisor',
        price: 450055,
        thumbnail: 'url',
        
      }

  
   
   
    
    console.log(await containerTwo.getById(5))
    console.log (await containerTwo.getAllItems())
    console.log(await containerTwo.getRandom())
    await containerTwo.deleteById()

    
    

})()

