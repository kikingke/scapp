//Mock Data service
(function(){
  var mock = function(){
    
    var getStates = [
        {
          id: 1,
          name: 'Atlántico Norte'
        }, {
          id: 2,
          name: 'Atlántico Sur'
        }, {
          id: 3,
          name: 'Boaco'
        }, {
          id: 4,
          name: 'Carazo'
        }, {
          id: 5,
          name: 'Chinandega'
        }, {
          id: 6,
          name: 'Chontales'
        }, {
          id: 7,
          name: 'Estelí'
        }, {
          id: 8,
          name: 'Granada'
        }, {
          id: 9,
          name: 'Jinotega'
        }, {
          id: 10,
          name: 'León'
        }, {
          id: 11,
          name: 'Madriz'
        }, {
          id: 12,
          name: 'Managua'
        }, {
          id: 13,
          name: 'Masaya'
        }, {
          id: 14,
          name: 'Matagalpa'
        }, {
          id: 15,
          name: 'Nueva Segovia'
        }, {
          id: 16,
          name: 'Río San Juan'
        }, {
          id: 17,
          name: 'Rivas'
        }

    ];
  
    var getCities = [{
        id: 1,
        names: [ 
            "Puerto Cabezas",
            "Bonanza",
            "Mulukukú",
            "Prinzapolka",
            "Rosita",
            "Siuna",
            "Waslala",
            "Waspán"
        ]
      }, {
        id: 2,
        names: [ 
            "Bluefields",
            "Corn Island",
            "Desembocadura de Río Grande",
            "El Ayote",
            "El Tortuguero",
            "Kukrahill",
            "La Cruz de Río Grande",
            "Laguna de Perlas",
            "Muelle de los Bueyes",
            "Nueva Guinea",
            "Paiwas",
            "El Rama"
        ]
      }, {
        id: 3,
        names: [ 
            "Boaco",
            "Camoapa",
            "San Lorenzo",
            "San José de Los Remates",
            "Santa Lucía",
            "Teustepe"
        ]
      }, {
        id: 4,
        names: [ 
            "Dolores",
            "Diriamba",
            "El Rosario",
            "Jinotepe",
            "La Conquista",
            "La Paz de Carazo",
            "San Marcos",
            "Santa Teresa"
        ]
      }, {
        id: 5,
        names: [
            "Chinandega",
            "Chichigalpa",
            "Cinco Pinos",
            "Corinto",
            "El Realejo",
            "El Viejo",
            "Posoltega",
            "San Francisco del Norte",
            "San Pedro del Norte",
            "Santo Tomás del Norte",
            "Somotillo",
            "Puerto Morazán",
            "Villanueva"
        ]
      }, {
        id: 6,
        names: [
            "Comalapa",
            "Acoyapa",
            "Cuapa",
            "El Coral",
            "Juigalpa",
            "La Libertad",
            "San Pedro de Lóvago",
            "Santo Domingo",
            "Santo Tomás",
            "Villa Sandino"
        ]
      }, {
        id: 7,
        names: [
            "Estelí",
            "Condega",
            "La Trinidad",
            "Pueblo Nuevo",
            "San Juan de Limay",
            "San Nicolás"
        ]
      }, {
        id: 8,
        names: [ 
            "Diriomo",
            "Diriá",
            "Granada",
            "Nandaime"
        ]
      }, {
        id: 9,
        names: [ 
            "Jinotega",
            "El Cuá",
            "La Concordia",
            "San José de Bocay",
            "San Rafael del Norte",
            "San Sebastián de Yalí",
            "Santa María de Pantasma",
            "Wiwilí"
        ]
      }, {
        id: 10,
        names: [ 
            "El Jicaral",
            "Achuapa",
            "El Sauce",
            "La Paz Centro",
            "Larreynaga",
            "León",
            "Nagarote",
            "Quezalguaque",
            "Santa Rosa del Peñón",
            "Telica"
        ]
      }, {
        id: 11,
        names: [  
            "Palacagüina",
            "Las Sabanas",
            "San José de Cusmapa",
            "San Juan de Río Coco",
            "San Lucas",
            "Somoto",
            "Telpaneca",
            "Totogalpa",
            "Yalagüina"
        ]
      }, {
        id: 12,
        names: [ 
            "El Crucero",
            "Ciudad Sandino",
            "Managua",
            "Mateare",
            "San Francisco Libre",
            "San Rafael del Sur",
            "Ticuantepe",
            "Tipitapa",
            "Villa El Carmen"
        ]
      }, {
        id: 13,
        names: [ 
            "La Concepción",
            "Catarina",
            "Masatepe",
            "Masaya",
            "Nandasmo",
            "Nindirí",
            "Niquinohomo",
            "San Juan de Oriente",
            "Tisma"
            ]
      }, {
        id: 14,
        names: [
            "El Tuma - La Dalia",
            "Ciudad Darío",
            "Esquipulas",
            "Matagalpa",
            "Matiguás",
            "Muy Muy",
            "Rancho Grande",
            "Río Blanco",
            "San Dionisio",
            "San Isidro",
            "San Ramón",
            "Sébaco",
            "Terrabona"
         ]
      }, {
        id: 15,
        names: [
            "Dipilto",
            "Ciudad Antigua",
            "El Jícaro",
            "Wiwilí",
            "Jalapa",
            "Macuelizo",
            "Mozonte",
            "Murra",
            "Ocotal",
            "Quilalí",
            "San Fernando",
            "Santa María"
        ]
      }, {
        id: 16,
        names: [   
            "El Castillo",
            "El Almendro",
            "Morrito",
            "San Carlos",
            "San Juan del Norte",
            "San Miguelito"
        ]
      }, {
        id: 17,
        names:[
              "Belén",
              "Buenos Aires",
              "Altagracia",
              "Cárdenas",
              "Moyogalpa",
              "Potosí",
              "Rivas",
              "San Jorge",
              "San Juan del Sur",
              "Tola"
            ]
      }

    ];
  
  //Public Api
      return{
        
        getStates:getStates,
        getCities:getCities
        
        };
  };
  
  var module = angular.module('myapp'); //get reference to module
   module.factory('mock', mock); //create mock service
  
}());