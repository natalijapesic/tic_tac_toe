use cosmwasm_std::HumanAddr;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::state::{GameResult, Move};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InitMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    CreateRoom {
        room_id: String,
        x_player: HumanAddr,
        o_player: HumanAddr,
    },

    Play {
        room_id: String,
        player_move: Move,
        position: i32,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    // GetCount returns the current count as a json-encoded number
    GetRoom { room_id: String },
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct RoomResponse {
    pub id: String,

    pub count_move: u16,

    pub next_move: Move,

    pub result: GameResult,

    pub board: [Option<Move>; 9],

    pub x_player: HumanAddr,

    pub o_player: HumanAddr,
}
