use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, StdResult, Storage};
use cosmwasm_storage::{
    singleton, singleton_read, ReadonlyPrefixedStorage, ReadonlySingleton, ReadonlyTypedStorage,
    Singleton,
};

use crate::room::{Room, ROOM_KEY};

pub static CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub count_room: u16,
    pub current_page: u16,
    pub admin: CanonicalAddr,
}

impl State {
    pub fn new(count_room: u16, admin: CanonicalAddr) -> Self {
        Self {
            count_room,
            admin,
            current_page: 0,
        }
    }

    pub fn load_page<S: Storage>(
        &mut self,
        items_per_page: u16,
        page_number: u16,
        storage: &S,
    ) -> StdResult<Vec<Room>> {
        let start = page_number * items_per_page;

        if start > self.count_room {
            panic!("Position out of bounds");
        }

        let mut end = start + items_per_page;

        if end > self.count_room {
            end = self.count_room;
        }
        let mut page = vec![];

        for id in start..end {
            let space = ReadonlyPrefixedStorage::new(ROOM_KEY, storage);
            let room = ReadonlyTypedStorage::new(&space)
                .load(&id.to_string().as_bytes())
                .expect("Room is not loaded");
            page.push(room);
        }

        // self.current_page += 1;

        // config(storage).save(self)?;

        return Ok(page);
    }
}

pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlySingleton<S, State> {
    singleton_read(storage, CONFIG_KEY)
}
