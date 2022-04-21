use cosmwasm_std::HumanAddr;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::room::{GameResult, Move};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InitMsg {
    pub count_room: u16,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    CreateRoom {
        name: String,
        x_player: HumanAddr,
        o_player: HumanAddr,
    },

    Play {
        room_id: u16,
        player_move: Move,
        position: u8,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    CountRoom {},
    Room { room_id: u16 },
    Rooms { items_per_page: u16, page_number: u16 },
}


// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct RoomResponse {
    pub id: u16,

    pub count_move: u16,

    pub next_move: Move,

    pub result: GameResult,

    pub board: [Option<Move>; 9],

    pub x_player: HumanAddr,

    pub o_player: HumanAddr,
}
