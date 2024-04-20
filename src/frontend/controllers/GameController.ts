import autobind from 'autobind-decorator';
import _ from 'lodash';
import { GameItem } from '../models/GameItem';
import { GameItemStatus } from '../models/GameItem';

export class GameController {
    private items: GameItem[] = [];

    constructor(items: GameItem[], public element: HTMLElement) {
        this.initGame(items);
    }

    // Khởi tạo trò chơi với danh sách các mục
    initGame(initData: GameItem[]): void {
        for (const item of initData) {
            this.items.push(item);
            this.items.push(new GameItem(item.id, item.divId, item.image));
        }
        let id: number = 1;
        this.items.forEach(it => {
            it.status = GameItemStatus.Close;
            it.divId = 'd' + id;
            id++;
        });
    }

    // Thiết lập lại trò chơi
    reinitGame(): void {
        this.items.forEach(item => {
            item.imageElement = null;
            item.status = GameItemStatus.Close;
            item.isMatched = false;
        });
        this.shuffle();
    }

    // Kiểm tra xem trò chơi đã kết thúc chưa
    isWinGame(): boolean {
        return this.items.filter(item => item.status === GameItemStatus.Open).length === this.items.length;
    }

    // Render một mục của trò chơi lên giao diện
    renderHTML(rootElement: HTMLElement, item: GameItem): void {
        const divItem: HTMLDivElement = document.createElement('div');
        divItem.className = `col-2 gameItem m-2 p1 text-center`;
        divItem.id = item.divId;
        divItem.addEventListener('click', this.processGameItemClicked);
        const imgItem: HTMLImageElement = document.createElement('img');
        imgItem.src = `images/${item.image}`;
        imgItem.className = 'img-fluid invisible';
        item.imageElement = imgItem;
        divItem.appendChild(imgItem);
        rootElement.appendChild(divItem);
    }

    // Render nút reset trò chơi lên giao diện
    renderResetButton(rootElement: HTMLElement): void {
        let button: HTMLButtonElement = rootElement.querySelector('button#reset') as HTMLButtonElement;
        if (button) {
            button.addEventListener('click', this.processResetButtonClicked);
        }
    }

    // Render bảng trò chơi lên giao diện
    renderGameBoard(): void {
        this.shuffle();
        let boardDiv: HTMLElement = this.element.querySelector('#board') as HTMLElement;
        if (boardDiv) {
            this.items.forEach(it =>
                this.renderHTML(boardDiv, it)
            )
        }
        this.renderResetButton(this.element)
    }

    // Kiểm tra xem một cặp mục có khớp nhau không
    isMatched(id: number, imgElement: HTMLImageElement): boolean {
        let openedItems: GameItem[] = this.items.filter(item => {
            if (item.status === GameItemStatus.Open && !item.isMatched) {
                return item;
            }
        });
        if (openedItems.length === 2) {
            let checkMatchedFilter = openedItems.filter(item => item.id == id);
            if (checkMatchedFilter.length < 2) {
                openedItems.forEach(item => {
                    this.changeMatchedBackground(item.imageElement, false);
                });
                setTimeout(() =>
                    openedItems.forEach(item => {
                        if (item.imageElement) {
                            item.imageElement.className = 'img-fluid invisible';
                            item.status = GameItemStatus.Close;
                            item.isMatched = false;
                            this.changeMatchedBackground(item.imageElement);
                        }
                    }), 600);
            } else {
                openedItems.forEach(item => {
                    item.isMatched = true;
                    this.changeMatchedBackground(item.imageElement);
                });
                return true;
            }
        }
        return false;
    }

    // Thay đổi nền cho các mục đã khớp hoặc chưa khớp
    changeMatchedBackground(imgElement: HTMLElement | null, isMatched: boolean = true) {
        if (imgElement?.parentElement) {
            if (isMatched) {
                imgElement.parentElement.className = 'col-2 gameItem m-2 p-2 text-center';
            } else {
                imgElement.parentElement.className = 'col-2 gameItem m-2 p-2 text-center unmatched';
            }
        }
    }

    // Xử lý sự kiện khi một mục trò chơi được nhấn
    @autobind
    processGameItemClicked(event: Event) {
        let element: HTMLElement | null = event.target as HTMLElement;
        if (element.tagName === 'img') {
            element = element.parentElement;
        }
        for (const item of this.items) {
            if (item.divId == element?.id && !item.isMatched && item.status === GameItemStatus.Close) {
                item.status = GameItemStatus.Open;
                let imgElement = element.querySelector('img');
                if (imgElement) {
                    imgElement.className = 'img-fluid visible';
                    this.isMatched(item.id, imgElement);
                }
            }
        }
    }

    // Xử lý sự kiện khi nút reset được nhấn
    @autobind
    processResetButtonClicked(event: Event): void {
        this.reinitGame();
        const boardElement: HTMLElement = document.querySelector('#board') as HTMLElement;
        boardElement.innerHTML = '';
        this.renderGameBoard();
    }

    // Xáo trộn các mục trò chơi
    shuffle() {
        this.items = _.shuffle(this.items);
    }
}
