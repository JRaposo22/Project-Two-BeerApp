//Function to filter the wines by type

function filterWines (wineType, winesList) {
    let filteredWines;
    switch (wineType) {
        case 'Red':
            filteredWines = winesList.filter(wine => wine.type == 'Red');
          break;
        case 'White':
            filteredWines = winesList.filter(wine => wine.type == 'White');
          break;
  
          case 'Rose':
            filteredWines = winesList.filter(wine => wine.type == 'Rose');
          break;
  
        case 'Sparkling':
            filteredWines = winesList.filter(wine => wine.type == 'Sparkling');
          break;
  
        case 'Dessert':
            filteredWines = winesList.filter(wine => wine.type == 'Dessert');
          break;
  
        case 'Port':
            filteredWines = winesList.filter(wine => wine.type == 'Port');
          break;
  
      };

      return filteredWines;
};

module.exports = filterWines;