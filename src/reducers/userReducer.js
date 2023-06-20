export const userReducer =(state=[], action)=>{
    switch (action.type) {
        case 'AddUser':
            
            return [
                ...state,
                {
                    ...action.payload,
                    id: new Date().getTime()
                }
            ];
    
        default:
            return state;
    }
}