use cosmwasm_std::{
    from_binary, to_binary, Api, Binary, Env, Extern, HandleResponse, HumanAddr, InitResponse,
    Querier, StdResult, Storage,
};

use crate::custom_error::CustomError;
use crate::msg::{HandleMsg, InitMsg, QueryMsg};
use crate::room::{Move, Room, ROOM_COUNT};
use crate::state::{config, State};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    _msg: InitMsg,
) -> StdResult<InitResponse> {

    //deps.storage.set(ROOM_COUNT, Default::default());
    //let convert = to_binary(&0)?.as_slice();
    deps.storage.set(ROOM_COUNT, to_binary(&0)?.as_slice());
    let state = State::new(deps.api.canonical_address(&env.message.sender)?);

    config(&mut deps.storage).save(&state)?;

    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::Play {
            room_id,
            player_move,
            position,
        } => try_play(deps, env, room_id, player_move, position),

        HandleMsg::CreateRoom {
            name,
            x_player,
            o_player,
        } => try_create_room(deps, env, name, x_player, o_player),
    }
}

pub fn try_create_room<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
    name: String,
    x_player: HumanAddr,
    o_player: HumanAddr,
) -> StdResult<HandleResponse> {
    let mut count_room = query_count_room(deps)?;

    let room = Room::new(count_room, name, x_player, o_player);

    room.save(&mut deps.storage)?;

    count_room += 1;

    deps.storage
        .set(ROOM_COUNT, &to_binary(&count_room)?.as_slice());

    return Ok(HandleResponse::default());
}


pub fn try_play<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    room_id: u16,
    player_move: Move,
    position: u8,
) -> StdResult<HandleResponse> {
    if position > 8 {
        return CustomError::Position.message();
    }

    let mut room = Room::load(room_id, &deps.storage)?;

    room.play(&mut deps.storage, &env.message.sender, position, &player_move)?;

    Ok(HandleResponse::default())
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Room { room_id } => to_binary(&query_room(deps, room_id)?),
        QueryMsg::CountRoom {} => to_binary(&query_count_room(deps)?),
        QueryMsg::Rooms {
            items_per_page,
            page_number,
        } => to_binary(&query_rooms(deps, items_per_page, page_number)?),
    }
}

fn query_room<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    room_id: u16,
) -> StdResult<Room> {
    let room = Room::load(room_id, &deps.storage)?;

    Ok(room)
}

fn query_rooms<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    items_per_page: u16,
    page_number: u16,
) -> StdResult<Vec<Room>> {
    let rooms = Room::load_rooms(items_per_page, page_number, &deps.storage)?;

    Ok(rooms)
}

fn query_count_room<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>) -> StdResult<u16> {
    let count_room_bin = Binary(deps.storage.get(ROOM_COUNT).unwrap());
    let count_room: u16 = from_binary::<u16>(&count_room_bin)?;

    Ok(count_room)
}

#[cfg(test)]
mod tests {
    use crate::room::GameState;

    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, MockApi, MockQuerier};
    use cosmwasm_std::{coins, from_binary, MemoryStorage};


    fn init_game() -> Extern<MemoryStorage, MockApi, MockQuerier> {

        let mut deps = mock_dependencies(20, &[]);
        let msg = InitMsg {};
        let env = mock_env("adam", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        deps
    }

    fn create_room(id: u16) -> Extern<MemoryStorage, MockApi, MockQuerier>
    {
        let mut deps = init_game();
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::CreateRoom {
            name: "nignite".to_string(),
            x_player: HumanAddr::from("adam"),
            o_player: HumanAddr::from("eva"),
        };

        let _res = handle(&mut deps, env, msg).unwrap();

        let res = query(
            &deps,
            QueryMsg::Room {
                room_id: id,
            },
        )
        .unwrap();

        let response: Room = from_binary(&res).unwrap();
        let expected_response = Room {
            id: 0,
            name: "nignite".to_string(),
            board: [None; 9],
            count_move: 9,
            result: None,
            current_player: HumanAddr::from("adam"),
            x_player: HumanAddr::from("adam"),
            o_player: HumanAddr::from("eva"),
            state: GameState::Playing
        };

        assert_eq!(expected_response, response);

        deps
    }


    #[test]
    fn create_room_test() {

        create_room(0);        
    }

    #[test]
    fn play_test() {

        let mut deps = create_room(0);
        
        let env = mock_env("anyone", &coins(2, "token"));

        let msg = HandleMsg::Play {
            room_id: 0,
            player_move: Move::X,
            position: 4,
        };

        let _res = handle(&mut deps, env, msg).unwrap();

        let res = query(
            &deps,
            QueryMsg::Room {
                room_id: 0,
            },
        )
        .unwrap();

        let response: Room = from_binary(&res).unwrap();

        let expected_response = Room {
            id: 0,
            name: "nignite".to_string(),
            board: [
                None,
                None,
                None,
                None,
                Some(Move::X),
                None,
                None,
                None,
                None,
            ],
            count_move: 8,
            result: None,
            current_player: HumanAddr::from("eva"),
            x_player: HumanAddr::from("adam"),
            o_player: HumanAddr::from("eva"),
            state: GameState::Playing
        };

        assert_eq!(expected_response, response);
    }
}
