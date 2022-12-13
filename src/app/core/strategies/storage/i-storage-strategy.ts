export interface IStorageStrategy {
    // method dans interface toujours public
    getItem(key: string): any; 
    storeItem(key: string, item: string): void;
    removeItem(key: string): void;
}
