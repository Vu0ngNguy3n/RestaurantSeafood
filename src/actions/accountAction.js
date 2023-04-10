export const loginAccount = (account) => {
  return {
    type: "LOGIN",
    payload: account,
  };
};

export const logout = () =>{
    return{
        type: 'LOGOUT'
    }
}
