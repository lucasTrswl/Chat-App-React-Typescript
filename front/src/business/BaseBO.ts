import { StoreApi, UseBoundStore } from "zustand";
import { IStore } from "../Models/Store";

export abstract class BaseBO {
    constructor(
        public store: UseBoundStore<StoreApi<IStore>>,
    ) {}
}