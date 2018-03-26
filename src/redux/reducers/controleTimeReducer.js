import {MODIFICA_TIME} from '../actions/types';

const INITIAL_STATE = {
  
  esquemaId:null,
  capitao:null,
  atletas:[],
  
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
      
      default:
        return state;
    }
  };
  