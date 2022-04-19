use cosmwasm_std::HumanAddr;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

pub static ROOM_KEY: &[u8] = b"room";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Room {
    pub id: u32,

    pub name: String,

    pub board: [Option<Move>; 9],

    pub x_player: HumanAddr,

    pub o_player: HumanAddr,

    pub next_move: Move,

    pub count_move: u16,

    pub result: Option<GameResult>,

    pub state: GameState,
}

impl Room {
    pub fn new(id: u32, name: String, x_player: HumanAddr, o_player: HumanAddr) -> Self {
        Self {
            id,

            count_move: 9,

            x_player,

            o_player,

            next_move: Move::X,

            result: None,

            board: [None; 9],

            name,

            state: GameState::Playing,
        }
    }

    pub fn check_line(
        &mut self,
        mut start: u8,
        mut line: u8,
        player_move: Move,
        increment: u8,
    ) -> bool {
        while let Some(cell) = self.board.get((start) as usize) {
            if *cell == Some(player_move) && line < 3 {
                line += 1;
                start += increment;
            } else {
                break;
            }
        }

        if line == 3 {
            match player_move {
                Move::X => self.result = GameResult::XWin,
                Move::O => self.result = GameResult::OWin,
            }

            self.count_move -= 1;

            return true;
        }

        false
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
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum GameState {
    GameOver,
    Playing,
}
