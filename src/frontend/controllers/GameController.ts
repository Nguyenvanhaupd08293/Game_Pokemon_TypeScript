import autobind from 'autobind-decorator';
import _ from 'lodash';
import { GameItem } from '../models/GameItem';
import { GameItemStatus } from '../models/GameItem';
 export class GameController{
   private items: GameItem[] = [];
       constructor(items: GameItem[], public element: HTMLElement) {
           this.initGame(items);
       }
       initGame(initData: GameItem[]): void{
        for (const item of initData) { 
          this.items.push(item); 
          this.items.push(new GameItem(item.id, item.divId, item.image));
       }
       let id: number = 1; 
       this. items. forEach(it =>{ 
          it.status = GameItemStatus.Close;
           it.divId = 'd' + id; 
           id ++;
       });
     } 
       reinitGAme(): void {
        this.items.forEach(item=>{
          item.imageElement=null;
          item.status=GameItemStatus.Close;
          item.isMatched=false;
        });
        this.shuffle();
       }
       isWinGame() : boolean{
        return this.items.filter(item=>item.status === GameItemStatus.Open).length === this.items.length;
       }
       renderHTML(rootElement: HTMLElement, item: GameItem){

     const divItem : HTMLDivElement = document.createElement('div'); 
     divItem.className = `col-2 gameItem m-2 p1 text-center`; 
     divItem.id = item.divId;
      divItem. addEventListener('click', this.processGameItemClicked);
     const imgItem: HTMLImageElement = document.createElement('img'); 
     imgItem.src = `images/${item.image}`;

     imgItem.className = 'img-fluid invisible';
     item.imageElement = imgItem; 
      divItem.appendChild(imgItem);
     rootElement.appendChild(divItem);
       }
       renderResetButton(rootElement: HTMLElement): void {
        let button: HTMLButtonElement = rootElement.querySelector('button#reset') as HTMLButtonElement;
        if (button) {
            button.addEventListener('click', this.processResetButtonClicked);
        }
    }
    
       renderGameBoard(): void{
        this.shuffle();
        let boarDiv: HTMLElement=this.element.querySelector('#board')as HTMLElement;
        if(boarDiv){
          this.items.forEach(it=>
            this.renderHTML(boarDiv,it))
        }
        this.renderResetButton(this.element)
       }    
       isMatched(id: number, imgElement: HTMLImageElement): boolean{
        let openedItems: GameItem[]=this.items.filter(item=>{
          if(item.status===GameItemStatus.Open && !item.isMatched){
            return item;
          }
        });
        if(openedItems.length===2){
          let checkMatchedFilter=openedItems.filter(item=>item.id==id);
          if(checkMatchedFilter.length<2){
openedItems.forEach(item=>{
  this.changeMatchedBackground(item.imageElement,false);
            });
            setTimeout(()=>
            openedItems.forEach(item=>{
              if(item.imageElement){
                item.imageElement.className='img-fluid invisible';
                item.status=GameItemStatus.Close;
                item.isMatched=false;
                this.changeMatchedBackground(item.imageElement);
              }
            }), 600);
          }else{
            openedItems.forEach(item=>{
              item.isMatched=true;
              this.changeMatchedBackground(item.imageElement);
            });
            return true;
          }
        }
        return false;
      }
       changeMatchedBackground(imgElement: HTMLElement | null, isMatched: boolean = true) {
        if(imgElement?.parentElement){
          if(isMatched){
            imgElement.parentElement.className='col-2 gameItem m-1 p-1 text-center';
          }else{
            imgElement.parentElement.className='col-2 gameItem m-1 p-1 text-center unmatched';
            
          }
        }
       } 
       
       @autobind
        processGameItemClicked(event: Event) {
          let element: HTMLElement| null=event.target as HTMLElement;
          if(element.tagName ==='img'){
            element=element.parentElement;
          }
          for(const item of this.items){
            if(item.divId== element?.id&&!item.isMatched && item.status=== GameItemStatus.Close){
              item.status=GameItemStatus.Open;
              let imgElement=element.querySelector('img');
              if(imgElement){
                imgElement.className='img-fluid visible';
                this.isMatched(item.id,imgElement);
              }
            }
          }
       }
            @autobind 
            processResetButtonClicked(event: Event) : void{
              this.reinitGAme();
              const boardElement: HTMLElement= document.querySelector('#board') as HTMLElement;
              boardElement.innerHTML='';
              this.renderGameBoard();
            } 
            shuffle(){
              this.items=_.shuffle(this.items);
       }
      }
      
      