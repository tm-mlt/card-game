import { ICard } from "./ICard";
import { CARD_TYPE, CARD_TAG } from "./types";
import { CARDS } from "./id";
import {
  AddCoinsForCardsOfId,
  AddCoinsForCardsOfTag,
  AddCoinsToActivePlayer,
  AddCoinsToEveryone,
  ExchangeOneCard,
  GetCoinsFromActivePlayer,
  GetCoinsFromEveryoneToActivePlayer,
  GetCoinsFromOneToActivePlayer,
} from "../../effects";

export const cardList: { [key in keyof typeof CARDS]?: ICard } = {
  [CARDS.WHEAT_FIELD]: {
    cost: 1,
    trigger: 1,
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.WHEAT,
    effect: new AddCoinsToEveryone(1),
  },
  [CARDS.RANCH]: {
    cost: 1,
    trigger: 2,
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.COW,
    effect: new AddCoinsToEveryone(1),
  },
  [CARDS.FOREST]: {
    cost: 3,
    trigger: 5,
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.GEAR,
    effect: new AddCoinsToEveryone(1),
  },
  [CARDS.MINE]: {
    cost: 6,
    trigger: 9,
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.GEAR,
    effect: new AddCoinsToEveryone(5),
  },
  [CARDS.APPLE_ORCHARD]: {
    cost: 3,
    trigger: 10,
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.WHEAT,
    effect: new AddCoinsToEveryone(3),
  },
  [CARDS.BAKERY]: {
    cost: 1,
    trigger: [2, 3],
    type: CARD_TYPE.SECONDARY_INDUSTRY,
    tag: CARD_TAG.BREAD,
    effect: new AddCoinsToActivePlayer(1),
  },
  [CARDS.CONVENIENCE_STORE]: {
    cost: 2,
    trigger: 4,
    type: CARD_TYPE.SECONDARY_INDUSTRY,
    tag: CARD_TAG.BREAD,
    effect: new AddCoinsToActivePlayer(3),
  },
  [CARDS.CHEESE_FACTORY]: {
    cost: 5,
    trigger: 7,
    type: CARD_TYPE.SECONDARY_INDUSTRY,
    tag: CARD_TAG.FACTORY,
    effect: new AddCoinsForCardsOfTag(3, CARD_TAG.COW),
  },
  [CARDS.FURNITURE_FACTORY]: {
    cost: 3,
    trigger: 8,
    type: CARD_TYPE.SECONDARY_INDUSTRY,
    tag: CARD_TAG.FACTORY,
    effect: new AddCoinsForCardsOfTag(3, CARD_TAG.GEAR),
  },
  [CARDS.FARMERS_MARKET]: {
    cost: 2,
    trigger: [11, 12],
    type: CARD_TYPE.SECONDARY_INDUSTRY,
    tag: CARD_TAG.FRUIT,
    effect: new AddCoinsForCardsOfTag(2, CARD_TAG.WHEAT),
  },
  [CARDS.CAFE]: {
    cost: 2,
    trigger: 3,
    type: CARD_TYPE.RESTAURANT,
    tag: CARD_TAG.CUP,
    effect: new GetCoinsFromActivePlayer(1),
  },
  [CARDS.FAMILY_RESTAURANT]: {
    cost: 3,
    trigger: [9, 10],
    type: CARD_TYPE.RESTAURANT,
    tag: CARD_TAG.CUP,
    effect: new GetCoinsFromActivePlayer(2),
  },
  [CARDS.STADIUM]: {
    cost: 6,
    trigger: 6,
    type: CARD_TYPE.MAJOR_ESTABLISHMENT,
    tag: CARD_TAG.MAJOR,
    effect: new GetCoinsFromEveryoneToActivePlayer(2),
  },
  [CARDS.TV_STATION]: {
    cost: 7,
    trigger: 6,
    type: CARD_TYPE.MAJOR_ESTABLISHMENT,
    tag: CARD_TAG.MAJOR,
    effect: new GetCoinsFromOneToActivePlayer(5),
  },
  [CARDS.BUSINESS_CENTER]: {
    cost: 8,
    trigger: 6,
    type: CARD_TYPE.MAJOR_ESTABLISHMENT,
    tag: CARD_TAG.MAJOR,
    //effect: new ExchangeOneCard()
  },
  [CARDS.TRAIN_STATION]: {
    cost: 4,
    type: CARD_TYPE.LANDMARK,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.SHOPPING_MALL]: {
    cost: 10,
    type: CARD_TYPE.LANDMARK,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.AMUSEMENT_PARK]: {
    cost: 16,
    type: CARD_TYPE.LANDMARK,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.RADIO_TOWER]: {
    cost: 22,
    type: CARD_TYPE.LANDMARK,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.FLOWER_GARDEN]: {
    cost: 2,
    trigger: 4,
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.WHEAT,
    effect: new AddCoinsToEveryone(1),
  },
  [CARDS.MACKEREL_BOAT]: {
    cost: 2,
    trigger: 8,
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.BOAT,
    effect: new AddCoinsToEveryone(3),
  },
  [CARDS.TUNA_BOAT]: {
    cost: 5,
    trigger: [12, 13, 14],
    type: CARD_TYPE.PRIMARY_INDUSTRY,
    tag: CARD_TAG.BOAT,
    //effect:
  },
  [CARDS.FLOWER_SHOP]: {
    cost: 1,
    trigger: 6,
    type: CARD_TYPE.SECONDARY_INDUSTRY,
    tag: CARD_TAG.BREAD,
    effect: new AddCoinsForCardsOfId(1, CARDS.FLOWER_GARDEN),
  },
  [CARDS.FOOD_WAREHOUSE]: {
    cost: 2,
    trigger: [12, 13],
    type: CARD_TYPE.SECONDARY_INDUSTRY,
    tag: CARD_TAG.FACTORY,
    effect: new AddCoinsForCardsOfTag(2, CARD_TAG.CUP),
  },
  [CARDS.SUSHI_BAR]: {
    cost: 4,
    trigger: 1,
    type: CARD_TYPE.RESTAURANT,
    tag: CARD_TAG.CUP,
  },
  [CARDS.SUSHI_BAR_JP]: {
    cost: 2,
    trigger: 1,
    type: CARD_TYPE.RESTAURANT,
    tag: CARD_TAG.CUP,
  },
  [CARDS.PIZZA_JOINT]: {
    cost: 1,
    trigger: 7,
    type: CARD_TYPE.RESTAURANT,
    tag: CARD_TAG.CUP,
  },
  [CARDS.HAMBURGER_STAND]: {
    cost: 1,
    trigger: 8,
    type: CARD_TYPE.RESTAURANT,
    tag: CARD_TAG.CUP,
  },
  [CARDS.PUBLISHER]: {
    cost: 5,
    trigger: 7,
    type: CARD_TYPE.MAJOR_ESTABLISHMENT,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.TAX_OFFICE]: {
    cost: 4,
    trigger: [8, 9],
    type: CARD_TYPE.MAJOR_ESTABLISHMENT,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.CITY_HALL]: {
    cost: 0,
    type: CARD_TYPE.LANDMARK,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.HARBOR]: {
    cost: 2,
    type: CARD_TYPE.LANDMARK,
    tag: CARD_TAG.MAJOR,
  },
  [CARDS.AIRPORT]: {
    cost: 30,
    type: CARD_TYPE.LANDMARK,
    tag: CARD_TAG.MAJOR,
  },
};
