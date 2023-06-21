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
        
        case 'RemoveUser':
            return state.filter(user => user.id !== action.payload);
    
        default:
            return state;
    }
}