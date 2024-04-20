export enum GameItemStatus{ 
       Open, Close
}
export class GameItem{ 
       constructor(public id: number, 
              public divId: string, 
              public image: string , 
              public status: GameItemStatus = GameItemStatus.Close, 
              public isMatched: boolean = false, 
              public imageElement: HTMLImageElement | null = null) {
}
}
///Các định nghĩa GameItemStatus và GameItem là phần của một ứng dụng trò chơi, có thể được sử dụng để quản lý các phần tử trong trò chơi trên giao diện người dùng.
// GameItemStatus: Đây là một enum định nghĩa hai trạng thái cơ bản cho một phần tử trong trò chơi:
// Open: Phần tử đã được mở.
// Close: Phần tử đã được đóng.
// GameItem: Là một lớp đại diện cho một phần tử trong trò chơi. Mỗi phần tử có các thuộc tính sau:
// id: Một số nguyên đại diện cho ID của phần tử.
// divId: Một chuỗi đại diện cho ID của div chứa phần tử trên giao diện.
// image: Một chuỗi đại diện cho đường dẫn của hình ảnh của phần tử.
// status: Một trong hai giá trị của GameItemStatus đại diện cho trạng thái của phần tử (mặc định là Close).
// isMatched: Một giá trị logic đại diện cho việc phần tử đã được khớp với một phần tử khác hay chưa (mặc định là false).
// imageElement: Một tham chiếu tới phần tử hình ảnh HTML trên giao diện người dùng (mặc định là null).