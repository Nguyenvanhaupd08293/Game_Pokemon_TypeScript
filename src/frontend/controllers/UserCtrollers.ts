import autobind from "autobind-decorator";
import { validate } from "class-validator";
import { User } from '../models/user';

export class UserController{ 
       constructor(public element: HTMLElement) { 
              const button = element.querySelector('#play');
console. log('UserController constructor');
button ?.addEventListener('click', this.processPlayButtonClick);
}
@autobind
 processPlayButtonClick(event: Event){
        event. preventDefault(); 
console. log('event .... ');
const form = this.element. querySelector('form') as HTMLFormElement; 
const usernameElement = this.element.querySelector('#username') as HTMLInputElement; 
const helpId = this.element.querySelector('#UsernameHelpId')
if(usernameElement){
       let user: User = new User(usernameElement.value);
       validate(user).then(errors=>{
              if(errors.length>0){
                     if(helpId){
                            helpId.className ='form-text text-muted visible'
                     }
              }else{
                     form.submit();
              }
       })
}
}
}
