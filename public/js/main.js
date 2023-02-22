let firstBottle = 0;
let lastBottle = 0;



document.getElementById('prevButton').addEventListener('click', () => {

    firstBottle += 21;
    lastBottle += 21;
    console.log(firstBottle)
  
  }) ;


export  {firstBottle, lastBottle};