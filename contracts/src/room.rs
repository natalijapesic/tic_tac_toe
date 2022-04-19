use cosmwasm_std::HumanAddr;
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

pub static ROOM_KEY: &[u8] = b"room";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Room {
    pub id: String,

    pub board: [Option<Move>; 9],

    pub x_player: HumanAddr,

    pub o_player: HumanAddr,

    pub next_move: Move,

    pub count_move: u16,

    pub result: GameResult,
}

impl Room {
    pub fn check_line(
        &mut self,
        mut start: i32,
        mut line: i32,
        player_move: Move,
        increment: i32,
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
    Playing,
}
