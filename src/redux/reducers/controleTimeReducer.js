import {MODIFICA_TIME, TROCA_CAPITAO} from '../actions/types';

const INITIAL_STATE = {
  
  esquemaId:null,
  capitao:null,
  atletas:[],
  timeSalvo:true
  
  };
  
  // ====================================
  export default (state = INITIAL_STATE, action) => {
   
    switch (action.type) {
      case MODIFICA_TIME:
        return { ...state,
                  esquemaId:action.esquemaId,
                  capitao:action.capitao, 
                  atletas: [...state.atletas, action.atletaId]
                };
        
      case TROCA_CAPITAO:
      return { ...state,
                capitao:action.capitao,
                timeSalvo:false
              };
      
      default:
        return state;
    }
  };
  