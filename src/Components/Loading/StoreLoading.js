import { decorate, observable, action } from "mobx"

import {getLocalToken} from '../AuthScreen/localStorageService'
import UserStore from "../AuthScreen/userStore"

class storeLoading{
    constructor(){
        getLocalToken().then(
            result => {
                UserStore.changeFlagAuth()
                UserStore.saveToken(result)
                this.finishLoading()
            }, reason => {
                this.finishLoading()
            })
    }

    isLoading = true

    finishLoading = () => {
        this.isLoading = false
    }
}
decorate(storeLoading, {
    isLoading : observable,
    finishLoading : action,
})

const StoreLoading = new storeLoading()
export default StoreLoading