//authors information
export interface Author{
    id:number;
    name:string;
    dateAdded:string;
}
//in memory storage for authors
export const authors: Author[] = [];