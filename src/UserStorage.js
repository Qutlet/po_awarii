import { extendObservable } from 'mobx';

class UserStorage{
    isLoggedIn() {
        if (!UserStorage.token) {
            return false;
        }
        return true;
    }

    logout() {
        window.localStorage.removeItem('userdata');
        UserStorage.token = ""
    }

    login(token){
        UserStorage.token = token

        let userdata = {
            token: token
        }

        window.localStorage.setItem('userdata', JSON.stringify(userdata));
    }

    constructor() {
        let token = '';
        const userdata = window.localStorage.getItem('userdata');
        if (userdata !== null) {
            ({token} = JSON.parse(userdata));
        }

        UserStorage.token = token

        extendObservable(this, {
            token: token,
        })
    }
}
export default new UserStorage();