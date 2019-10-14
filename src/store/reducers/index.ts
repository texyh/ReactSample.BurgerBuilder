import { burgerBuilderState } from "./burgerBuilder";
import { orderState } from "./order";

export interface rootState {
    burgerBuilder: burgerBuilderState
    order: orderState
}
