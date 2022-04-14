use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, HumanAddr, StdResult, Storage};
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub room_id: u64,
    pub board: [Option<Move>; 9],

    pub admin: CanonicalAddr,

    pub x_player: Option<HumanAddr>,
    pub o_player: Option<HumanAddr>,

    pub next_move: Move,

    pub count_move: u16,

    pub result: GameResult,
}

impl State {
    pub fn save<S: Storage>(&self, storage: &mut S) -> StdResult<()> {
        Singleton::new(storage, b"state").save(self)
    }

    pub fn load<S: Storage>(storage: &S) -> StdResult<State> {
        ReadonlySingleton::new(storage, b"state").load()
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema, Copy)]
pub enum Move {
    X,
    O,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum GameResult {
    XWin,
    OWin,
    Draw,
    Playing,
}

pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlySingleton<S, State> {
    singleton_read(storage, CONFIG_KEY)
}
