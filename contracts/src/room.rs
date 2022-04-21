use cosmwasm_std::{HandleResponse, HumanAddr, StdError, StdResult, Storage, ReadonlyStorage, to_binary, to_vec, from_binary};
use cosmwasm_storage::{
    PrefixedStorage, ReadonlyPrefixedStorage, ReadonlyTypedStorage,
};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::custom_error::CustomError;

pub static ROOM_KEY: &[u8] = b"room";
pub static ROOM_COUNT: &[u8] = b"room_count";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Room {
    pub id: u16,

    pub name: String,

    pub board: [Option<Move>; 9],

    pub x_player: HumanAddr,

    pub o_player: HumanAddr,

    pub current_player: HumanAddr,

    pub count_move: u16,

    pub result: Option<GameResult>,

    pub state: GameState,
}

impl Room {
    pub fn new(id: u16, name: String, x_player: HumanAddr, o_player: HumanAddr) -> Self {
        
        Self {
            id,

            count_move: 9,

            x_player: x_player.clone(),

            o_player,

            current_player: x_player.clone(),

            result: None,

            board: [None; 9],

            name,

            state: GameState::Playing,
        }
    }

    pub fn check_winner<S: Storage>(
        &mut self,
        position: u8,
        player_move: &Move,
        storage: &mut S,
    ) -> StdResult<bool> {
        //check row
        if self.check_line(position / 3 * 3, 0, *player_move, 1) {
            self.save(storage);

            return Ok(true);
        }

        //check column
        if self.check_line(position % 3, 0, *player_move, 3) {
            self.save(storage);

            return Ok(true);
        }

        //check diagonals
        if position % 2 == 0 {
            if position != 2 && position != 6 {
                if self.check_line(0, 0, *player_move, 4) {
                    self.save(storage);

                    return Ok(true);
                }
            }

            if position != 0 && position != 8 {
                if self.check_line(2, 0, *player_move, 2) {
                    self.save(storage);

                    return Ok(true);
                }
            }
        }

        Ok(false)
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
                Move::X => {
                    self.result = Some(GameResult::XWin);
                    self.state = GameState::GameOver;
                },
                Move::O => {
                    self.state = GameState::GameOver;
                    self.result = Some(GameResult::OWin);
                },
            }

            self.count_move -= 1;

            return true;
        }

        return false;
    }

    pub fn validate(&self, sender: &HumanAddr, position: u8) -> Result<HandleResponse, StdError> {
        if self.state != GameState::Playing {
            return CustomError::RoomState.message();
        }

        // if self.current_player != *sender {
        //     return CustomError::CurrentPlayer.message();
        // }

        if self.board[position as usize].is_some() {
            return CustomError::InitPosition.message();
        }

        return Ok(HandleResponse::default());
    }

    pub fn save(&self, storage: &mut impl Storage){
        
        let mut space = PrefixedStorage::new(ROOM_KEY, storage);
        space.set(&self.id.to_string().as_bytes(), &to_vec(self).unwrap());
    }

    pub fn load<S: Storage>(id: u16, storage: &S) -> StdResult<Room>{
        let space = ReadonlyPrefixedStorage::new(ROOM_KEY, storage);
        let bin_room = to_binary(&space.get(&id.to_string().as_bytes()))?;
        let room = from_binary::<Room>(&bin_room)?;
        Ok(room)
    }

    pub fn load_page(
        items_per_page: u16,
        page_number: u16,
        storage: & impl Storage,
    ) -> StdResult<Vec<Room>> {

        let bin_count_room = to_binary(&storage.get(ROOM_COUNT).unwrap()).unwrap();
        let count_room = from_binary::<u16>(&bin_count_room)?;
        let start = page_number * items_per_page;

        if start > count_room{
            panic!("Position out of bounds");
        }

        let mut end = start + items_per_page;

        if end > count_room{
            end = count_room;
        }
        let mut page = vec![];

        for id in start..end {
            let space = ReadonlyPrefixedStorage::new(ROOM_KEY, storage);
            let room = ReadonlyTypedStorage::new(&space)
                .load(&id.to_string().as_bytes())
                .expect("Room is not loaded");
            page.push(room);
        }

        return Ok(page);
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